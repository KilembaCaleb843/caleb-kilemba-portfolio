import { ProjectsHub } from "@/components/ProjectsHub";
import { SiteHeader } from "@/components/SiteHeader";
import {
  About,
  Architecture,
  Contact,
  Footer,
  GitHubActivity,
  Hero,
  KnowledgeBase,
  Stack,
  Support,
  Timeline,
} from "@/components/sections";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getGitHubSnapshot } from "@/lib/github";
import { completedProjects } from "@/lib/projects";

// Must be a literal for Next.js; keep in sync with GITHUB_REVALIDATE_SECONDS.
export const revalidate = 3600;

export default async function Home() {
  const github = await getGitHubSnapshot(profile.githubUser);
  const completed = completedProjects(projects);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero github={github} completedCount={completed.length} />
        <About />
        <Stack projects={completed} />
        <ProjectsHub projects={projects} />
        <Architecture projects={completed} />
        <Timeline />
        <KnowledgeBase />
        <GitHubActivity github={github} />
        <Support />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
