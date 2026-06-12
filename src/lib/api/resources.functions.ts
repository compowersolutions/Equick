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
  .inputValidator((input: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: resource, error: resErr } = await supabaseAdmin
      .from("resources")
      .select("file_path, file_name")
      .eq("id", data.id)
      .single();
    if (resErr || !resource) throw new Error("Resource not found");

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
  .inputValidator((input: {
    title: string;
    description?: string;
    category: string;
    file_path: string;
    file_name: string;
    file_size: number;
    file_type: string;
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
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return inserted;
  });

export const deleteResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) =>
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
