import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "AES Connect — Comprendre l’AES, source à l’appui",
    template: "%s — AES Connect",
  },
  description:
    "Une chronologie datée et sourcée de la Confédération des États du Sahel (AES), expliquée simplement. Plateforme indépendante.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans text-on-surface antialiased">
        <Header />
        <main className="mx-auto w-full max-w-2xl px-4 pt-4">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
