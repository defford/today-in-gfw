import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JournalNav from "@/components/JournalNav";
import { civicIssues, findCivicIssue, gfwLocalDate, issueActionIsActive, issueDate } from "@/lib/civic-issues";

export const dynamic = "force-dynamic";
export function generateStaticParams() { return civicIssues.map(({slug}) => ({slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug} = await params;
  const issue = findCivicIssue(slug);
  if (!issue) return { title: "Issue not found | Today in GFW" };
  return { title: `${issue.title} | Today in GFW`, description: issue.summary,
    alternates: { canonical: `/issues/${slug}` } };
}

export default async function CivicIssueDetail({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params;
  const issue = findCivicIssue(slug);
  if (!issue) notFound();
  const today = gfwLocalDate();
  return <><JournalNav active="issues"/><main className="issue-page issue-detail">
    <div className="wrap issue-crumb"><Link href="/issues">CIVIC TRACKER</Link><span>/</span><span>{issue.theme.toUpperCase()}</span></div>
    <header className="issue-detail-hero"><div className="wrap issue-detail-hero-grid">
      <div><span className="issue-eyebrow">{issue.location} · {issue.theme}</span>
        <h1>{issue.title}</h1><p>{issue.summary}</p>
      </div>
      <aside className="issue-status-panel">
        <span>CURRENTLY DOCUMENTED STAGE</span>
        <strong>{issue.status}</strong>
        <p>{issue.stages[issue.currentStage]}</p>
        <span>LAST SOURCE REVIEW</span>
        <strong className="issue-checked">{issueDate(issue.lastChecked)}</strong>
      </aside>
    </div></header>
    <section className="issue-body wrap">
      <article className="issue-primary">
        <section className="issue-detail-section">
          <span className="issue-kicker">01 / THE STORY SO FAR</span>
          <h2>Why it matters here.</h2><p>{issue.whyItMatters}</p>
        </section>
        <section className="issue-detail-section">
          <span className="issue-kicker">02 / HOW IT PROGRESSES</span><h2>From first notice to outcome.</h2>
          <ol className="issue-process">
            {issue.stages.map((step,index) => <li key={step} className={index < issue.currentStage ? "passed" : index === issue.currentStage ? "here" : ""}>
              <span>{String(index+1).padStart(2,"0")}</span>
              <strong>{step}</strong>
              {index===issue.currentStage && <em>Current documented stage</em>}
            </li>)}
          </ol>
          <div className="issue-next"><strong>WHAT TO WATCH NEXT</strong><p>{issue.nextToWatch}</p></div>
          {issueActionIsActive(issue,today) && issue.action && <aside className="issue-participate">
            <strong>PARTICIPATION OPPORTUNITY · THROUGH {issueDate(issue.action.until).toUpperCase()}</strong>
            <h3>{issue.action.title}</h3><p>{issue.action.details}</p>
            <a href={issue.action.url} target="_blank" rel="noopener noreferrer">Check the official instructions ↗</a>
          </aside>}
        </section>
        <section className="issue-detail-section">
          <span className="issue-kicker">03 / THE EVIDENCE</span><h2>Documented, and still open.</h2>
          <div className="issue-evidence-grid"><div><h3>What we can verify</h3><ul>{issue.known.map(fact=><li key={fact}>{fact}</li>)}</ul></div>
          <div><h3>Questions we're following</h3><ul>{issue.openQuestions.map(question=><li key={question}>{question}</li>)}</ul></div></div>
        </section>
        <section className="issue-detail-section">
          <span className="issue-kicker">04 / RECORD OF DEVELOPMENTS</span><h2>Timeline.</h2>
          <ol className="issue-timeline">{issue.milestones.map((item,index)=><li key={item.date+item.label}>
            <div className="issue-timeline-date"><time dateTime={item.date}>{issueDate(item.date)}</time>
              <span className={item.state==="scheduled" ? "planned" : "recorded"}>{item.state==="scheduled" ? "Scheduled, not yet confirmed" : "Documented"}</span>
            </div>
            <div className="issue-timeline-text"><h3>{item.label}</h3><p>{item.detail}</p><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Original source ↗</a></div>
          </li>)}</ol>
        </section>
        <section className="issue-detail-section issue-revision-section">
          <span className="issue-kicker">05 / THE RESEARCH RECORD</span><h2>What changed in our account.</h2>
          <ol>{issue.revisions.map((entry,index)=><li key={entry.date+entry.kind+index}>
            <time dateTime={entry.date}>{issueDate(entry.date)}</time>
            <span>{entry.kind === "correction" ? "Correction" : entry.kind === "initial" ? "Initial record" : "Revised"}</span>
            <p>{entry.note}</p>
          </li>)}</ol>
        </section>
        <section className="issue-detail-section issue-source-section">
          <span className="issue-kicker">06 / VERIFY IT YOURSELF</span><h2>Public sources.</h2>
          <p>These links support the documented facts above. They do not establish a final outcome unless the linked record expressly says so.</p>
          <ol>{issue.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a><small>Checked {issueDate(source.checked)}</small></li>)}</ol>
        </section>
      </article>
      <aside className="issue-side-rail"><div className="issue-rail-sticky">
        <strong>THE CURRENT QUESTION</strong><p>{issue.nextToWatch}</p>
        <div className="issue-rail-rule"/>
        <strong>INDEPENDENT REPORTING</strong><p>We follow evidence from public records. An unresolved question is not a proven outcome.</p>
        <Link href="/issues">← All tracked issues</Link><Link href="/bigger-picture">The bigger picture ↗</Link>
      </div></aside>
    </section>
  </main></>;
}
