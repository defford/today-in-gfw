import raw from "@/data/perspectives.json";

export type Fact = { label: string; detail: string };
export type Article = {
  slug: string; category: string; eyebrow: string; title: string; dek: string;
  featured: boolean; graphic: "heritage"|"housing"|"economy"|"culture"|"river";
  date: string; updated: string; readTime: number; status: string; cardText: string;
  thesis: string; facts: Fact[];
  sections: { heading: string; body: string[] }[];
  known: string[]; inference: string[]; questions: string[];
  sources: {label:string;url:string}[];
  related: string[]; log: { date: string; note: string }[];
};
export const perspectiveData = raw as { edition: string; editorialNote: string; posts: Article[] };
export const articles = perspectiveData.posts;
export const bySlug = (slug: string) => articles.find(a => a.slug === slug);
export const longDate = (date: string) => new Intl.DateTimeFormat("en-CA", {day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(date + "T12:00:00Z"));
