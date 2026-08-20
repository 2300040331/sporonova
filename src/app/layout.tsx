import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SporoNova | Premium Mushroom Spawn & Cultivation Solutions",
  description: "SpawnTech is India's leading mushroom spawn manufacturer. We provide high-quality certified liquid spawn, grain spawn, and mother cultures, alongside training and cultivation guides for a sustainable future.",
  keywords: "mushroom spawn, SpawnTech, liquid spawn, grain spawn, mushroom cultivation, mother culture, commercial farming, agricultural solutions, training and support",
  openGraph: {
    title: "SporoNova | Premium Mushroom Spawn & Cultivation Solutions",
    description: "High-quality certified mushroom spawn manufacturing. Scientific solutions for commercial growers and training programs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;600;700&family=Anton&family=Arvo:wght@400;700&family=Barlow:wght@400;600;700&family=Bebas+Neue&family=Bitter:wght@400;600;700&family=Cabin:wght@400;600;700&family=Caveat:wght@400;700&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@400;600;700&family=Crimson+Text:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&family=Domine:wght@400;600;700&family=EB+Garamond:wght@400;600;700&family=Fira+Code:wght@400;600&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&family=Josefin+Sans:wght@400;600;700&family=Karma:wght@400;600;700&family=Lato:wght@300;400;700&family=Libre+Baskerville:wght@400;700&family=Lora:wght@400;600;700&family=Manrope:wght@400;600;700;800&family=Merriweather:wght@300;400;700&family=Montserrat:wght@400;600;700;800&family=Newsreader:wght@400;600;700&family=Nunito:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Oswald:wght@400;600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=PT+Serif:wght@400;700&family=Pacifico&family=Playfair+Display:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Quicksand:wght@400;600;700&family=Raleway:wght@400;600;700&family=Roboto:wght@300;400;500;700&family=Rubik:wght@400;600;700&family=Satisfy&family=Sora:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&family=Space+Mono:wght@400;700&family=Spectral:wght@400;600;700&family=Syne:wght@400;700;800&family=Ubuntu:wght@400;500;700&family=Unbounded:wght@400;700;800&family=Vollkorn:wght@400;600;700&family=Work+Sans:wght@400;600;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8f7f3] text-[#333333] selection:bg-[#4e8c4a]/20 selection:text-[#4e8c4a]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

