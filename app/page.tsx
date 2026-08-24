import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const projects = [
  {
    name: "prj-planner",
    description:
      "A visual project-planning workspace for mapping requirements, tasks, and dependencies on an interactive canvas.",
    language: "TypeScript",
    url: "https://github.com/jellewijma/prj-planner",
  },
  {
    name: "maximo-design",
    description:
      "A multilingual B2B product catalogue that presents Maximo Design's bathroom faucets in a clean, sales-focused experience.",
    language: "TypeScript",
    url: "https://github.com/jellewijma/maximo-design",
  },
  {
    name: "kerk-site",
    description:
      "A collection of distinct website concepts exploring how a modern church can present its community, services, and story online.",
    language: "TypeScript",
    url: "https://github.com/jellewijma/kerk-site",
  },
  {
    name: "rack-planner",
    description:
      "A browser-based AV rack designer with drag-and-drop equipment, custom device creation, and reusable local layouts.",
    language: "JavaScript",
    url: "https://github.com/jellewijma/rack-planner",
  },
  {
    name: "CLE4",
    description:
      "A tile-based coffee shop strategy game where players manage machines, products, customers, resources, and the scoreboard.",
    language: "JavaScript",
    url: "https://github.com/jellewijma/CLE4",
  },
  {
    name: "portfolio",
    description:
      "My personal portfolio and gallery, with a small content system for keeping projects and visual work up to date.",
    language: "TypeScript",
    url: "https://github.com/jellewijma/portfolio",
  },
  {
    name: "thomann-wishlist-copier",
    description:
      "A Chrome extension that turns a Thomann wishlist into clean clipboard data for spreadsheets, JSON, or Markdown.",
    language: "JavaScript",
    url: "https://github.com/jellewijma/thomann-wishlist-copier",
  },
  {
    name: "voicetype",
    description:
      "A local speech-to-text utility that lives in the system tray and types transcribed audio into the active application.",
    language: "Python",
    url: "https://github.com/jellewijma/voicetype",
  },
  {
    name: "jellykey",
    description:
      "A custom mechanical keyboard hardware project containing the PCB design, switch footprints, schematics, and manufacturing files.",
    language: "KiCad",
    url: "https://github.com/jellewijma/jellykey",
  },
  {
    name: "porsche-club",
    description:
      "A visual club website concept built around Porsche history, photography, events, and a shared enthusiasm for the marque.",
    language: "HTML & CSS",
    url: "https://github.com/jellewijma/porsche-club",
  },
  {
    name: "CLE-Eindopdracht",
    description:
      "A multi-page product website created as a study project, combining product information, brand history, reviews, and an about page.",
    language: "HTML & CSS",
    url: "https://github.com/jellewijma/CLE-Eindopdracht",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="https://jellewijma.com">
          Jelle Wijma
        </a>
        <a
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "github-link")}
          href="https://github.com/jellewijma"
        >
          GitHub
          <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Selected repositories · 2026</p>
        <h1 id="page-title">
          Things I build,
          <br />
          test, and explore.
        </h1>
        <div className="hero-bottom">
          <p className="intro">
            A concise overview of my public GitHub projects, from web products
            and creative tools to audio software and hardware experiments.
          </p>
          <p className="count" aria-label={`${projects.length} projects`}>
            <span>{String(projects.length).padStart(2, "0")}</span> projects
          </p>
        </div>
      </section>

      <section className="projects" aria-labelledby="projects-title">
        <div className="section-label">
          <h2 id="projects-title">Project index</h2>
          <span>Public repositories</span>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project.name}>
              <Card className="project-card">
                <a href={project.url} aria-label={`${project.name} on GitHub`}>
                  <CardContent className="project-card-content">
                    <div className="card-top">
                      <span className="project-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="arrow" aria-hidden="true">
                        <ArrowUpRight />
                      </span>
                    </div>
                    <div className="card-copy">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </div>
                    <span className="language">{project.language}</span>
                  </CardContent>
                </a>
              </Card>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>Descriptions written from each project&apos;s code and structure.</p>
        <p>© {new Date().getFullYear()} Jelle Wijma</p>
      </footer>
    </main>
  );
}
