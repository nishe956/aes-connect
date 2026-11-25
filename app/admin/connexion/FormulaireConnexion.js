"use client";

import { useActionState } from "react";
import { connexion } from "../actions";

const champ =
  "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-base";

export default function FormulaireConnexion() {
  const [etat, action, enCours] = useActionState(connexion, null);

  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-1">
        <span className="text-sm font-medium">E-mail</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={champ}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium">Mot de passe</span>
        <input
          name="motDePasse"
          type="password"
          autoComplete="current-password"
          required
          className={champ}
        />
      </label>

      {etat?.erreur ? (
        <p role="alert" className="text-sm font-medium text-error">
          {etat.erreur}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary disabled:opacity-60"
      >
        {enCours ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
