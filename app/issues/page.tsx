import type { Metadata } from "next";
import Link from "next/link";
import JournalNav from "@/components/JournalNav";
import { civicIssues, civicIssueData, issueActionIsActive, issueDate, gfwLocalDate } from "@/lib/civic-issues";

export const metadata: Metadata = {
  title: "Issues we're following | Today in GFW",
  description: "Follow public decisions, proposals and developments affecting Grand Falls-Windsor, from first notice to documented outcome.",
  alternates: { canonical: "/issues" },
};
export const dynamic = "force-dynamic";

export default function CivicIssuesPage() {
  const today = gfwLocalDate();
  return <><JournalNav active="issues"/><main className="issue-page">
    <section className="issue-intro">
      <div className="wrap">
        <span className="issue-eyebrow">INDEPENDENT CIVIC TRACKER · GRAND FALLS-WINDSOR</span>
        <h1>The decisions <em>we're following.</em></h1>
        <p>Important stories don't end when a notice disappears. Follow what was proposed, what's documented, what remains undecided and what happens next.</p>
        <div className="issue-overview-line"><strong>{civicIssues.length} PUBLIC CASES</strong><span>Research edition: {issueDate(civicIssueData.edition)}</span></div>
      </div>
    </section>
    <section className="issue-archive">
      <div className="wrap">
        <div className="issue-archive-heading"><h2>On the record.</h2><p>Every case identifies its source and when it was last checked. A planned hearing or vote is not a completed outcome.</p></div>
        <div className="issue-card-grid">
        {civicIssues.map(issue => <article className="issue-list-card" key={issue.slug}>
          <div className="issue-list-meta"><span>{issue.theme}</span><span>{issue.location}</span></div>
          <span className="issue-stage-label">{issue.status}</span>
          <h3><Link href={`/issues/${issue.slug}`}>{issue.title}</Link></h3>
          <p>{issue.summary}</p>
          <div className="issue-stage-track" aria-label={`Stage: ${issue.stages[issue.currentStage]}`}>
            {issue.stages.map((label,index) => <span key={label} className={index < issue.currentStage ? "done" : index === issue.currentStage ? "current" : ""} title={label}/>)}
          </div>
          <p className="issue-current"><strong>Current step:</strong> {issue.stages[issue.currentStage]}</p>
          {issueActionIsActive(issue,today) && issue.action &&
            <div className="issue-action-indicator"><strong>Participation opportunity</strong><span>{issue.action.title} · through {issueDate(issue.action.until)}</span></div>}
          <div className="issue-list-footer"><span>Checked {issueDate(issue.lastChecked)}</span><Link href={`/issues/${issue.slug}`}>See the record ↗</Link></div>
        </article>)}
        </div>
      </div>
    </section>
    <section className="issue-method"><div className="wrap">
      <h2>What this tracker can—and can't—tell you.</h2>
      <p>We separate documented developments from interpretation and unresolved questions. Dates labelled <strong>scheduled</strong> indicate plans, not proof that an event occurred. Stage labels describe our latest verified understanding, not an official legal determination.</p>
      <p>{civicIssueData.editorialNote} Today in GFW is independently published and is not affiliated with the Town of Grand Falls-Windsor.</p>
      <Link href="/bigger-picture">Explore longer research essays ↗</Link>
    </div></section>
  </main></>;
}
