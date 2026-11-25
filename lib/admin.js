import { redirect } from "next/navigation";
import { creerClientServeur } from "@/lib/supabase/server";

// À appeler en tête de chaque page et de chaque action réservée à l’admin.
// Vérifie deux choses : la personne est connectée ET figure dans admin_users.
export async function exigerAdmin() {
  const supabase = await creerClientServeur();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!admin) redirect("/admin/connexion?erreur=acces");

  return { supabase, user };
}
