import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getReplyTemplate, renderReply } from "@/lib/autoReply";

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
    const results = await Promise.allSettled([sendEnquiryEmail(data), sendAutoReply(data)]);
    results.forEach((r, i) => {
      if (r.status === "rejected") console.error(`[enquiries] ${i ? "auto-reply" : "notification"} email failed`, r.reason);
    });
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

  await resendSend(apiKey, {
    from,
    to: [to],
    reply_to: e.email,
    subject: `New website enquiry: ${e.name}${e.interest ? ` (${e.interest})` : ""}`,
    html,
  });
}

async function resendSend(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024;

/**
 * Thank-you email to the customer, worded and with brochures attached
 * according to their "I'm interested in" choice (see lib/autoReply.ts).
 * Needs AUTO_REPLY_FROM set to an address on a domain verified in Resend,
 * e.g. "ComPower Africa <info@compowersolutions.com>"; skipped otherwise.
 */
async function sendAutoReply(e: z.output<typeof enquirySchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTO_REPLY_FROM;
  if (!apiKey || !from) return;
  const replyTo = process.env.ENQUIRY_NOTIFY_EMAIL || "highsystembotswana@gmail.com";

  const template = getReplyTemplate(e.interest);
  const attachments: { filename: string; path: string }[] = [];

  if (template.attach.length) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: files } = await supabaseAdmin
      .from("resources")
      .select("category, file_path, file_name, file_size, password_hash, created_at")
      .in("category", template.attach)
      .is("password_hash", null)
      .order("created_at", { ascending: false });

    // Prefer the most specific category first (e.g. "generator" before "catalog")
    const ordered = (files ?? []).sort(
      (a, b) => template.attach.indexOf(a.category) - template.attach.indexOf(b.category),
    );
    let total = 0;
    for (const f of ordered) {
      if (attachments.length >= MAX_ATTACHMENTS || total + f.file_size > MAX_ATTACHMENT_BYTES) continue;
      const { data: signed } = await supabaseAdmin.storage.from("resources").createSignedUrl(f.file_path, 600);
      if (!signed) continue;
      attachments.push({ filename: f.file_name, path: signed.signedUrl });
      total += f.file_size;
    }
  }

  const { subject, html } = renderReply(e.name, e.message, template, attachments.map((a) => a.filename));
  await resendSend(apiKey, {
    from,
    to: [e.email],
    reply_to: replyTo,
    subject,
    html,
    ...(attachments.length ? { attachments } : {}),
  });
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
