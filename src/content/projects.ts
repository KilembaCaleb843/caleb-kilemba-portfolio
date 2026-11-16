/**
 * Data engineering projects shown in Projects_Hub and Pipeline_Architecture.
 *
 * Only add a project here once its repository exists. A "completed" project
 * must have a public repo and an architecture that matches the code
 * (enforced by tests/projects.test.ts).
 */

export const projectCategories = [
  "Batch ETL",
  "ELT",
  "Data Warehousing",
  "Streaming",
  "Orchestration",
  "Analytics Engineering",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ArchitectureStage = {
  /** Layer label, e.g. "Source", "Ingestion", "Warehouse". */
  layer: string;
  /** Concrete component used at this stage, e.g. "OpenAQ REST API". */
  component: string;
};

export type Project = {
  slug: string;
  name: string;
  status: "completed" | "in-progress";
  categories: ProjectCategory[];
  summary: string;
  businessProblem: string;
  objective: string;
  tools: string[];
  architecture: ArchitectureStage[];
  workflow: string[];
  concepts: string[];
  /** Verified outcomes only: numbers must come from real test/pipeline runs. */
  results: string[];
  lessons: string[];
  repoUrl: string | null;
  /** Optional image under /public showing output (dashboard, query result). */
  screenshot?: { src: string; alt: string };
};

export const projects: Project[] = [];
