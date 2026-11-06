type CivicAction = {
  text: string;
  until: string;
  deadlineLabel: string;
};

type CivicStory = {
  id: string;
  title: string;
  sourceUrl: string;
  action?: CivicAction;
};

export default function CivicActions({ stories, today }: { stories: CivicStory[]; today: string }) {
  const opportunities = stories.filter(
    (story): story is CivicStory & { action: CivicAction } =>
      Boolean(story.action && story.action.until >= today)
  );
  if (!opportunities.length) return null;

  return <section className="civic-participation" aria-labelledby="participate-title" id="participate">
    <div className="wrap">
      <div className="civic-heading">
        <h2 id="participate-title">Have your say.</h2>
        <p>Verified, time-sensitive opportunities for residents to take part.</p>
      </div>
      <div className="civic-actions-grid">
        {opportunities.map(story => <article className="civic-action-card" key={story.id}>
          <p className="civic-action-deadline">{story.action.deadlineLabel}</p>
          <h3>{story.title}</h3>
          <p>{story.action.text}</p>
          <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">Official information <span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
    </div>
  </section>;
}
