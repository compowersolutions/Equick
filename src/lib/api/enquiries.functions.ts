import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  interest: z.string().trim().max(60).optional(),
  message: z.string().trim().min(1).max(4000),
  // Honeypot: real visitors never see or fill this field
  website: z.string().optional(),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((input: z.input<typeof enquirySchema>) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    // Silently accept bot submissions without storing them
    if (data.website) return { ok: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      interest: data.interest || null,
      message: data.message,
    });
    if (error) throw new Error(error.message);

    // Email alert is best-effort: the enquiry is already saved, so a mail
    // failure must not make the visitor think their message was lost.
    try {
      await sendEnquiryEmail(data);
    } catch (err) {
      console.error("[enquiries] notification email failed", err);
    }
    return { ok: true };
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEnquiryEmail(e: z.output<typeof enquirySchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // email alerts not configured
  const to = process.env.ENQUIRY_NOTIFY_EMAIL || "highsystembotswana@gmail.com";
  const from = process.env.ENQUIRY_FROM_EMAIL || "ComPower Website <onboarding@resend.dev>";

  const rows: [string, string | undefined][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["Phone", e.phone],
    ["Interested in", e.interest],
  ];
  const html = `
    <h2 style="font-family:sans-serif">New enquiry from compowersolutions.com</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#64748B">${k}</td><td style="padding:4px 0"><b>${escapeHtml(v!)}</b></td></tr>`)
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #2D63A8;padding-left:12px">${escapeHtml(e.message)}</p>
    <p style="font-family:sans-serif;font-size:12px;color:#64748B">Reply to this email to answer ${escapeHtml(e.name)} directly, or manage enquiries at https://compowersolutions.com/admin</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: e.email,
      subject: `New website enquiry: ${e.name}${e.interest ? ` (${e.interest})` : ""}`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: roleRow } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!roleRow) throw new Error("Forbidden: admin only");
  return supabaseAdmin;
}

export const listEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabaseAdmin = await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const setEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { id: string; status: "new" | "handled" }) =>
    z.object({ id: z.string().uuid(), status: z.enum(["new", "handled"]) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const supabaseAdmin = await assertAdmin(context.userId);
    const { error } = await supabaseAdmin
      .from("enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
