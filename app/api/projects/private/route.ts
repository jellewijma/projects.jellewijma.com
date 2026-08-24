import { getGitHubToken, githubHeaders } from "@/lib/github-auth";
import { privateProjectDescription, type Project } from "@/lib/projects";

export const dynamic = "force-dynamic";

type GitHubRepository = {
  archived: boolean;
  default_branch: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  html_url: string;
  language: string | null;
  name: string;
  owner: { login: string };
  private: boolean;
  size: number;
  updated_at: string;
};

export async function GET(request: Request) {
  const accessToken = await getGitHubToken(request);

  if (!accessToken) {
    return Response.json(
      { error: "Sign in with the authorised GitHub account to continue." },
      { status: 401, headers: { "Cache-Control": "private, no-store" } },
    );
  }

  const response = await fetch(
    "https://api.github.com/user/repos?visibility=private&affiliation=owner&sort=updated&per_page=100",
    {
      headers: githubHeaders(accessToken),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return Response.json(
      { error: "GitHub could not return the private repositories." },
      { status: 502, headers: { "Cache-Control": "private, no-store" } },
    );
  }

  const repositories = (await response.json()) as GitHubRepository[];
  const projects: Project[] = repositories
    .filter(
      (repository) =>
        repository.private &&
        !repository.fork &&
        !repository.archived &&
        repository.owner.login.toLowerCase() === "jellewijma",
    )
    .map((repository) => ({
      name: repository.name,
      description: privateProjectDescription(repository.name, repository.language),
      language: repository.language ?? "Repository",
      url: repository.html_url,
      homepage: repository.homepage || undefined,
      isPrivate: true,
      updatedAt: repository.updated_at,
    }));

  return Response.json(
    { projects },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
