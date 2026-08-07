import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | SporoNova — Premium Mushroom Spawn & Cultivation",
  description:
    "Discover SporoNova's journey in agricultural biotechnology. We combine scientific research, precision biotechnology, and sustainable practices to produce premium mushroom spawn empowering farmers and cultivators across India.",
  keywords:
    "SporoNova about, mushroom spawn company, agricultural biotechnology, liquid spawn technology, sustainable mushroom cultivation, scientific cultivation",
  openGraph: {
    title: "About Us | SporoNova — Premium Mushroom Spawn & Cultivation",
    description:
      "Discover SporoNova's journey in agricultural biotechnology. Scientific research, precision biotech, and sustainable mushroom spawn production.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
