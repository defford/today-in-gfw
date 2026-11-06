import raw from "@/data/civic-issues.json";

export type CivicSource = { label: string; url: string; checked: string };
export type CivicMilestone = {
  date: string; label: string; detail: string;
  state: "occurred" | "scheduled"; sourceUrl: string;
};
export type CivicIssue = {
  slug: string; title: string; theme: string; location: string;
  status: string; summary: string; whyItMatters: string;
  stages: string[]; currentStage: number;
  lastChecked: string; nextCheck: string; nextToWatch: string;
  known: string[]; openQuestions: string[];
  milestones: CivicMilestone[]; sources: CivicSource[];
  action?: { title: string; details: string; until: string; url: string };
};
export type CivicIssueData = {
  schemaVersion: number; edition: string; editorialNote: string; issues: CivicIssue[];
};

export const civicIssueData = raw as CivicIssueData;
export const civicIssues = civicIssueData.issues;
export const findCivicIssue = (slug: string) => civicIssues.find(issue => issue.slug === slug);

export function gfwLocalDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/St_Johns", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const p = Object.fromEntries(parts.map(item => [item.type, item.value]));
  return `${p.year}-${p.month}-${p.day}`;
}

export function issueActionIsActive(issue: CivicIssue, today: string) {
  return Boolean(issue.action && issue.action.until >= today);
}

export const issueDate = (date: string) => new Intl.DateTimeFormat("en-CA", {
  day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
}).format(new Date(`${date}T12:00:00Z`));
