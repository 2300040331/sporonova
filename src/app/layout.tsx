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
      <body className="min-h-full flex flex-col bg-[#f8f7f3] text-[#333333] selection:bg-[#4e8c4a]/20 selection:text-[#4e8c4a]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

