import EventCalendar from "@/components/EventCalendar";
import Stories from "@/components/Stories";
import storiesData from "@/data/stories.json";
import eventsData from "@/data/events.json";

// Server-render the local calendar date to avoid client/server hydration differences.
export const dynamic = "force-dynamic";
function gfwToday() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/St_Johns", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const p = Object.fromEntries(parts.map(item => [item.type, item.value]));
  return `${p.year}-${p.month}-${p.day}`;
}
export default function Page() {
  const today = gfwToday();
  const fullToday = new Intl.DateTimeFormat("en-CA", {timeZone: "UTC", weekday: "long", month: "long", day: "numeric", year: "numeric"}).format(new Date(`${today}T12:00:00Z`));
  return <>

  <div className="topline"><div className="wrap top-inner"><span className="topdot"></span><span id="topline-date">{fullToday}</span><span className="top-divider">/</span><span>Grand Falls-Windsor, Newfoundland & Labrador</span><span className="top-right">An independent community briefing</span></div></div>
  <header className="header"><div className="wrap nav">
    <a className="brand" href="#home" aria-label="Today in GFW home"><img className="brand-emblem" src="/assets/river-mark.svg" alt="" width="42" height="42"/><span className="brand-lockup"><span className="brand-word">TODAY <em>IN</em> GFW<span className="brand-period">.</span></span><span className="brand-subline">AN INDEPENDENT GFW BRIEFING</span></span></a>
    <nav className="nav-links" aria-label="Main navigation"><a href="#stories">The briefing</a><a href="#events">What's on</a><a href="/bigger-picture">The bigger picture</a><a href="#about">About</a></nav>
    <a className="header-cta" href="https://www.facebook.com/groups/1465414595688357/" target="_blank" rel="noopener noreferrer">Share an event <span aria-hidden="true">↗</span></a>
  </div></header>
  <main id="home">
    <section className="hero"><div className="wrap hero-layout">
      <div className="hero-main">
        <h1>A little more<br/><i>connected.</i><br/>Every day.</h1>
        <p className="hero-deck">A daily guide to what matters, what’s happening, and the people and places shaping Grand Falls-Windsor.</p>
        <div className="hero-actions"><a href="#stories" className="btn btn-cream">Read today's briefing <span>↗</span></a><a href="#events" className="hero-text-link">Find an event <span>↗</span></a></div>
      </div>
      <aside className="hero-aside">
        <figure className="hero-landmark">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Harmsworth_Hall_2.jpg/1280px-Harmsworth_Hall_2.jpg" alt="Harmsworth Hall, the brick town hall on High Street in Grand Falls-Windsor" width="1280" height="683" loading="eager"/>
          <figcaption><strong>Harmsworth Hall</strong><small>HIGH STREET · GRAND FALLS-WINDSOR · PHOTO 2016</small></figcaption>
        </figure>
        <div className="aside-copy"><div className="aside-top"><span className="label-gold">LATEST STORIES</span></div>
          <div className="pulse-rule"></div>
          {storiesData.stories
            .filter((story) => !("expiresOn" in story) || String(story.expiresOn) >= today)
            .sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date))
            .slice(0, 3)
            .map((story) => <a href={`#${story.id}`} className="pulse-item" key={story.id}>
              <span className="pulse-index" aria-hidden="true">↗</span><div><b>{story.title}</b></div>
            </a>)}
        </div>
      </aside>
    </div></section>
    <section className="place-identity" aria-label="Our place and our point of view"><div className="wrap place-identity-inner">
      <div className="identity-graphic"><img src="/assets/river-mark.svg" alt="" width="64" height="64"/><span>RIVER<br/>ROOTED.</span></div>
      <p><strong>One town. A shared story.</strong><br/>From our streets and parks to our local businesses and community spaces, this is Grand Falls-Windsor.</p>
      <a href="/bigger-picture">Meet the bigger picture <span aria-hidden="true">↗</span></a>
    </div></section>
    {today === "2026-10-28" && <section className="notice-banner"><div className="wrap notice-inner"><div className="notice-tag"><span className="notice-dot"></span> TODAY'S DEADLINE</div><p><strong>Scott Avenue housing consultation closes October 28.</strong> Residents can submit written comments to the Town's Development Department.</p><a href="https://grandfallswindsor.com/discretionary-use-application-scott-avenue/" target="_blank" rel="noopener noreferrer" className="notice-link">Official notice ↗</a></div></section>}
    <section id="stories" className="section stories-section"><div className="wrap">
      
      <div className="section-title-row"><h2>The day's <em>headlines.</em></h2></div>
      <Stories stories={storiesData.stories} />
      <div className="story-source-note">Every story links to its original public source. <span>Analysis is clearly separated from the underlying facts.</span></div>
    </div></section>
    <section id="events" className="section events-section"><div className="wrap">
      
      <div className="section-title-row event-heading"><h2>What's <em>on.</em></h2></div>
      <EventCalendar events={eventsData.events.filter((event) => event.town === "Grand Falls-Windsor")} asOf={eventsData.asOf} today={today} />
      <div className="event-footer"><div><b>Know something we missed?</b><p>Our event listings begin with the community-maintained Exploits Events Registry. Share additions or corrections with the Facebook group.</p></div><a className="btn btn-outline" href="https://www.facebook.com/groups/1465414595688357/" target="_blank" rel="noopener noreferrer">Post an event <span>↗</span></a></div>
    </div></section>
    <section id="context" className="section context-section"><div className="wrap context-layout"><div className="context-head"><div className="context-marker"><img src="/assets/riverside-rule.svg" alt="" width="160" height="24"/></div><h2>More than<br/>the <em>headlines.</em></h2><a className="context-blog-link" href="/bigger-picture">Explore the research journal <span>↗</span></a></div><div className="context-cards"><a className="context-card" href="/bigger-picture/housing-proposals-to-homes"><h3>From planned homes<br/>to lived-in homes</h3><p>Housing proposals are promising. Real success means completed units, connected neighbourhoods, dependable services and families who can afford to stay.</p><b>Read the research ↗</b></a><a className="context-card" href="/bigger-picture/regional-work-local-livelihoods"><h3>Turning regional work<br/>into local livelihoods</h3><p>Mining and infrastructure bring demand to Central NL. The test is whether that becomes locally owned services, skilled jobs and lasting wealth.</p><b>Read the research ↗</b></a><a className="context-card" href="/bigger-picture/gathering-place"><h3>A gathering place<br/>for our town</h3><p>Our strength may be the network of people, institutions and gathering places throughout Grand Falls-Windsor.</p><b>Read the research ↗</b></a></div></div></section>
    <section id="about" className="section about-section"><div className="wrap about-layout"><div><h2>Less noise.<br/><em>More town.</em></h2></div><div className="about-copy"><p><strong>Today in GFW</strong> is a community-first experiment in making local information easier to find and understand. It combines verified public notices and reporting with events compiled from the Exploits Events Registry, which draws heavily from the local community events group.</p><p>Town decisions are reported factually. Community listings are attributed and may change. We aim to make it easier for people to show up, get involved and make informed decisions. <strong>We are independently published and are not operated by or affiliated with the Town of Grand Falls-Windsor.</strong></p><div className="standards"><span>OUR PROMISE</span><span>Sources first</span><span>Correct mistakes</span><span>Community-wide</span></div><p className="freshness">Stories and events are dated snapshots, not a live automatic feed. Check organizers for changes.</p>
          <p className="photo-credit">Photography: <a href="https://commons.wikimedia.org/wiki/File:Harmsworth_Hall_2.jpg" target="_blank" rel="noopener noreferrer">Highstreet5, “Harmsworth Hall 2”</a> (2016), <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>; image displayed cropped to fit. River graphics and Today in GFW emblem are original. <a href="/credits" target="_blank">Asset details ↗</a></p></div></div></section>
  </main>
  <footer className="footer"><div className="wrap footer-inner"><div className="footer-brand"><img src="/assets/river-mark.svg" alt="" width="40" height="40"/><div>TODAY <em>IN</em> GFW<span>.</span><small>For the place we call home.</small></div></div><div className="footer-links"><a href="#stories">The briefing</a><a href="#events">Events</a><a href="/bigger-picture">Research journal</a><a href="#about">Editorial standards</a><a href="https://www.facebook.com/groups/1465414595688357/" target="_blank" rel="noopener noreferrer">Community group ↗</a></div><div className="footer-end">GRAND FALLS-WINDSOR · NEWFOUNDLAND & LABRADOR<br/><span>© 2026 Today in GFW · Independent publication</span></div></div></footer>
  </>;
}
