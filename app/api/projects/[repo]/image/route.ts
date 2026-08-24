import {
  getGitHubToken,
  githubHeaders,
  validRepoName,
} from "@/lib/github-auth";

export const dynamic = "force-dynamic";

type Repository = {
  default_branch: string;
  private: boolean;
};

type TreeItem = {
  path: string;
  type: "blob" | "tree";
};

function imageScore(path: string) {
  const value = path.toLowerCase();
  let score = 0;

  if (/screenshots?\//.test(value)) score += 120;
  if (/(^|\/)(preview|showcase|docs?)\//.test(value)) score += 70;
  if (/(screenshot|preview|dashboard|homepage|home|hero)/.test(value)) score += 55;
  if (/(favicon|icon|logo|avatar|og-image|opengraph)/.test(value)) score -= 90;
  if (/public\//.test(value)) score += 10;

  return score;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ repo: string }> },
) {
  const { repo } = await params;

  if (!validRepoName(repo)) {
    return Response.json({ error: "Invalid repository." }, { status: 400 });
  }

  const accessToken = await getGitHubToken(request);
  const headers = githubHeaders(accessToken);
  const repositoryResponse = await fetch(
    `https://api.github.com/repos/jellewijma/${encodeURIComponent(repo)}`,
    { headers, cache: "no-store" },
  );

  if (!repositoryResponse.ok) {
    return Response.json({ error: "Project image unavailable." }, { status: 404 });
  }

  const repository = (await repositoryResponse.json()) as Repository;

  if (repository.private && !accessToken) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  const treeResponse = await fetch(
    `https://api.github.com/repos/jellewijma/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(repository.default_branch)}?recursive=1`,
    { headers, cache: "no-store" },
  );

  if (!treeResponse.ok) {
    return Response.json({ error: "Project image unavailable." }, { status: 404 });
  }

  const tree = (await treeResponse.json()) as { tree: TreeItem[] };
  const candidate = tree.tree
    .filter(
      (item) =>
        item.type === "blob" &&
        /\.(png|jpe?g|webp)$/i.test(item.path) &&
        !/(node_modules|\.next|dist|coverage)\//i.test(item.path),
    )
    .sort((a, b) => imageScore(b.path) - imageScore(a.path))[0];

  if (!candidate || imageScore(candidate.path) < 1) {
    return Response.json({ error: "No project screenshot is available." }, { status: 404 });
  }

  const encodedPath = candidate.path.split("/").map(encodeURIComponent).join("/");
  const imageResponse = await fetch(
    `https://api.github.com/repos/jellewijma/${encodeURIComponent(repo)}/contents/${encodedPath}`,
    {
      headers: {
        ...headers,
        Accept: "application/vnd.github.raw+json",
      },
      cache: "no-store",
    },
  );

  if (!imageResponse.ok || !imageResponse.body) {
    return Response.json({ error: "Project image unavailable." }, { status: 404 });
  }

  return new Response(imageResponse.body, {
    headers: {
      "Content-Type": imageResponse.headers.get("content-type") ?? "image/png",
      "Cache-Control": repository.private
        ? "private, no-store"
        : "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
