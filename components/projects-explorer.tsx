"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowUpRight,
  Code2,
  GitBranch,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const subscribeToHydration = () => () => {};

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? (isDark ? "Use light theme" : "Use dark theme") : "Toggle theme"}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}

function AccountControl() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-10 w-32" aria-label="Loading login state" />;
  }

  if (session?.user) {
    return (
      <div className="account-state">
        <Avatar size="sm">
          {session.user.image ? (
            <AvatarImage src={session.user.image} alt="" />
          ) : null}
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
        <span className="account-name">{session.user.login || "Signed in"}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Sign out"
          onClick={() => signOut({ redirectTo: "/" })}
        >
          <LogOut />
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="login-button"
      onClick={() => signIn("github", { redirectTo: "/" })}
    >
      <LogIn />
      Sign in
    </Button>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="preview-fallback">
        <Code2 aria-hidden="true" />
        <span>Repository preview unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={project.screenshot ?? `/api/projects/${encodeURIComponent(project.name)}/image`}
      alt={`Screenshot from ${project.name}`}
      fill
      sizes="(max-width: 768px) 100vw, 58vw"
      className="project-preview-image"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}

function ProjectReadme({ project, open }: { project: Project; open: boolean }) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();

    fetch(`/api/projects/${encodeURIComponent(project.name)}/readme`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(data?.error || "The README could not be loaded.");
        }
        return response.text();
      })
      .then(setMarkdown)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError(reason instanceof Error ? reason.message : "The README could not be loaded.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [open, project.name]);

  if (loading) {
    return (
      <div className="readme-loading" aria-label="Loading README">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    );
  }

  if (error) {
    return <p className="readme-message">{error}</p>;
  }

  return (
    <div className="readme-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
          img: ({ alt }) => <span className="readme-image-note">Image: {alt || "project image"}</span>,
          pre: ({ children }) => <pre tabIndex={0}>{children}</pre>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const dialogId = `project-dialog-${project.name.replaceAll(/[^A-Za-z0-9_-]/g, "-")}`;

  return (
    <article>
      <Dialog open={open} onOpenChange={setOpen}>
        <Card className="project-card">
          <DialogTrigger
            render={
              <button
                type="button"
                className="project-trigger"
                aria-label={`Open details for ${project.name}`}
              />
            }
          >
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
              <div className="project-meta">
                <span className="language">{project.language}</span>
                {project.isPrivate ? (
                  <span className="private-label">
                    <LockKeyhole aria-hidden="true" /> Private
                  </span>
                ) : null}
              </div>
            </CardContent>
          </DialogTrigger>
        </Card>

        <DialogContent id={dialogId} className="project-dialog">
          <div className="project-dialog-preview">
            <ProjectPreview project={project} />
          </div>
          <div className="project-dialog-body">
            <DialogHeader>
              <div className="dialog-kicker">
                <span>{project.language}</span>
                {project.isPrivate ? <span>Private repository</span> : <span>Public repository</span>}
              </div>
              <DialogTitle>{project.name}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
            </DialogHeader>

            <div className="readme-section">
              <h3>README</h3>
              <ProjectReadme project={project} open={open} />
            </div>

            <a
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "repo-button")}
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch aria-hidden="true" />
              Open on GitHub
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function ProjectSection({
  title,
  detail,
  projects,
  startIndex = 0,
}: {
  title: string;
  detail: string;
  projects: Project[];
  startIndex?: number;
}) {
  return (
    <section className="projects" aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-title`}>
      <div className="section-label">
        <h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-title`}>{title}</h2>
        <span>{detail}</span>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={startIndex + index} />
        ))}
      </div>
    </section>
  );
}

export function ProjectsExplorer({ publicProjects }: { publicProjects: Project[] }) {
  const { status } = useSession();
  const [privateProjects, setPrivateProjects] = useState<Project[]>([]);
  const [privateState, setPrivateState] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    if (status !== "authenticated") return;

    const controller = new AbortController();

    fetch("/api/projects/private", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Private projects could not be loaded.");
        return response.json() as Promise<{ projects: Project[] }>;
      })
      .then(({ projects }) => {
        setPrivateProjects(projects);
        setPrivateState("ready");
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setPrivateState("error");
      });

    return () => controller.abort();
  }, [status]);

  const totalProjects =
    publicProjects.length + (status === "authenticated" ? privateProjects.length : 0);
  const visiblePrivateState =
    status === "authenticated" && privateState === "idle" ? "loading" : privateState;

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="https://jellewijma.com">
          Jelle Wijma
        </a>
        <div className="header-actions">
          <ThemeToggle />
          <AccountControl />
        </div>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">
          {status === "authenticated" ? "Public & private repositories" : "Selected repositories"} · 2026
        </p>
        <h1 id="page-title">
          Things I build,
          <br />
          test, and explore.
        </h1>
        <div className="hero-bottom">
          <p className="intro">
            A concise overview of my GitHub projects. Open a project for its
            preview, short description, README, and source link.
          </p>
          <p className="count">
            <span>{String(totalProjects).padStart(2, "0")}</span> projects
          </p>
        </div>
      </section>

      <ProjectSection
        title="Public projects"
        detail={`${publicProjects.length} repositories`}
        projects={publicProjects}
      />

      {status === "authenticated" ? (
        <div className="private-area" aria-live="polite">
          {visiblePrivateState === "loading" ? (
            <div className="private-status">
              <LoaderCircle className="loading-icon" aria-hidden="true" />
              Loading private projects…
            </div>
          ) : null}
          {visiblePrivateState === "error" ? (
            <div className="private-status private-status-error">
              Private projects could not be loaded. Sign out and reconnect GitHub to retry.
            </div>
          ) : null}
          {visiblePrivateState === "ready" ? (
            <ProjectSection
              title="Private projects"
              detail={`${privateProjects.length} repositories · only visible to you`}
              projects={privateProjects}
              startIndex={publicProjects.length}
            />
          ) : null}
        </div>
      ) : (
        <section className="private-invite" aria-labelledby="private-title">
          <LockKeyhole aria-hidden="true" />
          <div>
            <h2 id="private-title">Private projects stay private.</h2>
            <p>Sign in with the authorised GitHub account to reveal private repositories in this browser.</p>
          </div>
          <Button type="button" variant="outline" size="lg" onClick={() => signIn("github", { redirectTo: "/" })}>
            <GitBranch aria-hidden="true" />
            Sign in with GitHub
          </Button>
        </section>
      )}

      <footer>
        <p>Descriptions written from each project&apos;s code and structure.</p>
        <p>© {new Date().getFullYear()} Jelle Wijma</p>
      </footer>
    </main>
  );
}
