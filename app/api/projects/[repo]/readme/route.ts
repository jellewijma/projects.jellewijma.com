import {
  getGitHubToken,
  githubHeaders,
  validRepoName,
} from "@/lib/github-auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ repo: string }> },
) {
  const { repo } = await params;

  if (!validRepoName(repo)) {
    return Response.json({ error: "Invalid repository." }, { status: 400 });
  }

  const accessToken = await getGitHubToken(request);
  const response = await fetch(
    `https://api.github.com/repos/jellewijma/${encodeURIComponent(repo)}/readme`,
    {
      headers: {
        ...githubHeaders(accessToken),
        Accept: "application/vnd.github.raw+json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return Response.json(
      { error: response.status === 404 ? "No README is available." : "The README could not be loaded." },
      { status: response.status === 404 ? 404 : 502 },
    );
  }

  const markdown = await response.text();
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": accessToken ? "private, no-store" : "public, s-maxage=3600",
    },
  });
}
