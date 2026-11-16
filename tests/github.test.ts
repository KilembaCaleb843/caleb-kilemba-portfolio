import { afterEach, describe, expect, it, vi } from "vitest";
import { getGitHubSnapshot, selectRepos } from "@/lib/github";

const repo = (name: string, pushed: string, extra: Record<string, unknown> = {}) => ({
  name,
  description: null,
  html_url: `https://github.com/u/${name}`,
  homepage: "",
  language: "Python",
  topics: [],
  stargazers_count: 0,
  pushed_at: pushed,
  fork: false,
  archived: false,
  ...extra,
});

describe("selectRepos", () => {
  it("drops forks and archived repos and sorts by last push", () => {
    const out = selectRepos([
      repo("old", "2026-01-01T00:00:00Z"),
      repo("new", "2026-11-01T00:00:00Z"),
      repo("forked", "2026-11-02T00:00:00Z", { fork: true }),
      repo("archived", "2026-11-03T00:00:00Z", { archived: true }),
    ]);
    expect(out.map((r) => r.name)).toEqual(["new", "old"]);
    expect(out[0].homepage).toBeNull();
  });

  it("respects the limit", () => {
    const many = Array.from({ length: 10 }, (_, i) => repo(`r${i}`, `2026-01-${String(i + 1).padStart(2, "0")}T00:00:00Z`));
    expect(selectRepos(many, 3)).toHaveLength(3);
  });
});

describe("getGitHubSnapshot", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns an error state instead of throwing when the API fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("rate limited", { status: 403 })));
    const snap = await getGitHubSnapshot("KilembaCaleb843");
    expect(snap.ok).toBe(false);
    expect(snap.profileUrl).toBe("https://github.com/KilembaCaleb843");
  });

  it("returns an error state on network failure", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("offline"); }));
    const snap = await getGitHubSnapshot("KilembaCaleb843");
    expect(snap).toMatchObject({ ok: false, error: "offline" });
  });

  it("uses the real public_repos count from the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) =>
        url.endsWith("/users/KilembaCaleb843")
          ? Response.json({ public_repos: 2 })
          : Response.json([repo("a", "2026-11-01T00:00:00Z"), repo("b", "2026-10-01T00:00:00Z")]),
      ),
    );
    const snap = await getGitHubSnapshot("KilembaCaleb843");
    expect(snap.ok && snap.publicRepos).toBe(2);
    expect(snap.ok && snap.repos.map((r) => r.name)).toEqual(["a", "b"]);
  });
});
