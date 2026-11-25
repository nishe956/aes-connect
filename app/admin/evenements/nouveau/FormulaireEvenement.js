"use client";

import { useState, useTransition } from "react";
import { creerEvenement } from "../actions";

const champ =
  "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-base";

const PAYS = [
  { code: "BF", nom: "Burkina Faso" },
  { code: "ML", nom: "Mali" },
  { code: "NE", nom: "Niger" },
  { code: "AES", nom: "AES (ensemble)" },
];

function Champ({ label, aide, children }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {aide ? (
        <span className="block text-xs text-on-surface-variant">{aide}</span>
      ) : null}
    </label>
  );
}

export default function FormulaireEvenement() {
  const [erreur, setErreur] = useState(null);
  const [enCours, demarrer] = useTransition();

  function envoyer(evenement) {
    evenement.preventDefault();
    const donnees = new FormData(evenement.currentTarget);
    setErreur(null);
    demarrer(async () => {
      const resultat = await creerEvenement(donnees);
      if (resultat?.erreur) {
        setErreur(resultat.erreur);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  return (
    <form onSubmit={envoyer} className="space-y-6">
      {erreur ? (
        <p
          role="alert"
          className="rounded-xl bg-error-container p-3 text-sm font-medium text-error"
        >
          {erreur}
        </p>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">L’événement</h2>

        <Champ label="Titre *">
          <input name="titre" required minLength={5} maxLength={200} className={champ} />
        </Champ>

        <div className="grid grid-cols-2 gap-3">
          <Champ label="Date *">
            <input name="date_evenement" type="date" required className={champ} />
          </Champ>
          <Champ label="Lieu">
            <input name="lieu" placeholder="Niamey" className={champ} />
          </Champ>
        </div>

        <Champ label="Résumé * (10 à 600 caractères)">
          <textarea name="resume" required rows={3} maxLength={600} className={champ} />
        </Champ>

        <div className="grid grid-cols-2 gap-3">
          <Champ label="Catégorie *">
            <select name="categorie" required defaultValue="" className={champ}>
              <option value="" disabled>
                Choisir…
              </option>
              <option value="politique">Politique</option>
              <option value="securite">Sécurité</option>
              <option value="economie">Économie</option>
              <option value="diplomatie">Diplomatie</option>
            </select>
          </Champ>
          <Champ label="Importance">
            <select name="importance" defaultValue="2" className={champ}>
              <option value="1">1 — Secondaire</option>
              <option value="2">2 — Important</option>
              <option value="3">3 — Majeur</option>
            </select>
          </Champ>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Pays concernés *</legend>
          <div className="grid grid-cols-2 gap-2">
            {PAYS.map((p) => (
              <label key={p.code} className="flex items-center gap-2">
                <input type="checkbox" name="pays" value={p.code} className="h-5 w-5" />
                <span className="text-sm">{p.nom}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Explications</h2>

        <Champ label="Points clés" aide="Un point par ligne.">
          <textarea name="points_cles" rows={3} className={champ} />
        </Champ>
        <Champ label="Contexte : avant">
          <textarea name="contexte_avant" rows={3} className={champ} />
        </Champ>
        <Champ label="Contexte : ce qui s’est passé">
          <textarea name="contexte_evenement" rows={3} className={champ} />
        </Champ>
        <Champ label="Contexte : ce que ça change">
          <textarea name="contexte_impact" rows={3} className={champ} />
        </Champ>
        <Champ label="Lien vers un reportage ou une vidéo (facultatif)">
          <input name="lien_media" type="url" placeholder="https://" className={champ} />
        </Champ>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Sources</h2>
        <p className="text-sm text-on-surface-variant">
          Il faut au moins 2 sources pour publier, dont une officielle quand
          elle existe. Laisse vide une source que tu n’utilises pas.
        </p>

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="space-y-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
          >
            <h3 className="font-semibold">Source {i}</h3>
            <Champ label="Titre du document ou de l’article">
              <input name={`source_titre_${i}`} className={champ} />
            </Champ>
            <div className="grid grid-cols-2 gap-3">
              <Champ label="Éditeur">
                <input name={`source_editeur_${i}`} className={champ} />
              </Champ>
              <Champ label="Type">
                <select name={`source_type_${i}`} defaultValue="" className={champ}>
                  <option value="">—</option>
                  <option value="officiel">Officiel</option>
                  <option value="presse">Presse</option>
                  <option value="academique">Académique</option>
                </select>
              </Champ>
            </div>
            <Champ label="Lien">
              <input
                name={`source_url_${i}`}
                type="url"
                placeholder="https://"
                className={champ}
              />
            </Champ>
            <Champ label="Date de publication">
              <input name={`source_date_${i}`} type="date" className={champ} />
            </Champ>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <Champ
          label="Statut"
          aide="« Publié » rend l’événement visible du public : 2 sources minimum."
        >
          <select name="statut" defaultValue="brouillon" className={champ}>
            <option value="brouillon">Brouillon (invisible du public)</option>
            <option value="publie">Publié</option>
          </select>
        </Champ>

        <button
          type="submit"
          disabled={enCours}
          className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary disabled:opacity-60"
        >
          {enCours ? "Enregistrement…" : "Enregistrer l’événement"}
        </button>
      </section>
    </form>
  );
}
