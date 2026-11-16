import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/content/articles";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";

const SRC = path.resolve(__dirname, "../src");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? sourceFiles(full) : /\.(tsx?|css)$/.test(name) ? [full] : [];
  });
}

/** Phrases from the old consulting-oriented site that must not come back. */
const BANNED = [
  /book (my|a) (services?|consultation|call)/i,
  /free consultation/i,
  /\bpricing\b/i,
  /\bpackages?\b.*\b(starter|pro|premium)\b/i,
  /hire me/i,
  /freelanc/i,
  /available for (projects|hire|freelance)/i,
  /discovery call/i,
  /\bconsult(ing|ant|ancy)\b/i,
  /\b(my|our) clients\b|\bclient (acquisition|work|projects|results)\b/i,
];

describe("portfolio content", () => {
  const files = sourceFiles(SRC);

  it.each(BANNED.map((re) => [re.source, re]))("contains no consulting/sales copy: %s", (_label, re) => {
    const hits = files.filter((f) => (re as RegExp).test(readFileSync(f, "utf8")));
    expect(hits).toEqual([]);
  });

  it("has no proficiency percentages in skills", () => {
    const text = readFileSync(path.join(SRC, "content/skills.ts"), "utf8");
    expect(text).not.toMatch(/\d+\s*%/);
  });

  it("does not repeat unverified metrics from the old site", () => {
    const all = files.map((f) => readFileSync(f, "utf8")).join("\n");
    for (const claim of [/5\+\s*years/i, /500\s*GB/i, /100\+\s*analytic/i, /40%\s*pipeline/i]) {
      expect(all).not.toMatch(claim);
    }
  });

  it("keeps placeholders as null rather than invented values", () => {
    for (const key of ["linkedinUrl", "resumeUrl", "buyMeACoffeeUrl"] as const) {
      const v = profile[key];
      if (v !== null) expect(v).toMatch(/^(https:\/\/|\/)/);
    }
    if (profile.buyMeACoffeeUrl) expect(profile.buyMeACoffeeUrl).toMatch(/^https:\/\/(www\.)?buymeacoffee\.com\/[\w-]+\/?$/);
    if (profile.linkedinUrl) expect(profile.linkedinUrl).toMatch(/^https:\/\/(www\.)?linkedin\.com\/in\//);
  });

  it("has well-formed contact details", () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i);
    expect(profile.githubUser).toBe("KilembaCaleb843");
  });

  it("has unique skills and article slugs", () => {
    const skills = skillGroups.flatMap((g) => g.skills.map((s) => s.toLowerCase()));
    expect(new Set(skills).size).toBe(skills.length);
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
