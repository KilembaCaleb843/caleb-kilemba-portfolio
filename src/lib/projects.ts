import type { Project } from "@/content/projects";

export function completedProjects(all: Project[]): Project[] {
  return all.filter((p) => p.status === "completed");
}

/**
 * Map each tool name (case-insensitive) to the projects that actually use it,
 * so skill cards can show real evidence instead of proficiency bars.
 */
export function skillEvidence(all: Project[]): Map<string, Project[]> {
  const map = new Map<string, Project[]>();
  for (const project of all) {
    for (const tool of project.tools) {
      const key = tool.toLowerCase();
      map.set(key, [...(map.get(key) ?? []), project]);
    }
  }
  return map;
}

/** Problems that would make a project card misleading. Empty array = valid. */
export function validateProject(p: Project): string[] {
  const problems: string[] = [];
  if (!p.name.trim()) problems.push("missing name");
  if (p.categories.length === 0) problems.push("no category");
  if (p.tools.length === 0) problems.push("no tools");
  if (p.status === "completed") {
    if (!p.repoUrl) problems.push("completed project without repository");
    else if (!/^https:\/\/github\.com\/KilembaCaleb843\/[\w.-]+$/.test(p.repoUrl))
      problems.push("repository must live under github.com/KilembaCaleb843");
    if (p.architecture.length < 2) problems.push("completed project needs an architecture (2+ stages)");
    if (p.workflow.length === 0) problems.push("completed project needs a workflow");
  }
  return problems;
}
