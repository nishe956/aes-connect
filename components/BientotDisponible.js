export default function BientotDisponible({ titre, texte }) {
  return (
    <section className="space-y-3 pb-6 pt-4">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">
        {titre}
      </h1>
      <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5">
        <p className="font-medium">Bientôt disponible</p>
        <p className="mt-1 text-on-surface-variant">{texte}</p>
      </div>
    </section>
  );
}
