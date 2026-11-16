/**
 * Single source of truth for personal details shown on the site.
 *
 * Rule: only verified facts go here. Anything not yet confirmed is `null`,
 * and the UI hides or degrades the related element instead of showing a
 * made-up value. See README "Configuration placeholders".
 */

export type TimelineEntry = {
  /** Display period, e.g. "2026" or "Sep 2026 – Present". Never invent dates. */
  period: string;
  title: string;
  organisation?: string;
  kind: "role" | "education" | "learning" | "project";
  description: string;
};

export type Profile = {
  name: string;
  headline: string[];
  intro: string;
  email: string;
  githubUser: string;
  /** PLACEHOLDER: full LinkedIn profile URL. */
  linkedinUrl: string | null;
  /** PLACEHOLDER: path under /public (e.g. "/resume/caleb-kilemba-resume.pdf") or absolute URL. */
  resumeUrl: string | null;
  /** PLACEHOLDER: e.g. "https://www.buymeacoffee.com/<username>". Never guess this. */
  buyMeACoffeeUrl: string | null;
  about: string[];
  timeline: TimelineEntry[];
};

export const profile: Profile = {
  name: "Caleb Kilemba",
  headline: ["Data Engineer", "Analytics Engineer", "Data Analytics"],
  intro:
    "I design and build data pipelines, analytics systems, and scalable data infrastructure that transform raw data into reliable, actionable information.",
  email: "calebkilemba843@gmail.com",
  githubUser: "KilembaCaleb843",
  linkedinUrl: null,
  resumeUrl: null,
  buyMeACoffeeUrl: null,
  about: [
    "I'm a Data Engineer focused on designing systems that make organisational data reliable, accessible and useful. My work sits where analytics meets engineering: understanding the questions a business needs answered, then building the pipelines, models and warehouses that answer them consistently.",
    "I came to data engineering through analytics. Cleaning messy files, reconciling inconsistent records and building reports showed me that most reporting problems are really pipeline problems, so I moved upstream to fix them at the source with automated ingestion, tested transformations and well-modelled warehouse tables.",
    "Today I build batch and orchestrated pipelines with Python, SQL, Airflow and Docker, model data for analysis, and treat data quality as part of the pipeline rather than an afterthought. I also write about practical data problems faced by Kenyan businesses, from M-Pesa till records to branch profitability.",
  ],
  timeline: [
    {
      period: "2026 – Present",
      title: "Data Engineering programme",
      organisation: "LuxDevHQ",
      kind: "learning",
      description:
        "Hands-on training in Python data workflows, SQL, pipeline orchestration and data engineering capstone projects.",
    },
    {
      period: "Sep 2026",
      title: "Published a 10-part practical analytics article series",
      kind: "learning",
      description:
        "Articles on using business data (M-Pesa tills, POS logs, branch P&L, repeat customers) to make better operational decisions.",
    },
  ],
};

export const githubProfileUrl = `https://github.com/${profile.githubUser}`;
