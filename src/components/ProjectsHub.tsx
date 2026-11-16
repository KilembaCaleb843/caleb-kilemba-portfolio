"use client";

import { useMemo, useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/content/projects";
import { ExternalLink, Section, SectionHeader } from "./primitives";

type Filter = "All" | ProjectCategory;

export function ProjectsHub({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const available = useMemo(
    () => projectCategories.filter((c) => projects.some((p) => p.categories.includes(c))),
    [projects],
  );
  const visible = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <Section id="projects">
      <SectionHeader
        id="projects"
        label="Projects_Hub"
        meta={` · ${projects.filter((p) => p.status === "completed").length} completed`}
        title="Data engineering projects"
        lead="Each project links to its repository with runnable code, tests and documentation. Status labels separate finished work from work in progress."
      />

      {projects.length === 0 ? (
        <div className="empty-state">
          <p className="mono" style={{ color: "var(--warn)" }}>
            &gt; capstones: build_in_progress
          </p>
          <p>
            I&apos;m currently building my data engineering capstone projects. Each one will be listed here with its
            business problem, architecture, tests and GitHub repository once it is complete.
          </p>
        </div>
      ) : (
        <>
          {available.length > 1 && (
            <div className="filter-bar" role="group" aria-label="Filter projects by category">
              {(["All", ...available] as Filter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className="filter-btn"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <ul className="card-grid" style={{ listStyle: "none", padding: 0, margin: 0 }} aria-live="polite">
            {visible.map((p) => (
              <li key={p.slug} className="card project-card">
                <div>
                  <span className={`badge ${p.status === "completed" ? "badge-done" : "badge-wip"}`}>
                    {p.status === "completed" ? "completed" : "in progress"}
                  </span>
                </div>
                <h3>{p.name}</h3>
                <p style={{ color: "var(--muted)", margin: 0 }}>{p.summary}</p>
                <ul className="chip-list" aria-label="Tools">
                  {p.tools.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <details>
                  <summary>view_details</summary>
                  <h4>Business problem</h4>
                  <p>{p.businessProblem}</p>
                  <h4>Objective</h4>
                  <p>{p.objective}</p>
                  <h4>Pipeline workflow</h4>
                  <ol>
                    {p.workflow.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ol>
                  <h4>Key concepts</h4>
                  <ul>
                    {p.concepts.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  {p.results.length > 0 && (
                    <>
                      <h4>Results</h4>
                      <ul>
                        {p.results.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {p.lessons.length > 0 && (
                    <>
                      <h4>Lessons</h4>
                      <ul>
                        {p.lessons.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {p.screenshot && (
                    <img src={p.screenshot.src} alt={p.screenshot.alt} loading="lazy" style={{ marginTop: 12, borderRadius: 8 }} />
                  )}
                </details>
                {p.repoUrl && (
                  <ExternalLink className="btn btn-secondary" href={p.repoUrl}>
                    View repository
                  </ExternalLink>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
