import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-2xl px-4 pb-28 pt-8 text-center text-xs text-on-surface-variant">
      <p>Plateforme indépendante, non affiliée à l’AES.</p>
      <p className="mt-1">
        <Link href="/methodologie" className="underline">
          Notre méthode
        </Link>
        {" · "}
        <Link href="/mentions-legales" className="underline">
          Mentions légales et confidentialité
        </Link>
      </p>
    </footer>
  );
}
