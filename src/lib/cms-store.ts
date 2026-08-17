import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { list, put } from "@vercel/blob";
import { SectionStylesConfig } from "./styles-helper";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "Super Admin" | "Admin" | "Editor";
  status: "Active" | "Inactive";
  createdAt: string;
  lastLogin?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  title: string;
  message: string;
  createdAt: string;
  status: "New" | "Read" | "Replied" | "Archived";
}

export interface CMSData {
  header: {
    logoUrl: string;
    logoAlt: string;
    logoHeight: number;
    backgroundColor: string;
    textColor: string;
    hoverColor: string;
    ctaText: string;
    ctaLink: string;
    sticky: boolean;
    navLinks: Array<{ name: string; href: string; order: number }>;
    productsDropdown: Array<{ name: string; href: string }>;
    styles?: SectionStylesConfig;
  };
  footer: {
    logoUrl: string;
    description: string;
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    copyrightText: string;
    backgroundColor: string;
    textColor: string;
    socialLinks: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
    };
    quickLinks: Array<{ name: string; href: string }>;
    styles?: SectionStylesConfig;
  };
  homepage: {
    hero: {
      badge: string;
      headingText: string;
      headingColor: string;
      headingSize: string;
      subtitleText: string;
      subtitleColor: string;
      ctaPrimaryText: string;
      ctaPrimaryLink: string;
      ctaSecondaryText: string;
      ctaSecondaryLink: string;
      heroImage: string;
      backgroundImage: string;
      showModel: boolean;
      styles?: SectionStylesConfig;
    };
    valuesSectionTitle: string;
    valuesSectionSubtitle: string;
    valuesSectionBadge?: string;
    productsSectionBadge?: string;
    productsSectionTitle?: string;
    productsSectionSubtitle?: string;
    deliverablesStats?: any[];
    processPreviewSteps?: any[];
    stats?: any[];
    industriesSectionTitle: string;
    credentialsSectionTitle: string;
    testimonialsSectionTitle: string;
    statsStyles?: SectionStylesConfig;
    productsHeaderStyles?: SectionStylesConfig;
    credentialsStyles?: SectionStylesConfig;
    partnershipsStyles?: SectionStylesConfig;
    deliverablesStyles?: SectionStylesConfig;
    industriesStyles?: SectionStylesConfig;
    testimonialsStyles?: SectionStylesConfig;
    whyChooseUsStyles?: SectionStylesConfig;
    successNumbersStyles?: SectionStylesConfig;
  };
  products: Array<{
    id: string;
    name: string;
    category: string;
    desc: string;
    href: string;
    price?: string;
    status: "Published" | "Draft" | "Hidden";
    featured: boolean;
    thumbnail: string;
    images: string[];
    specifications: Record<string, string>;
    pdfUrl?: string;
    sortOrder: number;
    scientificName?: string;
    introduction?: string;
    history?: string;
    principle?: string;
    composition?: string[];
    advantages?: string[];
    disadvantages?: string[];
    applications?: string[];
    process?: string[];
    labSpecs?: string[];
    storage?: string;
    shelfLife?: string;
    transport?: string;
    qualityTesting?: string[];
    commercialUses?: string;
    govApplications?: string;
    faqs?: Array<{ q: string; a: string }>;
    papers?: Array<{ title: string; author: string; journal: string }>;
    styles?: SectionStylesConfig;
  }>;
  categories: Array<{ id: string; name: string; slug: string; desc: string }>;
  values: Array<{ title: string; desc: string; tag: string; metric: string }>;
  industries: Array<{ name: string; desc: string }>;
  credentials: Array<{ title: string; status: string; desc: string }>;
  testimonials: Array<{ quote: string; author: string; role: string }>;
  deliverables: Array<{ label: string; desc: string }>;
  faqs: Array<{ id: string; question: string; answer: string; category: string }>;
  about: {
    heroTitle: string;
    heroSubtitle: string;
    whoWeAreTitle: string;
    whoWeAreParagraph1: string;
    whoWeAreParagraph2: string;
    whoWeAreImage: string;
    visionTitle: string;
    visionDesc: string;
    missionTitle: string;
    missionDesc: string;
    qualityTitle: string;
    qualityDesc: string;
    journeySteps?: Array<{ stepNumber: number; title: string; description: string }>;
    scienceCards?: Array<{ id?: string; title: string; description: string; badge?: string }>;
    qualityCards?: Array<{ title: string; description: string }>;
    partnershipCards?: Array<{ title: string; description: string }>;
    whyChooseCards?: Array<{ title: string; description: string }>;
    processSteps?: Array<{ stepNumber: number; title: string; description: string }>;
    techBadges?: Array<{ label: string }>;
    aboutGallery?: Array<{ url: string; title: string }>;
    styles?: SectionStylesConfig;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    getInTouchTitle: string;
    getInTouchParagraph: string;
    phone: string;
    address: string;
    email: string;
    footerTag: string;
    whatsappNumber: string;
    mapIframeUrl: string;
    styles?: SectionStylesConfig;
  };
  processSteps: Array<{
    id: string;
    stepNumber: number;
    step?: string;
    title: string;
    subtitle?: string;
    description: string;
    purpose?: string;
    icon?: string;
    image?: string;
    temp?: string;
    time?: string;
    pressure?: string;
    equipment?: string[];
    precautions?: string;
    qualityCheck?: string;
    details?: string[];
  }>;
  processStyles?: SectionStylesConfig;
  whyChooseUsCards: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    highlight: string;
  }>;
  knowledgeCenter: Array<{
    id: string;
    title: string;
    type: "Article" | "Blog" | "News" | "Video" | "Download";
    category: string;
    summary: string;
    content: string;
    date: string;
    author: string;
    fileUrl?: string;
    readTime?: string;
    complexity?: string;
  }>;
  knowledgeStyles?: SectionStylesConfig;
  successNumbers?: Array<{ value: string; label: string }>;
  partnerships?: Array<{ title: string; points: string[] }>;
  gallery: Array<{ id: string; url: string; title: string; category: string }>;
  media: Array<{
    id: string;
    filename: string;
    url: string;
    size: string;
    mimeType: string;
    altText: string;
    uploadedAt: string;
  }>;
  seo: Record<
    string,
    {
      metaTitle: string;
      metaDescription: string;
      keywords: string;
      canonicalUrl: string;
      ogImage: string;
    }
  >;
  settings: {
    siteName: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamilyHeading: string;
    fontFamilyBody: string;
    containerWidth: string;
    sectionPadding: string;
    borderRadius: string;
  };
  users: UserRecord[];
  contacts: ContactSubmission[];
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
    productDownloads: number;
    topPages: Array<{ page: string; views: number }>;
    deviceBreakdown: Array<{ device: string; percentage: number }>;
  };
  backups: Array<{ id: string; filename: string; createdAt: string; size: string; type: string }>;
}

const DB_PATH = path.join(process.cwd(), "src", "data", "cms-db.json");

