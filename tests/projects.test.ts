import { describe, expect, it } from "vitest";
import { projects, type Project } from "@/content/projects";
import { completedProjects, skillEvidence, validateProject } from "@/lib/projects";

const base: Project = {
  slug: "demo",
  name: "Demo pipeline",
  status: "completed",
  categories: ["Batch ETL"],
  summary: "s",
  businessProblem: "b",
  objective: "o",
  tools: ["Python", "PostgreSQL"],
  architecture: [
    { layer: "Source", component: "CSV" },
    { layer: "Warehouse", component: "PostgreSQL" },
  ],
  workflow: ["extract", "load"],
  concepts: ["idempotency"],
  results: [],
  lessons: [],
  repoUrl: "https://github.com/KilembaCaleb843/demo",
};

describe("project validation", () => {
  it("every listed project is valid", () => {
    for (const p of projects) expect(validateProject(p), p.slug).toEqual([]);
  });

  it("project slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("accepts a complete project", () => {
    expect(validateProject(base)).toEqual([]);
  });

  it("rejects a completed project without a repo", () => {
    expect(validateProject({ ...base, repoUrl: null })).toContain("completed project without repository");
  });

  it("rejects repos outside the owner's account", () => {
    expect(validateProject({ ...base, repoUrl: "https://github.com/someone-else/demo" })).toContain(
      "repository must live under github.com/KilembaCaleb843",
    );
  });

  it("allows in-progress projects without a repo", () => {
    expect(validateProject({ ...base, status: "in-progress", repoUrl: null, architecture: [], workflow: [] })).toEqual([]);
  });
});

describe("skill evidence", () => {
  it("maps tools case-insensitively to projects", () => {
    const ev = skillEvidence([base]);
    expect(ev.get("postgresql")?.map((p) => p.slug)).toEqual(["demo"]);
    expect(ev.get("kafka")).toBeUndefined();
  });

  it("only counts completed projects as evidence on the page", () => {
    const wip = { ...base, slug: "wip", status: "in-progress" as const };
    expect(completedProjects([base, wip]).map((p) => p.slug)).toEqual(["demo"]);
  });
});
