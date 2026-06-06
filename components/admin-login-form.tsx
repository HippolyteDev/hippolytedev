"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("Hippolyte Diallo");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signIn();
  }

  async function signIn() {
    setError(null);
    setIsPending(true);

    const result = await authClient.signIn.email({
      email,
      password,
    });

    setIsPending(false);

    if (result.error) {
      setError(result.error.message ?? "Connexion impossible.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function createAdmin() {
    setError(null);
    setIsPending(true);

    const result = await authClient.signUp.email({
      email,
      password,
      name,
    });

    setIsPending(false);

    if (result.error) {
      setError(result.error.message ?? "Création impossible.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="admin-name">Nom</label>
        <input
          id="admin-name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="admin-email">Email admin</label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="admin-password">Mot de passe</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={10}
        />
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="cta-row">
        <button className="button button-primary" type="submit" disabled={isPending}>
          Se connecter
        </button>
        <button className="button button-secondary" type="button" onClick={createAdmin} disabled={isPending}>
          Créer le compte admin
        </button>
      </div>
      <p className="text-muted">
        La création est acceptée uniquement pour l’email défini par `ADMIN_EMAIL`.
      </p>
    </form>
  );
}
