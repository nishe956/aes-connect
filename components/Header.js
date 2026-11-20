import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-outline-variant bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex max-w-2xl flex-col px-4 py-3">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-primary"
        >
          AES Connect
        </Link>
        <p className="text-xs text-on-surface-variant">
          Comprendre l’AES, source à l’appui
        </p>
      </div>
    </header>
  );
}
