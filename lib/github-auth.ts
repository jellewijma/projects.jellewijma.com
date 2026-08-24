import { getToken } from "next-auth/jwt";

const allowedLogin = "jellewijma";

export async function getGitHubToken(request: Request) {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    return null;
  }

  const token = await getToken({
    req: request,
    secret,
    secureCookie: new URL(request.url).protocol === "https:",
  });

  if (
    token?.githubLogin !== allowedLogin ||
    typeof token.githubAccessToken !== "string"
  ) {
    return null;
  }

  return token.githubAccessToken;
}

export function githubHeaders(accessToken?: string | null) {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}

export function validRepoName(repo: string) {
  return /^[A-Za-z0-9._-]+$/.test(repo);
}
