"use server";

import { redirect } from "next/navigation";
import { creerClientServeur } from "@/lib/supabase/server";

export async function connexion(etat, formData) {
  const email = String(formData.get("email") ?? "").trim();
  const motDePasse = String(formData.get("motDePasse") ?? "");

  if (!email || !motDePasse) {
    return { erreur: "Renseigne ton e-mail et ton mot de passe." };
  }

  const supabase = await creerClientServeur();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: motDePasse,
  });

  if (error) {
    return { erreur: "E-mail ou mot de passe incorrect." };
  }

  redirect("/admin");
}

export async function deconnexion() {
  const supabase = await creerClientServeur();
  await supabase.auth.signOut();
  redirect("/admin/connexion");
}
