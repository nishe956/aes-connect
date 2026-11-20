import BientotDisponible from "@/components/BientotDisponible";

export const metadata = { title: "Chronologie" };

export default function Chronologie() {
  return (
    <BientotDisponible
      titre="Chronologie des faits"
      texte="Chaque événement y sera daté, expliqué et appuyé par des sources vérifiées."
    />
  );
}
