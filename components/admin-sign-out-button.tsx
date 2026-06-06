"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AdminSignOutButton() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button className="button button-secondary" type="button" onClick={signOut}>
      Se déconnecter
    </button>
  );
}
