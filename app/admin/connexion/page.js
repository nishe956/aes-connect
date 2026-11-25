import { redirect } from "next/navigation";
import { creerClientServeur } from "@/lib/supabase/server";
import { deconnexion } from "../actions";
import FormulaireConnexion from "./FormulaireConnexion";

export default async function Connexion({ searchParams }) {
  const params = await searchParams;
  const supabase = await creerClientServeur();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: admin } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (admin) redirect("/admin");
  }

  const sansDroits = Boolean(user) || params?.erreur === "acces";

  return (
    <div className="space-y-5 pb-6 pt-4">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">
        Connexion administratrice
      </h1>

      {sansDroits ? (
        <div className="space-y-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
          <p role="alert" className="text-sm font-medium text-error">
            Ce compte n’a pas les droits d’administration.
          </p>
          {user ? (
            <form action={deconnexion}>
              <button
                type="submit"
                className="rounded-lg bg-surface-container-high px-4 py-2 text-sm font-semibold"
              >
                Se déconnecter
              </button>
            </form>
          ) : null}
        </div>
      ) : null}

      <FormulaireConnexion />
    </div>
  );
}
