import type { Metadata } from "next";
import Link from "next/link";
import { ArticleArt } from "@/components/ArticleArt";
import JournalNav from "@/components/JournalNav";
import { articles, longDate, perspectiveData } from "@/lib/perspectives";

export const metadata: Metadata = {
  title: "The Bigger Picture | Today in GFW",
  description: "An evolving civic journal examining the history, housing, economy, public realm and shared life of Grand Falls-Windsor and the Exploits Valley.",
  alternates: {canonical:"/bigger-picture"}
};
export default function BiggerPicture(){
 const [featured,...others]=articles;
 return <><JournalNav/><main className="journal-home">
  <section className="journal-intro"><div className="wrap journal-intro-grid">
   <div><div className="journal-eyebrow"><span className="journal-eyebrow-dot"/> INDEPENDENT ESSAYS ON A CHANGING TOWN</div>
    <h1>Not just what<br/>happened. <em>What it means.</em></h1>
    <p className="journal-lede">The history we tell ourselves shapes the future we think is possible. These essays make a case about the place we live—through its people, streets, public decisions and contradictions.</p>
    <div className="journal-intro-action"><a href="#essays">Explore the findings <span>↘</span></a><span>FIRST RESEARCH EDITION · {longDate(perspectiveData.edition)}</span></div>
   </div>
   <aside className="journal-map" aria-label="Five lenses for understanding GFW"><div className="journal-map-surface"><span className="journal-map-overline">OUR WORKING PICTURE</span><div className="journal-map-orbit"><span className="orbit-dot d1"/><span className="orbit-dot d2"/><span className="orbit-dot d3"/><span className="orbit-dot d4"/><span className="orbit-dot d5"/><div className="map-core">GFW<br/><small>& THE VALLEY</small></div></div><div className="journal-map-legend"><span>IDENTITY</span><span>HOUSING</span><span>ECONOMY</span><span>BELONGING</span><span>PUBLIC REALM</span></div></div><p>Five arguments about the same place. Each grounded in sources, each open to correction.</p></aside>
  </div></section>
  <section id="essays" className="journal-archive"><div className="wrap">
   <div className="journal-section-title"><div><span>01 / THE RESEARCH DESK</span><h2>The ongoing <em>story.</em></h2></div><p>We follow the facts, but we do not stop at listing them. Each piece takes a position and shows the evidence behind it.</p></div>
   <div className="journal-feature-row"><Link href={`/bigger-picture/${featured.slug}`} className="journal-feature-card"><ArticleArt kind={featured.graphic} detail/><div className="journal-feature-copy"><span className="journal-pill">FEATURED ESSAY · {featured.category}</span><h3>{featured.title}</h3><p>{featured.dek}</p><div className="journal-card-foot"><span>{longDate(featured.updated)} · {featured.readTime} MIN READ</span><b>Read the essay ↗</b></div></div></Link></div>
   <div className="journal-card-grid">{others.map((a,i)=><Link href={`/bigger-picture/${a.slug}`} key={a.slug} className="journal-essay-card"><ArticleArt kind={a.graphic}/><div className="journal-essay-body"><span className="journal-card-index">0{i+2} / {a.category.toUpperCase()}</span><h3>{a.title}</h3><p>{a.cardText}</p><div className="journal-card-foot"><span>UPDATED {longDate(a.updated)}</span><b>Read ↗</b></div></div></Link>)}</div>
  </div></section>
  <section className="journal-approach"><div className="wrap journal-approach-grid"><div><span className="journal-small-label">02 / HOW WE THINK</span><h2>More than facts.<br/><em>A point of view.</em></h2></div><div className="journal-steps"><div><b>01</b><strong>Observe</strong><p>Start with local histories, town records, firsthand accounts, reporting and documented community life.</p></div><div><b>02</b><strong>Interpret</strong><p>Make an argument. Name the tension. Connect public decisions to lived experience.</p></div><div><b>03</b><strong>Test & revise</strong><p>Correct the record and revise the argument when new evidence genuinely changes it.</p></div></div></div></section>
  <section className="journal-footer-note"><div className="wrap"><p>These essays are independently published, AI-assisted civic research—not municipal statements, representative opinion polling, or guarantees of future outcomes. Source links and update notes appear on each essay. <strong>{perspectiveData.editorialNote}</strong></p><Link href="/">Return to the daily briefing ↗</Link></div></section>
 </main></>;
}