// Default initial data matching Sporonova public website
const INITIAL_DATA: CMSData = {
  header: {
    logoUrl: "/logo_transparent.png",
    logoAlt: "SPORONOVA",
    logoHeight: 56,
    backgroundColor: "#ffffff",
    textColor: "#1c3c24",
    hoverColor: "#4e8c4a",
    ctaText: "Contact Us",
    ctaLink: "/contact",
    sticky: true,
    navLinks: [
      { name: "Home", href: "/", order: 1 },
      { name: "Production Process", href: "/process", order: 2 },
      { name: "About Us", href: "/about", order: 3 },
      { name: "Why Choose Us", href: "/#why-choose-us", order: 4 },
      { name: "Knowledge Center", href: "/knowledge", order: 5 },
    ],
    productsDropdown: [
      { name: "Liquid Spawn", href: "/spawn/liquid-spawn" },
      { name: "Grain Spawn", href: "/spawn/grain-spawn" },
      { name: "Mother Culture", href: "/spawn/mother-culture" },
      { name: "Commercial Spawn", href: "/spawn/commercial-spawn" },
    ],
  },
  footer: {
    logoUrl: "/logo_transparent.png",
    description:
      "India's leading mushroom spawn manufacturer. Providing certified liquid spawn, grain spawn, and mother cultures alongside technical training for commercial growers.",
    address: "Koni, Bilaspur, Chhattisgarh 495009",
    email: "sales@sporonova.com",
    phone: "+91 72072 08419",
    whatsapp: "+917207208419",
    copyrightText: "© 2026 SporoNova Biotech. All rights reserved.",
    backgroundColor: "#112217",
    textColor: "#a3b899",
    socialLinks: {
      facebook: "https://facebook.com/sporonova",
      twitter: "https://twitter.com/sporonova",
      linkedin: "https://linkedin.com/company/sporonova",
      instagram: "https://instagram.com/sporonova",
    },
    quickLinks: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/#products" },
      { name: "Process", href: "/process" },
      { name: "About Us", href: "/about" },
      { name: "Knowledge Center", href: "/knowledge" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
  homepage: {
    hero: {
      badge: "SPORONOVA • AGRICULTURAL SPAWN MANUFACTURER",
      headingText: "Premium Mushroom Spawn for Better Harvests",
      headingColor: "#ffffff",
      headingSize: "text-4xl md:text-5xl lg:text-6xl",
      subtitleText:
        "We produce high-quality mushroom spawn using scientific methods, helping farmers, entrepreneurs, research institutions, and commercial growers achieve consistent and healthy mushroom production.",
      subtitleColor: "rgba(255, 255, 255, 0.8)",
      ctaPrimaryText: "EXPLORE OUR PRODUCTS →",
      ctaPrimaryLink: "/#products",
      ctaSecondaryText: "TALK TO AN EXPERT",
      ctaSecondaryLink: "/contact",
      heroImage: "/hero_mushrooms.jpg",
      backgroundImage: "/hero_bg_pattern.svg",
      showModel: false,
    },
    stats: [
      { value: "14+", label: "Mushroom Varieties", sublabel: "Including Shiitake & more", icon: "Leaf" },
      { value: "50%", label: "Higher Yield", sublabel: "Compared to grain spawn", icon: "Award" },
      { value: "3 Months", label: "Shelf Life", sublabel: "At 4°C temperature", icon: "Clock" },
      { value: "100%", label: "Organic & Chemical Free", sublabel: "Pure & safe cultivation", icon: "Shield" },
    ],
    valuesSectionBadge: "Quality Assurance Protocols",
    valuesSectionTitle: "Why Growers Choose SporoNova",
    valuesSectionSubtitle: "Our standard manufacturing protocols solve major cultivation hazards, ensuring optimal biological efficiency and reproducible harvest yields.",
    productsSectionBadge: "Product Catalog",
    productsSectionTitle: "Professional Spawn Categories",
    productsSectionSubtitle: "Explore our certified spawn selection. Select any category to view technical data sheets, storage values, and application guides.",
    industriesSectionTitle: "Empowering Agritech Across Sectors",
    credentialsSectionTitle: "Accreditations & Institutional Trust",
    testimonialsSectionTitle: "Trusted by Commercial Growers Across India",
    deliverablesStats: [
      { value: "200+", label: "Farmers Trained Year 1" },
      { value: "50%", label: "Yield Increase per Farmer" },
      { value: "3x", label: "Income Multiplier (Projected)" },
      { value: "14", label: "Mushroom Varieties Available" },
    ],
    processPreviewSteps: [
      { name: "Mother Culture", desc: "Genomics slant isolation.", iconName: "Dna" },
      { name: "Spawn Production", desc: "Inoculating carrier blocks.", iconName: "Settings" },
      { name: "Quality Testing", desc: "100% purity clearance.", iconName: "ShieldCheck" },
      { name: "Packaging", desc: "Eco filter bag sealing.", iconName: "Box" },
      { name: "Distribution", desc: "Cold chain logistics dispatch.", iconName: "Send" },
    ],
  },
  products: [
    {
      id: "liquid-spawn",
      name: "Liquid Spawn",
      category: "Industrial Inoculant",
      desc: "Active vegetative mycelium cells suspended in sterilized liquid sugar broth, optimized for bioreactor inoculation.",
      href: "/spawn/liquid-spawn",
      status: "Published",
      featured: true,
      thumbnail: "/liquid_spawn_bottle.png",
      images: ["/liquid_spawn_bottle.png"],
      specifications: { Storage: "2°C - 4°C", ShelfLife: "90 Days", Purity: "99.9%" },
      sortOrder: 1,
      scientificName: "Mycelial Biomass Broth",
      introduction: "Active vegetative mycelium cells propagated inside a sterile liquid sugar solution, providing exponential inoculation surface coordinates.",
      history: "First pioneered in university research laboratories during the 1970s, liquid fermentation revolutionized commercial button mushroom yields by automating inoculant distribution.",
      principle: "Mycelium requires carbon, nitrogen, and minerals. In a liquid medium, gentle aeration breaks expanding cell clusters into microscopic fragments, each acting as an individual inoculation hub.",
      composition: [
        "Distilled Water (Pure H2O baseline)",
        "Organic Light Malt Extract (Carbon carbohydrate source)",
        "Bacteriological Yeast Extract (Nitrogen protein source)",
        "Magnesium Sulfate (Critical cell division mineral)"
      ],
      advantages: [
        "Exponentially faster colonization (90% decrease in lag phase)",
        "100% inoculation nodes covering the entire carrier matrix",
        "Bioreactor scaling reduces lab labor overheads",
        "Direct sterile needle syringe injection blocks mold spores"
      ],
      disadvantages: [
        "Short shelf life (must be chilled and used within 3 weeks)",
        "Requires advanced cleanroom testing to verify micro-contaminants",
        "Liquid turbidity makes visual contamination checks difficult"
      ],
      applications: [
        "Inoculating G1 grain master spawn jars",
        "Direct bioreactor biomass scale-up runs",
        "Automated commercial bagging line injections"
      ],
      process: [
        "Liquid Media Preparation: Dissolving sugars and nutrients at 45 minutes",
        "Autoclave Sterilization: Steaming at 121°C, 15 PSI for 25 minutes",
        "Cooling cycle: Ambient laminar cooling to 25°C for 6 hours",
        "Inoculation: Technicians inject G0 mother agar culture in HEPA hood",
        "Agitation & Aeration: Incubate on orbital shaker tables for 5 days"
      ],
      labSpecs: [
        "Class 100 sterile laminar air bench",
        "Orbital shaker incubator table",
        "Phase-contrast scientific microscope (1000x magnification)"
      ],
      storage: "Preserved inside clean air-filtered cold-vault refrigeration (2°C - 3.5°C). Do not freeze.",
      shelfLife: "21 Days maximum peak viability.",
      transport: "Certified logistics cold chain cargo (cold boxes at 4°C). Overnight air dispatch recommended.",
      qualityTesting: [
        "Agar sector plate testing: verifying clean growth margins",
        "Liquid turbidity verification: checking for bacterial cloudiness",
        "Laser particle count check: monitoring mycelial density threshold"
      ],
      commercialUses: "Primary inoculant for massive white button and oyster commercial farms globally.",
      govApplications: "Distributed to municipal automated farms under state-backed horticulture technology grants.",
      faqs: [
        { q: "Why does liquid spawn grow faster than grain spawn?", a: "Liquid spawn contains millions of tiny suspended hyphal fragments per milliliter, which spread instantly across the substrate, whereas grain spawn inoculates only at direct grain contact points." },
        { q: "How do you detect contamination in liquid spawn?", a: "By testing sample drops on petri plates (agar plating) and checking for yeast or bacterial growth patterns under phase-contrast microscopes." }
      ],
      papers: [
        { title: "Liquid Fermentation of Pleurotus Strains in Stirred Bioreactors", author: "Dr. Kenji Sato et al.", journal: "Journal of Applied Mycology, 2023" },
        { title: "Comparative Yield Analysis of Liquid vs. Grain Spawn Inoculations", author: "H. Patel, R. Miller", journal: "Biotech Agriculture quarterly, 2025" }
      ]
    },
    {
      id: "grain-spawn",
      name: "Grain Spawn",
      category: "Carrier Matrix",
      desc: "Sterilized cereal grains (wheat, millet) fully colonized by pure mycelium, standard for bulk agricultural beds.",
      href: "/spawn/grain-spawn",
      status: "Published",
      featured: true,
      thumbnail: "/grain_jar.png",
      images: ["/grain_jar.png"],
      specifications: { Grain: "Wheat/Millet", Moisture: "48%", ExpansionRatio: "1:20" },
      sortOrder: 2,
      scientificName: "Cereal Grain Vegetative Inoculant",
      introduction: "Sterilized cereal grains hydrated and colonized by pure mycelium, forming robust vegetative carrier kernels.",
      history: "Developed in the 1930s by agricultural scientist Senden, substituting wild compost spawn with sterile, grain-based carriers, establishing modern mushroom farming.",
      principle: "Grains act as both nutrition storehouses and physical anchors. When mixed with bulk substrates, each colonized grain acts as a center of biological mycelium expansion.",
      composition: [
        "Hydrated cereal grains (Wheat, Millet, or Rye grass kernels)",
        "Calcium Sulfate (Gypsum: acts as anti-clumping agent)",
        "Calcium Carbonate (Chalk: balances substrate pH levels)"
      ],
      advantages: [
        "Long shelf life (refrigerated up to 3 months)",
        "High carbohydrate storage provides energy to colonize poor soils",
        "Easy visual detection of competitive molds or bacterial wet-spot",
        "Physically easy to shake and disperse evenly throughout bulk compost"
      ],
      disadvantages: [
        "Attracts rodents and insect pests in outdoor environments",
        "Longer preparation cycle (requires grain boiling, drying, and soaking)",
        "Higher raw material costs (cereal grains prices rise seasonally)"
      ],
      applications: [
        "Direct inoculation of pasteurized agricultural straw bags",
        "Inoculating commercial mushroom compost beds",
        "Home cultivation setups in indoor grow chambers"
      ],
      process: [
        "Grain Hydration: Boiling cereal grains for 35 minutes to achieve 50% humidity",
        "Chalk/Gypsum Addition: Mixing powders to adjust pH and block clumping",
        "Autoclave Sterilization: Heating at 121°C (15 PSI) for 90 minutes",
        "Inoculation: Injecting active liquid spawn or transferring agar slants",
        "Incubation: Climate room storage for 14 days with manual shaking"
      ],
      labSpecs: [
        "Heavy duty autoclaves with vacuum extraction",
        "Bulk grain boiling and rinsing stations",
        "Temperature controlled high-airflow incubation bays"
      ],
      storage: "Clean refrigerated vaults (2°C - 4°C). Keep bags upright to prevent filter contamination.",
      shelfLife: "90 Days maximum refrigeration storage.",
      transport: "Refrigerated freight logistics trucks. Insulate bags to avoid condensation buildup.",
      qualityTesting: [
        "Visual bag mold check: looking for green Aspergillus or black Pin-mold",
        "Smell analysis: rejecting bags with sour bacterial scent",
        "Vigor bounce test: verifying rapid recovery after bag shaking"
      ],
      commercialUses: "The standard inoculant for commercial Oyster, Shiitake, and Button mushroom farming worldwide.",
      govApplications: "Distributed bulk spawn to rural cooperative agricultural training centers under microfinance projects.",
      faqs: [
        { q: "Which grain is best for spawn production?", a: "Millet is ideal due to its small grain size, which provides more inoculation points per kilogram. Wheat is preferred for larger mushrooms due to higher nutrient volumes." },
        { q: "What is the purpose of gypsum in grain spawn?", a: "Gypsum prevents individual grains from sticking together into a solid block, making it easy to break and shake the bag." }
      ],
      papers: [
        { title: "Influence of Cereal Grains on Vegetative Mycelium Expansion Rate", author: "Dr. Sarah Jenkins", journal: "Applied Agricultural Mycology, 2024" }
      ]
    },
    {
      id: "mother-culture",
      name: "Mother Culture",
      category: "Genomic Isolate (G0)",
      desc: "Pure strain mycelium isolated on agar media slants inside glass tubes, serving as the primary genetic starting point.",
      href: "/spawn/mother-culture",
      status: "Published",
      featured: true,
      thumbnail: "/mother_culture.png",
      images: ["/mother_culture.png"],
      specifications: { Media: "PDA Slant", Generation: "G0 Primary", StrainID: "SN-SHI-01" },
      sortOrder: 3,
      scientificName: "Genomic Agar Sub-Culture (G0)",
      introduction: "Pure mycelial strains isolated on sterile agar media slants inside borosilicate tubes, serving as the primary genetic repository.",
      history: "Agar slant preservation was adapted from standard bacteriological methods in the early 20th century to prevent strain degeneration and mutation drift.",
      principle: "Mycelium is cultivated on a solid nutrient agar matrix. By slowing metabolic activity at low temperatures, pure genetic lines are preserved without cell division fatigue.",
      composition: [
        "Bacteriological Agar-Agar (Solidifying agent)",
        "Light Malt Extract (Nutrient carbohydrate source)",
        "Peptone (Nitrogen and amino acid building blocks)",
        "Yeast Extract (Vitamin B complex source)"
      ],
      advantages: [
        "Maintains original genetic purity with zero mutation drift",
        "Long-term viability storage (up to 12 months under chill)",
        "Ideal for strain breeding and international genetic exchange",
        "Provides clear visual verification of sectoring growth margins"
      ],
      disadvantages: [
        "Requires advanced cleanroom micro-dissection skills",
        "Extremely slow initial expansion rates",
        "Highly vulnerable to spore contamination during initial inoculation"
      ],
      applications: [
        "Inoculating G1 master grain jars or liquid broth inoculants",
        "Preserving rare regional wild mycology collections",
        "Long-term strain banking in university research centers"
      ],
      process: [
        "Agar Media Preparation: Melt malt agar solution at 95°C for 20 minutes",
        "Pressure Autoclaving: Sterilize at 121°C, 15 PSI for 20 minutes",
        "Slant Tube Pouring: Dispense and angle tubes under HEPA hood to solidify",
        "Aseptic Inoculation: Transfer mycelium tissue margins to agar face",
        "Incubation: Store at 24°C for 7 days to verify clean colony growth"
      ],
      labSpecs: [
        "Class 100 sterile laminar air bench hood",
        "Inoculation flame loop sanitizer",
        "Digital temperature-controlled incubator vault"
      ],
      storage: "Preserved inside clean air-filtered cold vaults at 2°C - 4°C. Keep tubes upright.",
      shelfLife: "12 Months maximum storage before slant transfer.",
      transport: "Insulated shipping tubes with thermal cold packs. Overnight air express recommended.",
      qualityTesting: [
        "Rhizomorphic margin check: verifying concentric growth rings",
        "Mutation sector check: identifying and discarding fuzzy mutations",
        "Sub-plating check: testing on potato dextrose agar plates"
      ],
      commercialUses: "Genetic backup for large scale commercial mushroom production networks.",
      govApplications: "Strain archives for agricultural research agencies and public biotechnology universities.",
      faqs: [
        { q: "Why are slants used instead of petri dishes for long-term storage?", a: "Petri dishes dry out quickly due to air gaps, whereas capped test tubes retain moisture and protect agar media from dehydration for up to a year." },
        { q: "What is genetic sectoring?", a: "Sectoring is when a section of mycelium mutates and grows at a different rate or texture. These sectors must be discarded to keep the genetic line pure." }
      ],
      papers: [
        { title: "Preservation and Maintenance of Basidiomycete Cults on Agar Slants", author: "Dr. L. Vance, et al.", journal: "Applied Biotechnology Review, 2024" }
      ]
    },
    {
      id: "commercial-spawn",
      name: "Commercial Spawn",
      category: "Bulk Production (G2)",
      desc: "Mass-production colonized grain bags distributed directly to commercial growers for direct substrate inoculation.",
      href: "/spawn/commercial-spawn",
      status: "Published",
      featured: true,
      thumbnail: "/grain_jar.png",
      images: ["/grain_jar.png"],
      specifications: { Package: "2.5kg Polybag", Filter: "0.2 Micron", TargetYield: "1.2kg/bag" },
      sortOrder: 4,
      scientificName: "Bulk Substrate Inoculant (G2/G3)",
      introduction: "Fully colonized bulk grain or sawdust matrices packaged inside heavy-duty breathable filter bags, optimized for direct agricultural bed inoculation.",
      history: "Bulk spawn packaging evolved in the 1980s with the introduction of autoclavable polypropylene bags featuring integrated micro-filter patches, allowing gas exchange while blocking mold spores.",
      principle: "To colonize large volumes of substrate efficiently, spawn must be robust. Commercial spawn provides massive volume and inoculation points, allowing rapid colonizing of compost or straw.",
      composition: [
        "Sterilized organic millet or sorghum seeds",
        "Lignocellulosic hardwood sawdust matrix (for wood lovers)",
        "Agricultural gypsum (Anti-clumping mineral)",
        "Calcium carbonate (pH balancer)"
      ],
      advantages: [
        "Cost-effective bulk packaging for large scale commercial farms",
        "High inoculation point density due to millet seed distribution",
        "Sustained nutrition block to boost flush yield weights",
        "Bags are easy to shake and distribute evenly throughout bulk compost"
      ],
      disadvantages: [
        "High bulk freight shipping costs due to heavy package weights",
        "Lower shelf life compared to G1 master spawn",
        "Vulnerable to tearing during shipping or bed mixing"
      ],
      applications: [
        "Direct inoculation of pasteurized agricultural straw bags",
        "Inoculating commercial mushroom compost beds (Button mushrooms)",
        "Supplying agricultural cooperations under bulk farming programs"
      ],
      process: [
        "Bulk grain boiling: Hydrate seeds to 48% moisture contents",
        "Bag Filling & Sealing: Pack into filter bags and seal under clean airflow",
        "Sterilization: Autoclave bags at 121°C for 2.5 hours",
        "HEPA cooling: Rest bags in positive-pressure clean rooms for 12 hours",
        "Inoculation: Inject G1 master spawn into bags and seal"
      ],
      labSpecs: [
        "Large-capacity horizontal sterilizer autoclaves",
        "Bulk grain mixers and bag filling lines",
        "Temperature-controlled high-airflow incubation bays"
      ],
      storage: "Store in clean cold storage vaults (2°C - 3.5°C). Keep bags stacked upright with proper airflow space.",
      shelfLife: "60 Days peak viability under refrigeration.",
      transport: "Refrigerated freight logistics cargo at 4°C. Avoid humidity condensation.",
      qualityTesting: [
        "Visual bag inspection: check for green molds or yellow bacterial exudate",
        "Bounce test: verify raw vegetative recovery within 48 hours after bag shake",
        "Sector agar sub-plating test: check samples on petri dishes"
      ],
      commercialUses: "Bulk spawn distribution for industrial button & oyster cultivators.",
      govApplications: "Supplying state mushroom multiplication projects and national rural cooperatives.",
      faqs: [
        { q: "Can I use commercial spawn to make more spawn?", a: "We do not recommend expanding commercial spawn (G2) further, as third-generation scaling increases the risk of contamination and genetic mutation drift." },
        { q: "How much commercial spawn is needed for inoculation?", a: "Standard inoculation rate is 2% to 5% spawn weight to wet substrate weight, depending on the mushroom variety." }
      ],
      papers: [
        { title: "Yield and Biological Efficiency of Commercial Spawn Matrices", author: "H. Patel, R. Miller", journal: "Agricultural Biotechnology Quarterly, 2025" }
      ]
    },
  ],
  categories: [
    { id: "industrial", name: "Industrial Inoculants", slug: "industrial", desc: "Liquid broths for automated bioreactors" },
    { id: "carrier", name: "Carrier Matrix", slug: "carrier", desc: "Colonized grains for bed inoculation" },
    { id: "genomic", name: "Genomic Isolates", slug: "genomic", desc: "Mother cultures & genetic starter slants" },
  ],
  values: [
    { title: "Premium Quality", desc: "Genetically verified rhizomorphic strains yielding dense flushes.", tag: "GENOMIC PURITY", metric: "99.8%" },
    { title: "Scientific Production", desc: "Standardized laboratory parameters with precise autoclave logs.", tag: "HEPA CLASS 100", metric: "121°C / 15 PSI" },
    { title: "Low Contamination", desc: "Class 100 HEPA cleanroom filtration shields all transfers.", tag: "BIOSECURITY", metric: "< 0.01% RISK" },
    { title: "Consistent Performance", desc: "Rigorous testing guarantees reliable, reproducible spawn batches.", tag: "REPRODUCIBLE", metric: "100% PASS" },
    { title: "Expert Support", desc: "On-site cultivation guidance and substrate recipe optimization.", tag: "24/7 ADVISORY", metric: "FIELD CERTIFIED" },
    { title: "Certified Laboratory", desc: "State-accredited facilities compliant with standard biosecurity.", tag: "ISO 9001:2015", metric: "GMP VALIDATED" },
    { title: "Fast Distribution", desc: "Temperature-regulated cold chain ensures mycelial dormancy.", tag: "COLD CHAIN", metric: "2°C - 4°C VAULT" },
    { title: "Research & Innovation", desc: "Continuous strain breeding trials and growth optimization experiments.", tag: "STRAIN R&D", metric: "14+ VARIETIES" },
  ],
  industries: [
    { name: "Rural Farmers", desc: "Empowering growers with high-yield grain spawn and training." },
    { name: "Commercial Farms", desc: "Bulk liquid broth volumes for automated substrate bags." },
    { name: "Research Institutions", desc: "Providing genomic mother cultures and genetic tracing." },
    { name: "Universities", desc: "Supplying slants and sterile agar plates for botanical study." },
    { name: "Government Projects", desc: "Managing national cooperative horticulture aid packages." },
    { name: "NGO Projects", desc: "Partnering for micro-grant community food security programs." },
    { name: "Export Partners", desc: "International shipping certified cold-chain spawn logistics." },
  ],
  credentials: [
    { title: "DMR Certified", status: "(Under Process)", desc: "Directorate of Mushroom Research certification validates scientific rigour of our spawn production protocols." },
    { title: "NHB Certified", status: "(Under Process)", desc: "National Horticulture Board certification for horticultural produce quality standards." },
    { title: "GMP Standard Lab", status: "Fully Operational", desc: "Good Manufacturing Practice compliant facility ensuring consistent, contamination-free liquid spawn production." },
    { title: "ISO Standard", status: "Compliant", desc: "International quality management standards embedded across production and quality control processes." },
    { title: "12 Years Experience", status: "Expert Team", desc: "Highly specialised team with over a decade of hands-on mushroom cultivation and spawn production expertise." },
    { title: "14 Varieties", status: "incl. Shiitake", desc: "Comprehensive portfolio covering shiitake, oyster, lion's mane and other high-value commercial species." },
  ],
  testimonials: [
    { quote: "Switching to SporoNova's liquid spawn broth allowed us to double our weekly bag inoculation capacity. The colonization lag time decreased by four days, giving us massive savings on autoclave fuels.", author: "Dr. Aris Thorne", role: "Director, Peak Fungi Farms" },
    { quote: "Our district farming cooperative has distributed SporoNova's grain spawn packs to over 400 rural women growers. The biological efficiency and yield consistency have secured steady household incomes.", author: "R. Srinivasan", role: "NGO Cooperative Coordinator" },
    { quote: "As a research laboratory, genetic purity is paramount. SporoNova's G0 mother culture slants exhibit exceptional sectoring traits and zero mutation drift across scaling generations.", author: "Prof. Elaine Vance", role: "Department of Biotechnology, SVU" },
  ],
  deliverables: [
    { label: "Liquid Spawn Supply", desc: "Consistent supply of certified shiitake liquid spawn to all enrolled farmers" },
    { label: "Training & Capacity Building", desc: "Structured on-farm and classroom training modules in local languages" },
    { label: "Technical Support", desc: "On-call expert support during all cultivation cycles for 12 months" },
    { label: "Market Linkage", desc: "Facilitation of buyer connections, FPO formation, and export channels" },
    { label: "Documentation & Reporting", desc: "Quarterly impact reports with yield, BE%, and income data for all partners" },
  ],
  faqs: [
    { id: "faq-1", question: "What is the shelf life of Liquid Spawn Broth?", answer: "When stored in refrigeration between 2°C to 4°C, our liquid spawn broth maintains peak viability for up to 90 days.", category: "Storage & Handling" },
    { id: "faq-2", question: "How is contamination prevented during shipping?", answer: "All containers use biosecure 0.2-micron breathable membrane filters and temperature-monitored cold chain packaging.", category: "Logistics" },
    { id: "faq-3", question: "Do you provide strain documentation?", answer: "Yes, every batch is accompanied by a Certificate of Analysis (COA) specifying genomic strain ID, purity index, and autoclave logs.", category: "Quality Control" },
  ],
  about: {
    heroTitle: "Science and Commitment Behind Every Kernel",
    heroSubtitle: "ABOUT SPORONOVA",
    whoWeAreTitle: "Science and Commitment Behind Every Kernel",
    whoWeAreParagraph1:
      "For over a decade, SporoNova has partnered with commercial cultivators, horticulture boards, and rural cooperatives to modernize mycology cultivation. We ensure pure mycelial expansion by sourcing tested substrate grains, balancing media pH, and verifying strain genetics under strict laboratory clearance.",
    whoWeAreParagraph2:
      "SporoNova operates certified agricultural inoculation cleanrooms, utilizing advanced biological protocols to preserve genetic lines. We focus on providing high-yield, disease-resistant spawn formulas that guarantee crops flush predictably.",
    whoWeAreImage: "/about_mushrooms.jpg",
    visionTitle: "Our Vision",
    visionDesc: "To establish India as a global leader in high-efficiency sustainable mushroom cultivation through biosecure biotechnology.",
    missionTitle: "Our Mission",
    missionDesc: "Deliver genetically superior liquid spawn and grain starter matrices while supporting regional growers with technical education.",
    qualityTitle: "Quality Policy",
    qualityDesc: "Every culture slant and liquid jar undergoes 100% microscopical and PCR testing before dispatch.",
    journeySteps: [
      { stepNumber: 1, title: "Research Begins", description: "Started with a vision to modernize mushroom cultivation through scientific methods" },
      { stepNumber: 2, title: "Laboratory Development", description: "Established GMP-compliant cleanroom facilities with advanced biological protocols" },
      { stepNumber: 3, title: "Advanced Liquid Spawn Technology", description: "Pioneered liquid spawn broth technology for faster colonization" },
      { stepNumber: 4, title: "Commercial Production", description: "Scaled operations to serve commercial farmers across multiple states" },
      { stepNumber: 5, title: "Government Collaborations", description: "Partnered with JICA, NHB, and state horticulture departments" },
      { stepNumber: 6, title: "National Expansion", description: "Expanded distribution network to 200+ farmers across India" },
      { stepNumber: 7, title: "Future Global Growth", description: "Building next-generation spawn solutions with AI-powered quality control" },
    ],
    scienceCards: [
      { id: "sci-1", title: "Pure Mycelium Culture", description: "Isolated on sterile agar media slants and verified through phase contrast microscopic analysis for complete genetic authenticity.", badge: "Verified Standard" },
      { id: "sci-2", title: "Liquid Spawn Technology", description: "Active vegetative mycelium suspended in sterile liquid broth, engineered for 4x faster substrate colonization.", badge: "Verified Standard" },
      { id: "sci-3", title: "Genetic Stability", description: "Multi-generation testing and strain preservation prevent genetic degeneration across commercial multiplication cycles.", badge: "Verified Standard" },
      { id: "sci-4", title: "Laboratory Verification", description: "Rigorous quality inspection including microscopic sectoring checks and bio-efficiency purity validation.", badge: "Verified Standard" },
      { id: "sci-5", title: "Contamination Control", description: "Class 100 HEPA-filtered cleanrooms equipped with positive atmospheric pressure and continuous UV sterilization.", badge: "Verified Standard" },
      { id: "sci-6", title: "Cold Chain Storage", description: "Strict temperature-regulated cold chain distribution maintains mycelial dormancy until direct farm inoculation.", badge: "Verified Standard" },
    ],
    qualityCards: [
      { title: "GMP Laboratory", description: "Good Manufacturing Practice compliant facility ensuring contamination-free production" },
      { title: "ISO Standards", description: "International quality management standards across all processes" },
      { title: "DMR Certification", description: "Directorate of Mushroom Research validated protocols" },
      { title: "NHB Certification", description: "National Horticulture Board quality standards compliance" },
      { title: "Scientific Validation", description: "Rigorous strain verification and biological efficiency testing" },
    ],
    partnershipCards: [
      { title: "Government Institutions", description: "Working with state horticulture departments and JICA for farmer empowerment programs." },
      { title: "Research Organizations", description: "Collaborating with ICAR-DMR and biotechnology research institutes." },
      { title: "Agricultural Universities", description: "Supplying research-grade cultures and training materials to academic institutions." },
      { title: "Farmer Cooperatives", description: "Supporting FPO formation and providing technical assistance to farming communities." },
      { title: "International Development Partners", description: "Partnering with global organizations for sustainable agricultural development." },
    ],
    whyChooseCards: [
      { title: "12+ Years Experience", description: "Decades of combined expertise in professional mycological research and commercial spawn production methodologies." },
      { title: "14 Mushroom Varieties", description: "Diverse library of commercial strains optimized for different climates." },
      { title: "Higher Yield Performance", description: "Genetically verified strains proven to deliver maximum biological efficiency." },
      { title: "Chemical-Free Technology", description: "100% natural substrates and sterile practices without harmful additives." },
      { title: "Lower Contamination Risk", description: "Rigorous quality control ensures clean, vigorous vegetative mycelium." },
      { title: "Long Shelf Life", description: "Specially formulated media designed for extended viability during cold storage and transit." },
      { title: "Expert Technical Team", description: "Dedicated mycologists and technicians ensuring every batch meets the highest industry standards." },
      { title: "Scalable Commercial Production", description: "State-of-the-art facilities capable of supporting farms of any size, from local growers to enterprise agriculture." }
    ],
    processSteps: [
      { stepNumber: 1, title: "Research", description: "Scientific strain analysis and substrate optimization" },
      { stepNumber: 2, title: "Culture Development", description: "Pure mycelium isolation on sterile agar media" },
      { stepNumber: 3, title: "Laboratory Testing", description: "Microscopic verification and contamination screening" },
      { stepNumber: 4, title: "Spawn Production", description: "Scaled multiplication in GMP-compliant cleanrooms" },
      { stepNumber: 5, title: "Quality Inspection", description: "Multi-stage quality checks and biological efficiency testing" },
      { stepNumber: 6, title: "Packaging", description: "Sterile packaging with cold-chain readiness" },
      { stepNumber: 7, title: "Farmer Delivery", description: "Temperature-controlled distribution across India" }
    ],
    techBadges: [
      { label: "Liquid Spawn" },
      { label: "Grain Spawn" },
      { label: "Mother Culture" },
      { label: "Commercial Spawn" },
      { label: "Cleanroom Lab" },
      { label: "Biotechnology" },
      { label: "Research" },
      { label: "Innovation" }
    ],
    aboutGallery: [
      { url: "/about_header.jpg", title: "Our Research Facility" },
      { url: "/about_mushrooms.jpg", title: "Premium Mushroom Cultivation" },
      { url: "/about_building.jpg", title: "SporoNova Headquarters" },
      { url: "/hero_mushrooms.jpg", title: "Natural Growing Process" },
      { url: "/products_header.jpg", title: "Spawn Product Line" },
      { url: "/training_header.jpg", title: "Farmer Training Programs" }
    ]
  },
  processSteps: [
    {
      id: "step-1",
      stepNumber: 1,
      step: "01",
      title: "Mother Culture Selection",
      subtitle: "Manufacturing Stage",
      description: "Isolating high-viability strains of fungi in pure culture to serve as the baseline inoculum.",
      purpose: "Isolating high-viability strains of fungi in pure culture to serve as the baseline inoculum.",
      temp: "24°C - 25°C",
      time: "7 Days",
      equipment: ["Laminar Airflow Cabinet", "Inoculation Loop", "Petri Plates", "Agar Formula"],
      precautions: "Discard any slants exhibiting off-color sectors or cottony mutations immediately.",
      qualityCheck: "Rhizomorphic density rating: verified uniform grid lines.",
    },
    {
      id: "step-2",
      stepNumber: 2,
      step: "02",
      title: "Media Preparation",
      subtitle: "Manufacturing Stage",
      description: "Dissolving sugars and nutrients to construct liquid broth optimized for vegetative mycelium scaling.",
      purpose: "Dissolving sugars and nutrients to construct liquid broth optimized for vegetative mycelium scaling.",
      time: "45 Minutes",
      equipment: ["Laboratory Beakers", "Magnetic Hotplate", "Formulation Broth Balance"],
      precautions: "Use strict ratio limits. Excess sugars caramelize under autoclaving, blocking growth.",
      qualityCheck: "Initial solution pH testing target bounds: 5.8 - 6.2.",
    },
    {
      id: "step-3",
      stepNumber: 3,
      step: "03",
      title: "Sterilization",
      subtitle: "Manufacturing Stage",
      description: "High-temperature thermal autoclaving to eliminate competitor mold spores and yeasts in nutrient liquid.",
      purpose: "High-temperature thermal autoclaving to eliminate competitor mold spores and yeasts in nutrient liquid.",
      temp: "121°C (250°F)",
      pressure: "15 PSI",
      time: "25 Minutes",
      equipment: ["Industrial Autoclave Chamber", "Thermocouple Data Logger"],
      precautions: "Monitor chamber pressure logs. Maintain maximum thermal heat for the entire timing cycle.",
      qualityCheck: "Autoclave temperature sensor chart clearance.",
    },
    {
      id: "step-4",
      stepNumber: 4,
      step: "04",
      title: "Cooling Cycle",
      subtitle: "Manufacturing Stage",
      description: "Cooling media to inoculation temperature to prevent killing the living mother culture cells.",
      purpose: "Cooling media to inoculation temperature to prevent killing the living mother culture cells.",
      temp: "25°C",
      time: "6 Hours",
      equipment: ["HEPA Forced Air cooling bench"],
      precautions: "Do not touch or move bottles until the solution reaches a complete cool state.",
      qualityCheck: "Digital infrared thermometer test.",
    },
    {
      id: "step-5",
      stepNumber: 5,
      step: "05",
      title: "Inoculation",
      subtitle: "Manufacturing Stage",
      description: "Aseptic transfer of mother culture blocks directly into sterile liquid broth flasks.",
      purpose: "Aseptic transfer of mother culture blocks directly into sterile liquid broth flasks.",
      temp: "24°C",
      time: "30 Minutes",
      equipment: ["Class 100 Inoculation bench", "Flame Loop Sanitizer"],
      precautions: "Technicians sanitize hands with 70% alcohol. Syringe ports flamed red-hot.",
      qualityCheck: "Post-inoculation seal integrity inspection.",
    },
    {
      id: "step-6",
      stepNumber: 6,
      step: "06",
      title: "Incubation & Agitation",
      subtitle: "Manufacturing Stage",
      description: "Fostering mycelium cell growth and multiplying biomass through gentle rotational spinning.",
      purpose: "Fostering mycelium cell growth and multiplying biomass through gentle rotational spinning.",
      temp: "25.0°C",
      time: "5 - 7 Days",
      equipment: ["Orbital Shaker Tables", "Water-Jacket Incubator"],
      precautions: "Adjust RPM speeds to prevent mechanical damage to fine hyphal branches.",
      qualityCheck: "DO (Dissolved Oxygen) percentage logs: 80% saturation.",
    },
    {
      id: "step-7",
      stepNumber: 7,
      step: "07",
      title: "Growth Monitoring",
      subtitle: "Manufacturing Stage",
      description: "Reviewing colonization logs and tracking density indicators daily.",
      purpose: "Reviewing colonization logs and tracking density indicators daily.",
      time: "Daily",
      equipment: ["Turbidity meter", "Genomic sequencing logs"],
      precautions: "Isolate containers displaying cell clumping or growth stalls.",
      qualityCheck: "Turbidity reading parameters check.",
    },
    {
      id: "step-8",
      stepNumber: 8,
      step: "08",
      title: "Quality testing",
      subtitle: "Manufacturing Stage",
      description: "Verifying absolute purity of broth blocks prior to bulk crop distribution.",
      purpose: "Verifying absolute purity of broth blocks prior to bulk crop distribution.",
      time: "2 Days",
      equipment: ["Agar sector petri plating", "Phase contrast micro-viewer"],
      precautions: "Reject any batches showing micro-yeasts or lactic bacteria cells.",
      qualityCheck: "Zero competitive spore verification under 1000x zoom.",
    },
    {
      id: "step-9",
      stepNumber: 9,
      step: "09",
      title: "Aseptic Packaging",
      subtitle: "Manufacturing Stage",
      description: "Sealing clean broth containers inside sterile syringe bags with micro-filter locks.",
      purpose: "Sealing clean broth containers inside sterile syringe bags with micro-filter locks.",
      temp: "20°C",
      time: "2 Hours",
      equipment: ["Clean packaging heat sealing line"],
      precautions: "Monitor room air filter gauges. Verify no leaks in seals.",
      qualityCheck: "Sealing pressure test: zero gas leaks.",
    },
    {
      id: "step-10",
      stepNumber: 10,
      step: "10",
      title: "Cold Storage Vault",
      subtitle: "Manufacturing Stage",
      description: "Inducing a dormant state inside mycelial cells to preserve spawn viability.",
      purpose: "Inducing a dormant state inside mycelial cells to preserve spawn viability.",
      temp: "2.0°C - 3.5°C",
      time: "Up to 21 Days",
      equipment: ["Industrial chill vault shelves"],
      precautions: "Never allow temperatures to dip below freezing, as ice crystal formations destroy cell walls.",
      qualityCheck: "Continuous digital temperature logger logs check.",
    },
    {
      id: "step-11",
      stepNumber: 11,
      step: "11",
      title: "Distribution",
      subtitle: "Manufacturing Stage",
      description: "Dispatching fresh spawn under climate control directly to growers.",
      purpose: "Dispatching fresh spawn under climate control directly to growers.",
      temp: "4.0°C",
      time: "Overnight delivery",
      equipment: ["Insulated cold box logistics cargo"],
      precautions: "Ensure cold packs do not directly touch bags to avoid localized frost bites.",
      qualityCheck: "Delivery reception temperature verification log.",
    },
  ],
  whyChooseUsCards: [
    { id: "card-1", title: "HEPA Class 100 Cleanroom", description: "Zero contamination environment protecting all transfer protocols.", icon: "ShieldCheck", highlight: "< 0.01% Risk" },
    { id: "card-2", title: "High Biological Efficiency", description: "Rhizomorphic mycelium ensuring 100%+ yield per bag flush.", icon: "TrendingUp", highlight: "100%+ BE" },
    { id: "card-3", title: "Complete Cold Chain Security", description: "Refrigerated logistics preserving viability during transit.", icon: "Snowflake", highlight: "2°C - 4°C Monitored" },
    { id: "card-4", title: "Scientific Field Advisory", description: "Direct access to mycologists for substrate recipe and climate control.", icon: "UserCheck", highlight: "24/7 Advisory" },
  ],
  knowledgeCenter: [
    { id: "kc-1", title: "Liquid Spawn vs Grain Spawn: Commercial Yield Analysis", type: "Article", category: "Technical Guide", summary: "A comprehensive breakdown of inoculation lag times, cost efficiency, and bag throughput.", content: "Detailed comparison showing liquid spawn broth saves 4 days colonization time...", date: "2026-07-15", author: "Dr. Aris Thorne" },
    { id: "kc-2", title: "Shiitake Cultivation Protocol PDF", type: "Download", category: "Cultivation Guide", summary: "Step-by-step substrate formulation, incubation parameters, and fruiting climate guide.", content: "Official SporoNova Shiitake Manual covering sawdust block sterilization...", date: "2026-06-20", author: "SporoNova Technical Team", fileUrl: "/downloads/shiitake_guide.pdf" },
  ],
  successNumbers: [
    { value: "14+", label: "Mushroom Varieties" },
    { value: "100+ MT", label: "Annual Production" },
    { value: "1000+", label: "Farmers Served" },
    { value: "12+", label: "Years Experience" }
  ],
  partnerships: [
    {
      title: "Government of Tripura",
      points: [
        "Livelihood enhancement for tribal & rural farmers",
        "Agricultural diversification & income doubling",
        "Skill development through structured training",
        "Export potential for premium mushrooms",
        "Alignment with North-East India Development goals"
      ]
    },
    {
      title: "JICA Foundation",
      points: [
        "Proven, scalable agri-tech intervention",
        "SDG alignment: Zero Hunger, Decent Work",
        "Community-led inclusive development model",
        "Traceable impact metrics (yield, income, BE%)",
        "Replicable across other North-East states"
      ]
    },
    {
      title: "Indo-German Foundation",
      points: [
        "Technology transfer from science to farm",
        "GMP & ISO-aligned production standards",
        "Innovation in sustainable food systems",
        "Cross-border knowledge exchange potential",
        "Bilateral cooperation in food & agriculture"
      ]
    }
  ],
  gallery: [
    { id: "gal-1", url: "/about_mushrooms.jpg", title: "Bioreactor Liquid Spawn Broth", category: "Laboratory" },
    { id: "gal-2", url: "/products_header.jpg", title: "Colonized Wheat Grain Bags", category: "Production" },
    { id: "gal-3", url: "/about_header.jpg", title: "G0 Agar Culture Slants", category: "Genomics" },
  ],
  media: [
    { id: "med-1", filename: "logo_transparent.png", url: "/logo_transparent.png", size: "45 KB", mimeType: "image/png", altText: "SporoNova Logo", uploadedAt: "2026-08-01" },
    { id: "med-2", filename: "liquid_spawn_bottle.png", url: "/liquid_spawn_bottle.png", size: "120 KB", mimeType: "image/png", altText: "Liquid Spawn Broth", uploadedAt: "2026-08-01" },
    { id: "med-3", filename: "grain_jar.png", url: "/grain_jar.png", size: "180 KB", mimeType: "image/png", altText: "Grain Spawn Jar", uploadedAt: "2026-08-01" },
  ],
  seo: {
    home: { metaTitle: "SporoNova | Premium Mushroom Spawn & Cultivation Solutions", metaDescription: "India's leading mushroom spawn manufacturer. Certified liquid spawn, grain spawn, and mother cultures.", keywords: "mushroom spawn, liquid spawn, grain spawn, mushroom cultivation", canonicalUrl: "https://sporonova.com", ogImage: "/logo_transparent.png" },
    about: { metaTitle: "About Us | SporoNova Biotech", metaDescription: "Learn about SporoNova's Class 100 HEPA cleanroom laboratory and scientific agritech leadership.", keywords: "about sporonova, mushroom laboratory, agritech india", canonicalUrl: "https://sporonova.com/about", ogImage: "/about_lab.png" },
    process: { metaTitle: "Production Process | SporoNova Biotech", metaDescription: "Four-step biosecure process: Genomic isolation, bioreactor expansion, grain matrix inoculation, cold chain logistics.", keywords: "spawn production process, bioreactor mycelium", canonicalUrl: "https://sporonova.com/process", ogImage: "/liquid_spawn_bottle.png" },
  },
  settings: {
    siteName: "SporoNova Biotech",
    primaryColor: "#1F5E38",
    secondaryColor: "#2E7D32",
    accentColor: "#4e8c4a",
    backgroundColor: "#f8f7f3",
    textColor: "#333333",
    fontFamilyHeading: "Outfit, sans-serif",
    fontFamilyBody: "Inter, sans-serif",
    containerWidth: "1280px",
    sectionPadding: "64px",
    borderRadius: "16px",
  },
  contact: {
    badge: "SporoNova Contact & Technical Center",
    title: "Get In Touch With Our Team",
    subtitle: "Request product catalogues, official technical PDF datasheets, bulk spawn pricing, or expert cultivation support.",
    getInTouchTitle: "Get in Touch",
    getInTouchParagraph: "Request a product catalogue, ask about bulk discounts, or get custom recommendations for your specific growth setup.",
    phone: "+91 7207208419",
    address: "Koni, Bilaspur, Chhattisgarh 495009",
    email: "sales@sporonova.com",
    footerTag: "ISO & GMP ACCREDITED FACILITY",
    whatsappNumber: "917207208419",
    mapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.8524458312014!2d82.1388031!3d22.1129528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b2a265691f1%3A0xc3f605a9c9f2b86d!2sKoni%2C%20Bilaspur%2C%20Chhattisgarh%20495009!5e0!3m2!1sen!2sin!4v1783234000000!5m2!1sen!2sin"
  },
  contacts: [
    { id: "sub-1", name: "Vikram Sharma", email: "vikram@agrifarms.in", phone: "+91 98765 43210", inquiryType: "Request Bulk Spawn Quote", title: "Bulk Spawn Quotation Request", message: "We require 500 liters of liquid spawn broth for our commercial facility in Pune.", createdAt: "2026-08-06T10:30:00Z", status: "New" },
  ],
  analytics: {
    pageViews: 14850,
    uniqueVisitors: 6240,
    productDownloads: 890,
    topPages: [
      { page: "/", views: 8200 },
      { page: "/spawn/liquid-spawn", views: 2400 },
      { page: "/process", views: 1850 },
      { page: "/about", views: 1400 },
      { page: "/contact", views: 1000 },
    ],
    deviceBreakdown: [
      { device: "Mobile", percentage: 58 },
      { device: "Desktop", percentage: 38 },
      { device: "Tablet", percentage: 4 },
    ],
  },
  users: [],
  backups: [
    { id: "bak-1", filename: "sporonova_backup_2026-08-01.json", createdAt: "2026-08-01T00:00:00Z", size: "2.4 MB", type: "Automated Daily" },
  ],
};

let inMemoryDataCache: CMSData | null = null;

/**
 * Older CMS exports stored only the product-card fields.  The public spawn
 * pages and the product editor also need the technical fields, so retain any
 * saved edits while restoring fields that were omitted from those exports.
 */
function restoreMissingContent(savedData: CMSData): { data: CMSData; changed: boolean } {
  let changed = false;
  const defaultProducts = new Map(INITIAL_DATA.products.map((product) => [product.id, product]));

  const products = savedData.products.map((product) => {
    const defaultProduct = defaultProducts.get(product.id);
    if (!defaultProduct) return product;

    const restoredProduct = { ...defaultProduct, ...product };
    const productChanged = Object.keys(defaultProduct).some(
      (key) => (product as Record<string, unknown>)[key] === undefined
    );
    changed ||= productChanged;
    return restoredProduct;
  });

  const about = { ...INITIAL_DATA.about, ...savedData.about };
  const aboutChanged = Object.keys(INITIAL_DATA.about).some(
    (key) => (savedData.about as Record<string, unknown>)[key] === undefined
  );
  changed ||= aboutChanged;

  const homepage = {
    ...INITIAL_DATA.homepage,
    ...savedData.homepage,
    hero: { ...INITIAL_DATA.homepage.hero, ...savedData.homepage?.hero }
  };
  const homepageChanged = Object.keys(INITIAL_DATA.homepage).some(
    (key) => (savedData.homepage as Record<string, unknown>)[key] === undefined
  );
  changed ||= homepageChanged;

  let processSteps = savedData.processSteps;
  if (!processSteps || processSteps.length < INITIAL_DATA.processSteps.length) {
    processSteps = INITIAL_DATA.processSteps;
    changed = true;
  }

  let values = savedData.values;
  if (!values || values.length === 0) {
    values = INITIAL_DATA.values;
    changed = true;
  }

  return { data: { ...savedData, homepage, products, about, processSteps, values }, changed };
}

function ensureDataDirectoryExists() {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    console.warn("Failed to check or create data directory (possibly read-only environment):", e);
  }
}

/**
 * The local JSON file is a development fallback only. In Vercel, the CMS
 * document lives in Blob so every server instance and every deployment reads
 * the same content.
 */
const CMS_BLOB_PATH = "cms/content.json";

function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getLocalCMSData(): CMSData {
  if (inMemoryDataCache) {
    // Guarantee Super Admin exists even if in memory
    if (!inMemoryDataCache.users || inMemoryDataCache.users.length === 0) {
      const defaultPasswordHash = bcrypt.hashSync("admin123", 10);
      inMemoryDataCache.users = [
        {
          id: "usr-super-admin",
          name: "Super Admin",
          email: "admin@sporonova.com",
          passwordHash: defaultPasswordHash,
          role: "Super Admin",
          status: "Active",
          createdAt: new Date().toISOString(),
        },
      ];
    }
    return inMemoryDataCache;
  }

  ensureDataDirectoryExists();

  const defaultPasswordHash = bcrypt.hashSync("admin123", 10);
  const defaultAdminUser: UserRecord = {
    id: "usr-super-admin",
    name: "Super Admin",
    email: "admin@sporonova.com",
    passwordHash: defaultPasswordHash,
    role: "Super Admin",
    status: "Active",
    createdAt: new Date().toISOString(),
  };

  if (fs.existsSync(DB_PATH)) {
    try {
      const fileContent = fs.readFileSync(DB_PATH, "utf-8");
      const parsedData = JSON.parse(fileContent) as CMSData;
      const restored = restoreMissingContent(parsedData);
      inMemoryDataCache = restored.data;

      if (restored.changed) {
        try {
          fs.writeFileSync(DB_PATH, JSON.stringify(inMemoryDataCache, null, 2), "utf-8");
        } catch (err) {
          console.warn("Failed to restore missing CMS content to disk:", err);
        }
      }

      if (!inMemoryDataCache!.users || inMemoryDataCache!.users.length === 0) {
        inMemoryDataCache!.users = [defaultAdminUser];
        try {
          fs.writeFileSync(DB_PATH, JSON.stringify(inMemoryDataCache, null, 2), "utf-8");
        } catch (err) {
          console.warn("Failed to write updated users to read-only disk:", err);
        }
      }

      return inMemoryDataCache!;
    } catch (e) {
      console.error("Error reading cms-db.json, re-initializing:", e);
    }
  }

  INITIAL_DATA.users = [defaultAdminUser];
  inMemoryDataCache = INITIAL_DATA;
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to initialize database on read-only disk:", err);
  }
  return inMemoryDataCache;
}

function saveLocalCMSData(data: CMSData): void {
  ensureDataDirectoryExists();
  inMemoryDataCache = data;
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to save CMS data to read-only disk:", err);
  }
}

export async function getCMSData(): Promise<CMSData> {
  if (!isBlobConfigured()) {
    return getLocalCMSData();
  }

  const result = await list({ prefix: CMS_BLOB_PATH, limit: 1 });
  const existing = result.blobs.find((blob) => blob.pathname === CMS_BLOB_PATH);

  if (existing) {
    const response = await fetch(existing.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Unable to read the shared CMS data from Vercel Blob.");
    }
    const restored = restoreMissingContent((await response.json()) as CMSData);
    return restored.data;
  }

  // Seed the Blob store from the project's current CMS content the first time
  // a newly connected store is used.
  const initialData = getLocalCMSData();
  await put(CMS_BLOB_PATH, JSON.stringify(initialData), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  return initialData;
}

export async function saveCMSData(data: CMSData): Promise<void> {
  if (!isBlobConfigured()) {
    saveLocalCMSData(data);
    return;
  }

  await put(CMS_BLOB_PATH, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
