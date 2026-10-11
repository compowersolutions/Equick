import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const categoryEnum = z.enum(["catalog", "generator", "solar", "rectifier", "other"]);

export const listResources = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getResourceDownloadUrl = createServerFn({ method: "POST" })
  .validator((input: { id: string; password?: string }) =>
    z.object({ id: z.string().uuid(), password: z.string().optional() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: resource, error: resErr } = await supabaseAdmin
      .from("resources")
      .select("file_path, file_name, password_hash")
      .eq("id", data.id)
      .single();
    if (resErr || !resource) throw new Error("Resource not found");

    // Check password if protected
    if (resource.password_hash) {
      if (!data.password) throw new Error("PASSWORD_REQUIRED");

      // Hash the provided password and compare
      const msgBuffer = new TextEncoder().encode(data.password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const providedHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

      if (providedHash !== resource.password_hash) throw new Error("INVALID_PASSWORD");
    }

    const { data: signed, error } = await supabaseAdmin.storage
      .from("resources")
      .createSignedUrl(resource.file_path, 60, { download: resource.file_name });
    if (error || !signed) throw new Error(error?.message ?? "Failed to create signed URL");
    return { url: signed.signedUrl };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { isAdmin: Boolean(data) };
  });

export const createResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: {
    title: string;
    description?: string;
    category: string;
    file_path: string;
    file_name: string;
    file_size: number;
    file_type: string;
    password_hash?: string;
  }) =>
    z
      .object({
        title: z.string().trim().min(1).max(200),
        description: z.string().trim().max(1000).optional(),
        category: categoryEnum,
        file_path: z.string().min(1).max(500),
        file_name: z.string().min(1).max(255),
        file_size: z.number().int().min(1).max(100 * 1024 * 1024),
        file_type: z.string().min(1).max(150),
        password_hash: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden: admin only");

    const { data: inserted, error } = await supabaseAdmin
      .from("resources")
      .insert({
        title: data.title,
        description: data.description ?? null,
        category: data.category as "catalog" | "generator" | "solar" | "rectifier" | "other",
        file_path: data.file_path,
        file_name: data.file_name,
        file_size: data.file_size,
        file_type: data.file_type,
        password_hash: data.password_hash ?? null,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return inserted;
  });

export const deleteResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden: admin only");

    const { data: resource } = await supabaseAdmin
      .from("resources")
      .select("file_path")
      .eq("id", data.id)
      .single();

    if (resource?.file_path) {
      await supabaseAdmin.storage.from("resources").remove([resource.file_path]);
    }

    const { error } = await supabaseAdmin.from("resources").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
