export type Project = {
  name: string;
  description: string;
  language: string;
  url: string;
  homepage?: string;
  screenshot?: string;
  isPrivate: boolean;
  updatedAt?: string;
};

export const publicProjects: Project[] = [
  {
    name: "prj-planner",
    description:
      "A visual project-planning workspace for mapping requirements, tasks, and dependencies on an interactive canvas.",
    language: "TypeScript",
    url: "https://github.com/jellewijma/prj-planner",
    screenshot: "/screenshots/prj-planner.png",
    isPrivate: false,
  },
  {
    name: "maximo-design",
    description:
      "A multilingual B2B product catalogue that presents Maximo Design's bathroom faucets in a clean, sales-focused experience.",
    language: "TypeScript",
    url: "https://github.com/jellewijma/maximo-design",
    screenshot: "/screenshots/maximo-design.png",
    isPrivate: false,
  },
  {
    name: "kerk-site",
    description:
      "A collection of distinct website concepts exploring how a modern church can present its community, services, and story online.",
    language: "TypeScript",
    url: "https://github.com/jellewijma/kerk-site",
    screenshot: "/screenshots/kerk-site.png",
    isPrivate: false,
  },
  {
    name: "rack-planner",
    description:
      "A browser-based AV rack designer with drag-and-drop equipment, custom device creation, and reusable local layouts.",
    language: "JavaScript",
    url: "https://github.com/jellewijma/rack-planner",
    screenshot: "/screenshots/rack-planner.png",
    isPrivate: false,
  },
  {
    name: "CLE4",
    description:
      "A tile-based coffee shop strategy game where players manage machines, products, customers, resources, and the scoreboard.",
    language: "JavaScript",
    url: "https://github.com/jellewijma/CLE4",
    screenshot: "/screenshots/CLE4.png",
    isPrivate: false,
  },
  {
    name: "portfolio",
    description:
      "My personal portfolio and gallery, with a small content system for keeping projects and visual work up to date.",
    language: "TypeScript",
    url: "https://github.com/jellewijma/portfolio",
    homepage: "https://jellewijma.com",
    screenshot: "/screenshots/portfolio.png",
    isPrivate: false,
  },
  {
    name: "thomann-wishlist-copier",
    description:
      "A Chrome extension that turns a Thomann wishlist into clean clipboard data for spreadsheets, JSON, or Markdown.",
    language: "JavaScript",
    url: "https://github.com/jellewijma/thomann-wishlist-copier",
    screenshot: "/screenshots/thomann-wishlist-copier.png",
    isPrivate: false,
  },
  {
    name: "voicetype",
    description:
      "A local speech-to-text utility that lives in the system tray and types transcribed audio into the active application.",
    language: "Python",
    url: "https://github.com/jellewijma/voicetype",
    screenshot: "/screenshots/voicetype.png",
    isPrivate: false,
  },
  {
    name: "jellykey",
    description:
      "A custom mechanical keyboard hardware project containing the PCB design, switch footprints, schematics, and manufacturing files.",
    language: "KiCad",
    url: "https://github.com/jellewijma/jellykey",
    screenshot: "/screenshots/jellykey.png",
    isPrivate: false,
  },
  {
    name: "porsche-club",
    description:
      "A visual club website concept built around Porsche history, photography, events, and a shared enthusiasm for the marque.",
    language: "HTML & CSS",
    url: "https://github.com/jellewijma/porsche-club",
    screenshot: "/screenshots/porsche-club.png",
    isPrivate: false,
  },
  {
    name: "CLE-Eindopdracht",
    description:
      "A multi-page product website created as a study project, combining product information, brand history, reviews, and an about page.",
    language: "HTML & CSS",
    url: "https://github.com/jellewijma/CLE-Eindopdracht",
    screenshot: "/screenshots/CLE-Eindopdracht.png",
    isPrivate: false,
  },
];

const privateDescriptions: Record<string, string> = {
  "av-rack-playground":
    "An interactive AV rack workspace for arranging equipment, building reusable layouts, and testing planning workflows.",
  MaximoCMS:
    "A dedicated content-management workspace for maintaining the Maximo Design catalogue and its supporting product data.",
  "lc-fixture-site":
    "A lighting-fixture reference site and companion CLI for browsing, documenting, and preparing console fixture data.",
  "learn-korean":
    "A full-stack Korean learning environment with structured lessons, practice material, progress data, and supporting tools.",
  "av-inventory-tracker":
    "An AV inventory system for organising equipment, tracking availability, and keeping operational details together.",
  sanitair:
    "A product and operations dashboard for managing sanitary catalogue data, documents, and related business workflows.",
  aitrepreneur:
    "An AI-assisted workspace for shaping business ideas, planning execution, and turning early concepts into structured projects.",
  "update-tracker":
    "A focused tracker for collecting project updates, organising progress, and keeping stakeholders aligned over time.",
  keeptrack:
    "A streamlined inventory application for finding products quickly, reviewing details, and maintaining equipment records.",
  livelufs:
    "A browser-based loudness meter for monitoring live audio levels and visualising LUFS measurements in real time.",
  lightconsole:
    "A Rust-based lighting-console project covering show data, cue control, hardware research, and live-programming workflows.",
  Lux_Console:
    "A combined workspace for developing the Lux lighting console alongside its supporting interface and design experiments.",
  mygear:
    "A production-equipment workspace for building technique slips, managing gear, and preparing event handovers.",
  gearwishlist:
    "A compact workspace for collecting, comparing, and prioritising future equipment purchases.",
  fixyouraudio:
    "An early-stage project exploring a practical online experience for diagnosing and improving audio setups.",
  Faders:
    "A hardware-control concept focused on physical faders, technical documentation, and tactile interface experiments.",
  Development:
    "A private scratch repository reserved for development experiments and work in progress.",
  LC: "Research, build notes, and visual direction for a custom lighting-console hardware and software platform.",
  elixir:
    "An Elixir experiment for monitoring marketplace listings and surfacing potentially interesting deals.",
  "ai-test":
    "A private sandbox for testing AI-assisted development ideas, planning patterns, and small technical experiments.",
  cardgame:
    "A browser card-game engine with reusable rules, simulation tooling, data-driven content, and a playable interface.",
  Maximo:
    "The parent workspace coordinating the Maximo Design frontend, CMS, and shared project tooling.",
  P24: "A combined hardware and software build project with embedded code, electronics research, and implementation notes.",
  Jelly65:
    "A custom 65-percent mechanical keyboard project containing footprints, component libraries, and PCB design resources.",
  Macropad:
    "A custom macropad hardware project with KiCad schematics, PCB layouts, switch footprints, and firmware resources.",
};

export function privateProjectDescription(name: string, language?: string | null) {
  return (
    privateDescriptions[name] ??
    `A private ${language ? `${language} ` : ""}project in active development within my GitHub workspace.`
  );
}
