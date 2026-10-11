import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — ComPower Africa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const C = {
  dark:    "#0C1018",
  dark2:   "#111827",
  dark3:   "#1A2235",
  border: "#232F45",
  blue:   "#2D63A8",
  blueD:  "#1E4F8C",
  teal:   "#00B4A0",
  muted:  "#94A3B8",
} as const;

const STYLES = `
  .cp-display { font-family: var(--font-display) !important; letter-spacing: -0.02em; }

  .cp-auth-input {
    display: block; width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid ${C.border};
    border-radius: 6px;
    color: #fff;
    font-size: 0.875rem;
    padding: 0.65rem 0.875rem 0.65rem 2.5rem;
    transition: border-color 0.2s, background 0.2s;
    outline: none;
  }
  .cp-auth-input::placeholder { color: ${C.muted}; }
  .cp-auth-input:focus {
    border-color: ${C.blue};
    background: rgba(255,255,255,0.07);
  }

  .cp-btn-blue {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%;
    background: ${C.blue}; color: ${C.dark};
    font-weight: 700; font-size: 0.875rem;
    letter-spacing: 0.04em; text-transform: uppercase;
    padding: 0.85rem 1.5rem; border-radius: 6px; border: none; cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .cp-btn-blue:hover:not(:disabled) { background: ${C.blueD}; transform: translateY(-1px); }
  .cp-btn-blue:disabled { opacity: 0.5; cursor: not-allowed; }

  .cp-tab-btn {
    background: none; border: none; cursor: pointer;
    color: ${C.teal}; font-weight: 600; font-size: 0.875rem;
    text-decoration: underline; text-underline-offset: 3px;
    padding: 0;
    transition: opacity 0.2s;
  }
  .cp-tab-btn:hover { opacity: 0.8; }
`;

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup" | "forgot" | "reset">("signin");

  useEffect(() => {
    // Arriving from a password-reset email: the link signs the user in
    // temporarily, so show the "set new password" form instead of redirecting.
    const isRecovery =
      new URLSearchParams(window.location.search).has("reset") ||
      window.location.hash.includes("type=recovery");
    if (isRecovery) setMode("reset");

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("reset");
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && !isRecovery) navigate({ to: "/downloads" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  function switchMode(next: typeof mode) {
    setMode(next);
    setError(null);
    setInfo(null);
    setConsent(false);
  }

  async function goToDashboard(userId: string) {
    const { data: roleRow } = await supabase
      .from("user_roles").select("role")
      .eq("user_id", userId).eq("role", "admin").maybeSingle();
    navigate({ to: roleRow ? "/admin" : "/downloads" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (mode === "signup" && !consent) {
      setError("Please agree to the privacy notice before creating an account.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await goToDashboard(data.user.id);
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/auth?reset=1",
        });
        if (error) throw error;
        setInfo("If an account exists for that email, a password reset link is on its way. Check your inbox (and spam folder).");
      } else if (mode === "reset") {
        const { data, error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        window.history.replaceState(null, "", "/auth");
        await goToDashboard(data.user.id);
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/downloads" },
        });
        if (error) throw error;
        setInfo("Account created! Check your inbox to verify, then sign in to access downloads.");
        setMode("signin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Full-page dark background */}
      <div style={{ minHeight: "calc(100vh - 4rem)", display: "flex", alignItems: "center", justifyContent: "center", background: C.dark, padding: "2rem 1rem", position: "relative" }}>

        {/* Ambient glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(45,99,168,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", width: "100%", maxWidth: "420px" }}>

          {/* Logo mark */}
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <div style={{ width: "40px", height: "40px", background: C.blue, clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M9 2L4 9H8L7 14L12 7H8L9 2Z" fill="#0C1018" stroke="#0C1018" strokeWidth="0.5" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card */}
          <div style={{ background: C.dark2, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.75rem" }}>

            <h1 className="cp-display" style={{ fontWeight: 900, fontSize: "1.52rem", textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>
              {{ signin: "Sign in", signup: "Create account", forgot: "Reset password", reset: "New password" }[mode]}
            </h1>
            <p style={{ marginTop: "0.6rem", fontSize: "0.875rem", color: C.muted, lineHeight: 1.6 }}>
              {{
                signin: "Sign in to access downloadable resources.",
                signup: "Create a free account to access our downloadable resources.",
                forgot: "Enter your account email and we'll send you a link to set a new password.",
                reset: "Choose a new password for your account.",
              }[mode]}
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Email */}
              {mode !== "reset" && <div>
                <label htmlFor="email" style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#CBD5E0", marginBottom: "0.5rem", letterSpacing: "0.03em" }}>
                  Email address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={15} color={C.muted} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    id="email" type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="cp-auth-input"
                    placeholder="you@example.com"
                  />
                </div>
              </div>}

              {/* Password */}
              {mode !== "forgot" && <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                  <label htmlFor="password" style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#CBD5E0", letterSpacing: "0.03em" }}>
                    {mode === "reset" ? "New password" : "Password"}
                  </label>
                  {mode === "signin" && (
                    <button type="button" className="cp-tab-btn" style={{ fontSize: "0.78rem" }} onClick={() => switchMode("forgot")}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <Lock size={15} color={C.muted} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    id="password" type="password" required minLength={6}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="cp-auth-input"
                    placeholder="••••••••"
                  />
                </div>
              </div>}

              {/* Privacy notice — signup only (UNCHANGED content) */}
              {mode === "signup" && (
                <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>
                    Privacy Notice
                  </p>
                  <p style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.7 }}>
                    ComPower Africa collects your email address solely to provide access to our downloadable resources. Your information will not be shared with third parties or used for any other purpose. You may request deletion of your account and data at any time by contacting us. This is in accordance with Botswana's Data Protection Act (DPA) 2018.
                  </p>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ marginTop: "2px", accentColor: C.teal }}
                    />
                    <span style={{ fontSize: "0.8rem", color: "#CBD5E0", lineHeight: 1.6 }}>
                      I agree that my email address may be used to provide access to downloads on this site, in accordance with the privacy notice above.
                    </span>
                  </label>
                </div>
              )}

              {/* Error / info banners */}
              {error && (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "6px", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#FCA5A5" }}>
                  {error}
                </div>
              )}
              {info && (
                <div style={{ background: "rgba(0,180,160,0.1)", border: "1px solid rgba(0,180,160,0.25)", borderRadius: "6px", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#5EEAD4" }}>
                  {info}
                </div>
              )}

              <button type="submit" disabled={loading || (mode === "signup" && !consent)} className="cp-btn-blue" style={{ marginTop: "0.5rem" }}>
                {loading ? "Please wait…" : { signin: "Sign in", signup: "Create account", forgot: "Send reset link", reset: "Save new password" }[mode]}
                {!loading && <ArrowRight size={14} />}
              </button>
            </form>

            {/* Mode toggle */}
            <p style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.85rem", color: C.muted }}>
              {mode === "signin" ? (
                <>Need an account?{" "}
                  <button className="cp-tab-btn" onClick={() => switchMode("signup")}>
                    Sign up free
                  </button>
                </>
              ) : mode === "signup" ? (
                <>Already have an account?{" "}
                  <button className="cp-tab-btn" onClick={() => switchMode("signin")}>
                    Sign in
                  </button>
                </>
              ) : (
                <button className="cp-tab-btn" onClick={() => switchMode("signin")}>
                  Back to sign in
                </button>
              )}
            </p>

            {/* Back link */}
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <Link to="/" style={{ fontSize: "0.78rem", color: C.muted, textDecoration: "none" }}>
                ← Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
