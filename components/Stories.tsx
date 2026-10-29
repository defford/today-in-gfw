type Story = {
  id: string; date: string; updated?: string; topic: string; importance?: string;
  title: string; summary: string; why: string; source: string; sourceUrl: string;
  readTime?: string;
};
function validSource(url: string) {
  try { const u = new URL(url); return u.protocol === "https:" || u.protocol === "http:" ? u.href : null; }
  catch { return null; }
}
export default function Stories({ stories }: { stories: Story[] }) {
  return <div className="stories-grid" id="stories-grid">
    {stories.map((s, index) => <article id={s.id} key={s.id} className={`story-card ${index === 0 ? "feature" : ""}`}>
      
      <h3>{s.title}</h3><p className="story-summary">{s.summary}</p>
      {index === 0 && <div className="story-why"><b>WHY IT MATTERS</b><br />{s.why}</div>}
      <div className="story-bottom"><span>{s.source} · {s.date}</span>
        {validSource(s.sourceUrl) && <a className="story-link" href={validSource(s.sourceUrl)!} target="_blank" rel="noopener noreferrer" aria-label={`Read original source for ${s.title}`}>Original source ↗</a>}
      </div>
    </article>)}
  </div>;
}
