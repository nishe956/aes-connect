import Link from "next/link";

export const metadata = { title: "À propos" };

const valeurs = [
  {
    titre: "Neutralité",
    texte:
      "Nous présentons les faits, sans soutenir ni critiquer les régimes en place.",
  },
  {
    titre: "Pluralité",
    texte:
      "Les perspectives institutionnelles, académiques et citoyennes sont représentées.",
  },
  {
    titre: "Fiabilité",
    texte: "Chaque information cite sa source d’origine.",
  },
  {
    titre: "Accessibilité",
    texte: "Un français simple, lisible sur téléphone.",
  },
];

export default function APropos() {
  return (
    <div className="space-y-5 pb-6 pt-4">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">
        À propos
      </h1>

      <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5">
        <h2 className="text-lg font-semibold">Pourquoi AES Connect ?</h2>
        <p className="mt-2 text-on-surface-variant">
          Parce que l’information sur l’AES est dispersée et difficile à
          vérifier. Nous la rendons claire, datée et sourcée.
        </p>
      </section>

      <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5">
        <h2 className="text-lg font-semibold">Qui est derrière le site ?</h2>
        <p className="mt-2">
          <strong>Nikie</strong>, étudiante en informatique au Burkina
          Institute of Technology (BIT).
        </p>
        {/* À COMPLÉTER : une ou deux phrases sur ta démarche, dans tes mots. */}
        <p className="mt-2 text-on-surface-variant">
          AES Connect est une initiative citoyenne et indépendante, non
          affiliée à l’AES.
        </p>
      </section>

      <section aria-labelledby="valeurs" className="space-y-3">
        <h2 id="valeurs" className="text-lg font-semibold">
          Nos principes
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {valeurs.map((v) => (
            <div
              key={v.titre}
              className="rounded-xl bg-surface-container-low p-4"
            >
              <h3 className="font-semibold text-primary">{v.titre}</h3>
              <p className="mt-1 text-sm text-on-surface-variant">{v.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <Link
        href="/methodologie"
        className="inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary"
      >
        Notre méthode
      </Link>
    </div>
  );
}
