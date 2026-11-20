"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Clock, Newspaper, Info } from "lucide-react";

const items = [
  { href: "/", label: "Accueil", Icon: House, aussi: [] },
  { href: "/chronologie", label: "Chronologie", Icon: Clock, aussi: [] },
  { href: "/actualites", label: "Actualités", Icon: Newspaper, aussi: [] },
  {
    href: "/a-propos",
    label: "À propos",
    Icon: Info,
    aussi: ["/methodologie", "/mentions-legales"],
  },
];

function estActif(pathname, href, aussi) {
  if (href === "/") return pathname === "/";
  return [href, ...aussi].some(
    (chemin) => pathname === chemin || pathname.startsWith(chemin + "/")
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-outline-variant bg-surface-container-lowest pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto grid max-w-2xl grid-cols-4">
        {items.map(({ href, label, Icon, aussi }) => {
          const actif = estActif(pathname, href, aussi);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={actif ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2 text-xs ${
                  actif
                    ? "font-semibold text-primary"
                    : "text-on-surface-variant"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={actif ? 2.5 : 2}
                  aria-hidden="true"
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
