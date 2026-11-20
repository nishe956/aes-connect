import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Accueil() {
  return (
    <div className="space-y-8 pb-6">
      <section className="pt-6 text-center">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-primary">
          Comprends l’AES,
          <br />
          source à l’appui.
        </h1>
        <p className="mt-3 text-on-surface-variant">
          Les événements de la Confédération des États du Sahel, en faits
          datés, sourcés et expliqués simplement.
        </p>
        <Link
          href="/chronologie"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary"
        >
          Explorer la chronologie
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <section aria-labelledby="reperes" className="space-y-3">
        <h2
          id="reperes"
          className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
        >
          Événements repères
        </h2>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5">
          <p className="text-on-surface-variant">
            Les premiers événements arrivent bientôt.
          </p>
        </div>
      </section>

      <Link
        href="/methodologie"
        className="flex items-center gap-3 rounded-xl bg-surface-container-low p-4"
      >
        <ShieldCheck
          size={22}
          className="shrink-0 text-primary"
          aria-hidden="true"
        />
        <span className="flex-1 text-sm">
          Chaque fait est daté et appuyé par des sources vérifiées.
        </span>
        <span className="text-sm font-semibold text-primary">Méthode</span>
      </Link>
    </div>
  );
}
