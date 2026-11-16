export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
  fork: boolean;
};

export type GitHubSnapshot =
  | { ok: true; repos: Repo[]; publicRepos: number; profileUrl: string; fetchedAt: string }
  | { ok: false; error: string; profileUrl: string };

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const API = "https://api.github.com";
/** Re-fetch GitHub data at most once an hour (ISR). */
export const GITHUB_REVALIDATE_SECONDS = 3600;

export function toRepo(r: ApiRepo): Repo {
  return {
    name: r.name,
    description: r.description,
    url: r.html_url,
    homepage: r.homepage || null,
    language: r.language,
    topics: r.topics ?? [],
    stars: r.stargazers_count,
    updatedAt: r.pushed_at,
    fork: r.fork,
  };
}

/** Own, non-archived repos, most recently pushed first. */
export function selectRepos(raw: ApiRepo[], limit = 6): Repo[] {
  return raw
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, limit)
    .map(toRepo);
}

export async function getGitHubSnapshot(user: string): Promise<GitHubSnapshot> {
  const profileUrl = `https://github.com/${user}`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const opts = { headers, next: { revalidate: GITHUB_REVALIDATE_SECONDS } };
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${user}`, opts),
      fetch(`${API}/users/${user}/repos?per_page=100&type=owner&sort=pushed`, opts),
    ]);
    if (!userRes.ok || !reposRes.ok) {
      return { ok: false, error: `GitHub API returned ${userRes.status}/${reposRes.status}`, profileUrl };
    }
    const userJson = (await userRes.json()) as { public_repos: number };
    const reposJson = (await reposRes.json()) as ApiRepo[];
    return {
      ok: true,
      repos: selectRepos(reposJson),
      publicRepos: userJson.public_repos,
      profileUrl,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error", profileUrl };
  }
}
