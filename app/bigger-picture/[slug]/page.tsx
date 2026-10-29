import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JournalNav from "@/components/JournalNav";
import { ArticleArt } from "@/components/ArticleArt";
import { articles, bySlug, longDate } from "@/lib/perspectives";

export function generateStaticParams(){ return articles.map(({slug})=>({slug})); }
export async function generateMetadata({params}: {params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const a=bySlug(slug);
 if(!a)return {title:"Article not found | Today in GFW"};
 return {title:`${a.title} | The Bigger Picture`,description:a.dek,alternates:{canonical:`/bigger-picture/${a.slug}`},openGraph:{title:a.title,description:a.dek,type:"article",publishedTime:a.date,modifiedTime:a.updated}};
}
export default async function Essay({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const a=bySlug(slug);if(!a)notFound();
 const related=a.related.map(bySlug).filter((item):item is NonNullable<typeof item> => Boolean(item));
 return <><JournalNav/><main className="journal-article">
  <div className="wrap article-breadcrumb"><Link href="/bigger-picture">THE BIGGER PICTURE</Link><span>/</span><span>{a.category.toUpperCase()}</span></div>
  <header className="article-hero"><div className="wrap"><div className="article-hero-grid"><div className="article-heading"><span className="journal-small-label">{a.eyebrow}</span><h1>{a.title}</h1><p>{a.dek}</p><div className="article-meta"><span>{longDate(a.date)}</span><span>{a.readTime} MIN READ</span><span>{a.status.toUpperCase()}</span></div></div><ArticleArt kind={a.graphic} detail/></div></div></header>
  <div className="article-bar"><div className="wrap"><span>INDEPENDENT CIVIC ESSAY</span><span>LAST REVISED {longDate(a.updated).toUpperCase()}</span></div></div>
  <div className="wrap article-layout"><article className="article-main">
   <div className="article-thesis"><span>THE ARGUMENT</span><p>{a.thesis}</p></div>
   <div className="article-statband">{a.facts.map(f=><div key={f.label}><strong>{f.label}</strong><span>{f.detail}</span></div>)}</div>
   {a.sections.map((s,i)=><section key={s.heading} className="article-section"><span className="article-sec-no">{String(i+1).padStart(2,'0')} / THE STORY</span><h2>{s.heading}</h2>{s.body.map((b,n)=><p key={n}>{b}</p>)}</section>)}
   <section className="article-evidence" aria-label="Evidence and interpretation"><span className="journal-small-label">AFTER THE ESSAY</span><h2>What holds up—and what is still open.</h2><div className="evidence-grids"><div className="evidence-confirmed"><h3><span>●</span> Documented</h3>{a.known.map((s,i)=><p key={i}>{s}</p>)}</div><div className="evidence-interpretation"><h3><span>◒</span> Working interpretation</h3>{a.inference.map((s,i)=><p key={i}>{s}</p>)}</div></div><div className="evidence-questions"><h3>Questions we are following</h3><ol>{a.questions.map(q=><li key={q}>{q}</li>)}</ol></div></section>
   <section className="article-sources"><span className="journal-small-label">CHECK OUR WORK</span><h2>Original sources</h2><p>These are the underlying public records and reporting, not proof of our conclusions. Source dates may precede this essay.</p><ol>{a.sources.map((s,i)=><li key={s.url}><span>{String(i+1).padStart(2,'0')}</span><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}<span aria-hidden="true"> ↗</span></a></li>)}</ol></section>
   <section className="article-changelog"><h2>Research log</h2>{a.log.map((entry,i)=><p key={i}><time dateTime={entry.date}>{longDate(entry.date)}</time><span>{entry.note}</span></p>)}</section>
  </article><aside className="article-rail"><div className="rail-sticky"><span className="journal-small-label">FIELD NOTES</span><p>This essay makes an argument. Its sources and open questions are here so the argument can be challenged.</p><div className="rail-divider"/><strong>STATUS</strong><span>{a.status}</span><strong>LAST UPDATED</strong><span>{longDate(a.updated)}</span><strong>AREA</strong><span>{a.category}</span><div className="rail-divider"/><Link href="/bigger-picture">← All research essays</Link></div></aside></div>
  <section className="related-essays"><div className="wrap"><div className="related-heading"><span className="journal-small-label">KEEP EXPLORING</span><h2>The stories <em>connect.</em></h2></div><div className="related-grid">{related.map(item=><Link href={`/bigger-picture/${item.slug}`} key={item.slug}><ArticleArt kind={item.graphic}/><span>{item.category.toUpperCase()}</span><h3>{item.title}</h3><b>Continue reading ↗</b></Link>)}</div></div></section>
  <div className="journal-footer-note"><div className="wrap"><p>Today in GFW is independent and not affiliated with the Town. This AI-assisted research is an evolving interpretation of public information, not an official policy assessment.</p><Link href="/">Back to today's briefing ↗</Link></div></div>
 </main></>;
}
