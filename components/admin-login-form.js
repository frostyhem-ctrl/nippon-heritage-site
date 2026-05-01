"use client";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function createEphemeralSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Les variables publiques Supabase sont manquantes.");
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function syncAdminSession(accessToken) {
  const response = await fetch("/api/admin/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ accessToken }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Impossible d'ouvrir la session admin.");
  }

  return payload;
}

export function AdminLoginForm() {
  const router = useRouter();
  const supabaseClient = useMemo(() => createEphemeralSupabaseClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("Connexion en cours...");
    setMessageTone("");

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.session?.access_token) {
        throw new Error("E-mail ou mot de passe invalide.");
      }

      await syncAdminSession(data.session.access_token);
      await supabaseClient.auth.signOut();
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      await supabaseClient.auth.signOut();
      setMessage(error.message || "Accès admin refusé.");
      setMessageTone("error");
      setIsLoading(false);
    }
  }

  return (
    <main className="login-wrap">
      <section className="login-shell">
        <div className="login-card">
          <div className="login-brand">
            <img src="/assets/images/nippon-heritage-logo.png" alt="Logo Nippon Heritage" />
            <div>
              <strong>Connexion admin</strong>
              <p>Accès réservé aux administrateurs Nippon Heritage.</p>
            </div>
          </div>

          <div className="admin-message" data-tone={messageTone} aria-live="polite">
            {message}
          </div>

          <form className="admin-stack" onSubmit={handleSubmit}>
            <label className="admin-field">
              <span>E-mail</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" disabled={isLoading} />
            </label>
            <label className="admin-field">
              <span>Mot de passe</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </label>

            <div className="login-actions">
              <button type="submit" className="admin-button" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
              <Link className="admin-secondary" href="/">
                Retour au site
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
