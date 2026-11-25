import Link from "next/link";
import { exigerAdmin } from "@/lib/admin";
import { deconnexion } from "./actions";

function formaterDate(date) {
  const [annee, mois, jour] = date.split("-");
  return `${jour}/${mois}/${annee}`;
}

export default async function Admin({ searchParams }) {
  const params = await searchParams;
  const { supabase } = await exigerAdmin();

  const { data: evenements, error } = await supabase
    .from("events")
    .select("id, titre, date_evenement, statut")
    .is("supprime_le", null)
    .order("date_evenement", { ascending: false });

  return (
    <div className="space-y-5 pb-6 pt-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          Administration
        </h1>
        <form action={deconnexion}>
          <button
            type="submit"
            className="rounded-lg bg-surface-container-high px-3 py-2 text-sm font-semibold"
          >
            Se déconnecter
          </button>
        </form>
      </div>

      {params?.cree ? (
        <p
          role="status"
          className="rounded-xl bg-primary-fixed p-3 text-sm font-medium text-primary"
        >
          Événement enregistré.
        </p>
      ) : null}

      <Link
        href="/admin/evenements/nouveau"
        className="inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary"
      >
        Nouvel événement
      </Link>

      <section aria-labelledby="liste" className="space-y-3">
        <h2 id="liste" className="text-lg font-semibold">
          Événements ({evenements?.length ?? 0})
        </h2>

        {error ? (
          <p role="alert" className="text-sm font-medium text-error">
            Impossible de charger la liste : {error.message}
          </p>
        ) : null}

        {evenements?.length === 0 ? (
          <p className="text-on-surface-variant">
            Aucun événement pour l’instant.
          </p>
        ) : null}

        <ul className="space-y-2">
          {evenements?.map((e) => (
            <li
              key={e.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-3"
            >
              <div>
                <p className="font-medium">{e.titre}</p>
                <p className="text-sm text-on-surface-variant">
                  {formaterDate(e.date_evenement)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${
                  e.statut === "publie"
                    ? "bg-primary-fixed text-primary"
                    : "bg-secondary-container text-on-secondary-container"
                }`}
              >
                {e.statut === "publie" ? "Publié" : "Brouillon"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
