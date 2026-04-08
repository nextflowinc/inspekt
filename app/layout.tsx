import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ShootingStars from "./components/ShootingStars";
import AuthProvider from "./components/providers/AuthProvider"; // Vérifie bien que le dossier est là

// Configuration de la police
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
});

// Métadonnées SEO
export const metadata: Metadata = {
  title: "Inspekt — Le diagnostic web intelligent",
  description: "Analysez automatiquement n'importe quel site web. Liens brisés, SEO, performance.",
  keywords: "audit web, diagnostic web, liens brisés, SEO, agence web",
  openGraph: {
    title: "Inspekt — Le diagnostic web intelligent",
    description: "Analysez automatiquement n'importe quel site web en quelques minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`bg-[#020617] text-white antialiased ${jakarta.className}`}>
        {/* Le Provider enveloppe tout pour que useSession fonctionne partout */}
        <AuthProvider>
          <ShootingStars />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}