import Link from "next/link";
import { exigerAdmin } from "@/lib/admin";
import FormulaireEvenement from "./FormulaireEvenement";

export default async function NouvelEvenement() {
  await exigerAdmin();

  return (
    <div className="space-y-5 pb-6 pt-4">
      <Link href="/admin" className="text-sm font-semibold text-primary">
        ← Retour à l’administration
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight text-primary">
        Nouvel événement
      </h1>
      <FormulaireEvenement />
    </div>
  );
}
