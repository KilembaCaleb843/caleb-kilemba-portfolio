import { articles, articlesBaseUrl } from "@/content/articles";
import { githubProfileUrl, profile } from "@/content/profile";
import type { Project } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { formatDate } from "@/lib/format";
import type { GitHubSnapshot } from "@/lib/github";
import { skillEvidence } from "@/lib/projects";
import { ExternalLink, Section, SectionHeader, StatusPill, TerminalWindow } from "./primitives";

/* ---------------- Hero / System_Overview ---------------- */

export function Hero({ github, completedCount }: { github: GitHubSnapshot; completedCount: number }) {
  const resume = profile.resumeUrl;
  return (
    <section id="top" className="hero grid-bg" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="reveal">
          <StatusPill>system_online · building capstone pipelines</StatusPill>
          <h1 id="hero-title">{profile.name}</h1>
          <ul className="role-line" aria-label="Roles">
            {profile.headline.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="hero-intro">{profile.intro}</p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#projects">
              Explore Projects
            </a>
            {resume ? (
              <a className="btn btn-secondary" href={resume} download>
                Download Resume <span className="mono-hint">.pdf</span>
              </a>
            ) : (
              <a
                className="btn btn-secondary"
                href={`mailto:${profile.email}?subject=${encodeURIComponent("Resume request")}`}
              >
                Request Resume
              </a>
            )}
            <ExternalLink className="btn btn-secondary" href={githubProfileUrl}>
              View GitHub
            </ExternalLink>
          </div>
        </div>

        <div className="reveal">
          <TerminalWindow title="~/profile/system_overview.yml" status="read-only">
            <code>
              <span className="c-com"># who am I, in one file</span>
              {"\n"}
              <span className="c-key">name</span>: <span className="c-str">{profile.name}</span>
              {"\n"}
              <span className="c-key">role</span>: [data_engineer, analytics_engineer]
              {"\n"}
              <span className="c-key">builds</span>:{"\n"}
              {"  "}- batch & orchestrated pipelines{"\n"}
              {"  "}- warehouse data models{"\n"}
              {"  "}- tested, monitored data flows{"\n"}
              <span className="c-key">core_stack</span>: [python, sql, airflow, dbt, docker]
              {"\n"}
              <span className="c-key">writes_about</span>: <span className="c-str">practical analytics</span>
            </code>
          </TerminalWindow>
          <dl className="telemetry" aria-label="Live telemetry">
            <div>
              <dt>public_repos</dt>
              <dd>{github.ok ? github.publicRepos : "—"}</dd>
            </div>
            <div>
              <dt>capstones</dt>
              <dd>{completedCount}</dd>
            </div>
            <div>
              <dt>articles</dt>
              <dd>{articles.length}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About_Me ---------------- */

export function About() {
  return (
    <Section id="about">
      <SectionHeader id="about" label="About_Me" title="From analytics to data engineering" />
      <div className="about-grid">
        <div>
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <TerminalWindow title="personnel_data.json">
          <dl className="kv">
            <dt>name</dt>
            <dd>{profile.name}</dd>
            <dt>focus</dt>
            <dd>{profile.headline.join(" · ")}</dd>
            <dt>github</dt>
            <dd>@{profile.githubUser}</dd>
            <dt>email</dt>
            <dd>{profile.email}</dd>
            <dt>status</dt>
            <dd>building data engineering capstones</dd>
          </dl>
        </TerminalWindow>
      </div>
    </Section>
  );
}

/* ---------------- Engineering_Stack ---------------- */

export function Stack({ projects }: { projects: Project[] }) {
  const evidence = skillEvidence(projects);
  return (
    <Section id="stack">
      <SectionHeader
        id="stack"
        label="Engineering_Stack"
        title="Tools I work with"
        lead="Grouped by where they sit in a data platform. No skill bars: a highlighted tool links its use to a published project below."
      />
      <div className="card-grid">
        {skillGroups.map((group) => (
          <article key={group.id} className="card">
            <h3>{group.title}</h3>
            <p className="cmd" aria-hidden="true">
              $ {group.command}
            </p>
            <ul className="chip-list">
              {group.skills.map((skill) => {
                const used = evidence.get(skill.toLowerCase()) ?? [];
                return (
                  <li key={skill} className={`chip ${used.length ? "evidenced" : ""}`}>
                    {used.length > 0 && (
                      <span className="tick" aria-hidden="true">
                        ✓
                      </span>
                    )}
                    {skill}
                    {used.length > 0 && (
                      <span className="sr-only">, used in {used.map((p) => p.name).join(", ")}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
      <p className="legend">
        <span>
          <span className="chip evidenced" style={{ padding: "1px 8px" }}>
            <span className="tick" aria-hidden="true">✓</span> tool
          </span>{" "}
          used in a published project
        </span>
      </p>
    </Section>
  );
}

/* ---------------- Pipeline_Architecture ---------------- */

export function Architecture({ projects }: { projects: Project[] }) {
  return (
    <Section id="architecture">
      <SectionHeader
        id="architecture"
        label="Pipeline_Architecture"
        title="How the pipelines are wired"
        lead="Data flow for each completed project, taken from the implemented code rather than a wish-list of tools."
      />
      {projects.length === 0 ? (
        <div className="empty-state">
          <p className="mono" style={{ color: "var(--warn)" }}>
            &gt; awaiting_first_deploy
          </p>
          <p>
            Architecture diagrams are published together with each capstone repository. They will appear here once the
            first capstone pipeline is complete and tested.
          </p>
        </div>
      ) : (
        projects.map((p) => (
          <figure key={p.slug} className="arch">
            <TerminalWindow title={`${p.slug}/architecture`} status={<span className="badge badge-done">live</span>}>
              <ol className="flow" aria-label={`${p.name} data flow`}>
                {p.architecture.map((stage, i) => (
                  <li key={`${stage.layer}-${i}`}>
                    <span className="node">
                      <span className="layer">{stage.layer}</span>
                      <span className="component">{stage.component}</span>
                    </span>
                    {i < p.architecture.length - 1 && (
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </TerminalWindow>
            <figcaption className="sr-only">{p.name} architecture</figcaption>
          </figure>
        ))
      )}
    </Section>
  );
}

/* ---------------- Career_Timeline ---------------- */

export function Timeline() {
  return (
    <Section id="timeline">
      <SectionHeader id="timeline" label="Career_Timeline" title="Milestones" />
      <ol className="timeline">
        {profile.timeline.map((t) => (
          <li key={t.title}>
            <span className="period">{t.period}</span>
            <h3>{t.title}</h3>
            {t.organisation && <p className="org">{t.organisation}</p>}
            <p>{t.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------- Knowledge_Base ---------------- */

export function KnowledgeBase() {
  return (
    <Section id="knowledge">
      <SectionHeader
        id="knowledge"
        label="Knowledge_Base"
        meta={` · ${articles.length} articles`}
        title="Writing on practical data problems"
        lead={
          articlesBaseUrl
            ? "Short, plain-language articles on turning everyday business records into decisions."
            : "Short, plain-language articles on turning everyday business records into decisions. Full posts are being migrated to this site."
        }
      />
      <ul className="article-list">
        {articles.map((a) => {
          const body = (
            <>
              <span className="title">{a.title}</span>
              <span className="summary">{a.summary}</span>
              <span className="meta">
                {formatDate(a.published)} · {a.readMinutes} min read
              </span>
            </>
          );
          return (
            <li key={a.slug}>
              {articlesBaseUrl ? (
                <a className="article-link" href={`${articlesBaseUrl}/${a.slug}`}>
                  {body}
                </a>
              ) : (
                <div className="article-link">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ---------------- GitHub_Activity ---------------- */

export function GitHubActivity({ github }: { github: GitHubSnapshot }) {
  return (
    <Section id="github">
      <SectionHeader
        id="github"
        label="GitHub_Activity"
        title="Latest repositories"
        lead={
          <>
            Pulled live from the GitHub API for{" "}
            <ExternalLink href={githubProfileUrl}>@{profile.githubUser}</ExternalLink> and refreshed hourly.
          </>
        }
      />
      {!github.ok ? (
        <div className="empty-state">
          <p className="mono" style={{ color: "var(--warn)" }}>
            &gt; github_api: unavailable
          </p>
          <p>
            Repository data could not be loaded right now. Browse them directly on{" "}
            <ExternalLink href={github.profileUrl}>GitHub</ExternalLink>.
          </p>
        </div>
      ) : github.repos.length === 0 ? (
        <div className="empty-state">
          <p className="mono" style={{ color: "var(--subtle)" }}>
            &gt; repos: 0 public
          </p>
          <p>
            Public repositories will be listed here automatically as projects are published to{" "}
            <ExternalLink href={github.profileUrl}>GitHub</ExternalLink>.
          </p>
        </div>
      ) : (
        <ul className="card-grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {github.repos.map((r) => (
            <li key={r.name} className="card repo-card">
              <h3>
                <ExternalLink href={r.url}>{r.name}</ExternalLink>
              </h3>
              <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{r.description ?? "No description provided."}</p>
              <div className="repo-meta">
                {r.language && <span>● {r.language}</span>}
                <span>★ {r.stars}</span>
                <span>updated {formatDate(r.updatedAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

/* ---------------- Support (Buy Me a Coffee) ---------------- */

export function Support() {
  const url = profile.buyMeACoffeeUrl;
  return (
    <Section id="support">
      <SectionHeader id="support" label="Support" title="Buy me a coffee" />
      <div className="support">
        <p>
          If my projects, tutorials, or shared resources have helped you learn something new, you can support my work by
          buying me a coffee.
        </p>
        {url ? (
          <ExternalLink className="btn btn-coffee" href={url}>
            ☕ Buy Me a Coffee
          </ExternalLink>
        ) : (
          <span className="btn btn-coffee" aria-disabled="true" title="Link not configured yet">
            ☕ Buy Me a Coffee <span className="mono-hint">(soon)</span>
          </span>
        )}
      </div>
    </Section>
  );
}

/* ---------------- Contact ---------------- */

export function Contact() {
  const links = [
    { k: "email", v: profile.email, href: `mailto:${profile.email}`, external: false },
    { k: "github", v: `@${profile.githubUser}`, href: githubProfileUrl, external: true },
    ...(profile.linkedinUrl
      ? [{ k: "linkedin", v: "LinkedIn profile", href: profile.linkedinUrl, external: true }]
      : []),
  ];
  return (
    <Section id="contact">
      <SectionHeader
        id="contact"
        label="Contact"
        title="Get in touch"
        lead="Happy to talk about data engineering roles, pipelines, or anything I've written."
      />
      <div className="contact-grid">
        {links.map((l) =>
          l.external ? (
            <ExternalLink key={l.k} className="contact-link" href={l.href}>
              <span className="k">{l.k}</span>
              <span className="v">{l.v}</span>
            </ExternalLink>
          ) : (
            <a key={l.k} className="contact-link" href={l.href}>
              <span className="k">{l.k}</span>
              <span className="v">{l.v}</span>
            </a>
          ),
        )}
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name} · data engineering portfolio
        </span>
        <a href="#top">back_to_top ↑</a>
      </div>
    </footer>
  );
}
