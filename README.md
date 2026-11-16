# Caleb Kilemba — Data Engineering Portfolio

Personal portfolio of **Caleb Kilemba**, Data Engineer · Analytics Engineer · Data Analytics.

A light-themed, terminal-inspired developer workspace built with Next.js. It presents engineering skills, data engineering projects, pipeline architecture, writing and live GitHub activity. It is a technical showcase, not a services or consulting site.

## Sections

| Anchor | Section | Source of data |
| --- | --- | --- |
| `#top` | System_Overview (hero + live telemetry) | `src/content/profile.ts`, GitHub API |
| `#about` | About_Me | `src/content/profile.ts` |
| `#stack` | Engineering_Stack | `src/content/skills.ts` + project evidence |
| `#projects` | Projects_Hub (filterable, status-labelled) | `src/content/projects.ts` |
| `#architecture` | Pipeline_Architecture | `architecture` field of completed projects |
| `#timeline` | Career_Timeline | `profile.timeline` |
| `#knowledge` | Knowledge_Base | `src/content/articles.ts` |
| `#github` | GitHub_Activity | GitHub REST API (revalidated hourly) |
| `#support` | Buy Me a Coffee | `profile.buyMeACoffeeUrl` |
| `#contact` | Contact | `profile` |

### Honesty rules built into the code

- **No skill percentages.** A tool chip is highlighted only when a *completed* project lists it in `tools`.
- **No hardcoded GitHub numbers.** Repository count and list come from the GitHub API. If the API fails, the section says so.
- **Projects are validated.** `tests/projects.test.ts` fails the build if a completed project has no repository under `github.com/KilembaCaleb843`, no architecture, or no workflow.
- **No sales copy.** `tests/content.test.ts` fails if consulting/freelancing phrases or the old unverified metrics reappear.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, static generation with ISR), React 19, TypeScript
- Plain CSS with design tokens (`src/app/globals.css`), no UI framework
- Fonts: Inter (body) and JetBrains Mono (labels/code) via `next/font` (self-hosted at build)
- Tests: Vitest

## Getting started

Requirements: Node.js ≥ 20.9.

```bash
npm ci
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit and content tests |
| `npm run check` | Typecheck + tests + build (same as CI) |

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | No | Token with no scopes; raises GitHub API rate limit from 60 to 5,000 req/h. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for metadata. Defaults to the Vercel URL. |

## Configuration placeholders

These values were not verifiable when the site was built, so they are `null` in `src/content/profile.ts` and the UI degrades gracefully:

| Field | Behaviour while `null` | How to set |
| --- | --- | --- |
| `resumeUrl` | Hero shows **Request Resume** (mailto) instead of **Download Resume** | Put the PDF in `public/resume/` and set `resumeUrl: "/resume/<file>.pdf"` |
| `buyMeACoffeeUrl` | Button shown as disabled "(soon)" | Set to `https://www.buymeacoffee.com/<username>` |
| `linkedinUrl` | LinkedIn card hidden | Set to `https://www.linkedin.com/in/<handle>` |

Timeline entries live in `profile.timeline`. Add only verified roles, education and dates.

## Adding a project

Add an entry to `src/content/projects.ts` once its repository is public:

```ts
{
  slug: "data-engineering-capstone-example",
  name: "Example pipeline",
  status: "completed",              // or "in-progress"
  categories: ["Batch ETL", "Orchestration"],
  tools: ["Python", "Apache Airflow", "PostgreSQL", "Docker"],
  architecture: [
    { layer: "Source", component: "REST API" },
    { layer: "Orchestration", component: "Airflow" },
    { layer: "Warehouse", component: "PostgreSQL" },
  ],
  repoUrl: "https://github.com/KilembaCaleb843/data-engineering-capstone-example",
  // businessProblem, objective, workflow, concepts, results, lessons ...
}
```

Run `npm test`. The validation tests reject incomplete entries.

## Writing

Articles are currently linked at their URLs on the previous deployment (`articlesBaseUrl` in `src/content/articles.ts`). **Before replacing the old deployment on the same domain, migrate the posts** (or point `articlesBaseUrl` at their new home). Otherwise those links will 404.

## Deployment (Vercel)

1. Import the repository in Vercel (framework preset: Next.js, defaults are fine).
2. Optionally add `GITHUB_TOKEN` under Project → Settings → Environment Variables.
3. Every push to a non-production branch creates a **preview deployment**. Review it before promoting to production.

The page is statically generated and re-validated hourly, so new GitHub repositories appear without a redeploy.

## Accessibility

- Body text 17–18px, line-height 1.65, AA-contrast colour tokens
- Skip link, semantic landmarks, one `h1`, labelled sections
- Visible focus rings, keyboard-operable menu (Esc closes)
- Respects `prefers-reduced-motion`; no boot screens or typewriter delays

## License

Code: [MIT](LICENSE). Written content, name and likeness © Caleb Kilemba, all rights reserved.
