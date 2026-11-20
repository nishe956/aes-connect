import BientotDisponible from "@/components/BientotDisponible";

export const metadata = { title: "Actualités" };

export default function Actualites() {
  return (
    <BientotDisponible
      titre="Actualités sélectionnées"
      texte="Des liens choisis vers les sources originales, jamais des articles copiés."
    />
  );
}
