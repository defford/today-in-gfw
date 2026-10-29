"use client";

import { Fragment, useMemo, useState } from "react";

export type RegistryEvent = {
  id: string; title: string; dates: string[]; multiday: { start: string; end: string } | null;
  weekday: number | null; time: string | null; venue: string | null; town: string;
  price: string | null; category: string; recurring: boolean; recurrenceDetail?: string | null;
  sourceUrl: string | null; sourceType?: string; lastVerified?: string; notes?: string | null;
};
type Occurrence = RegistryEvent & { date: string; ongoing?: boolean };
type Period = "today" | "7" | "30";
const DAY = 86_400_000;
const asNoon = (iso: string) => new Date(`${iso}T12:00:00Z`);
const addDays = (iso: string, n: number) => new Date(asNoon(iso).getTime() + n * DAY).toISOString().slice(0, 10);
const weekday = (iso: string) => asNoon(iso).getUTCDay();
const prettyDay = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" }).format(asNoon(iso));
const month = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "UTC", month: "short" }).format(asNoon(iso)).toUpperCase();
function safeUrl(s: string | null) {
  try { if (!s) return null; const u = new URL(s); return ["http:", "https:"].includes(u.protocol) ? u.href : null; }
  catch { return null; }
}
function categorize(e: Occurrence, v: string) {
  if (v === "all") return true;
  const cat = (e.category || "").toLowerCase(), title = e.title.toLowerCase(), both = `${cat} ${title}`;
  if (v === "music") return /music|karaoke|concert/.test(both) || /trivia|pub|dance|dj|wing night/.test(title);
  if (v === "family") return /family|kids|children|storytime|trunk or treat|slime|skating|game day|haunted trail/.test(both);
  if (v === "arts") return /arts|craft|gallery|painting|clay|slime/.test(both);
  if (v === "markets") return /market|fair|sale/.test(both);
  if (v === "community") return /community|halloween/.test(cat);
  return true;
}
function sortTime(s: string | null) {
  if (!s) return 9999;
  const m = s.match(/(?:^|\s)(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (!m) return 8000;
  let h = Number(m[1]) % 12;
  if (m[3].toLowerCase() === "pm") h += 12;
  return h * 60 + Number(m[2] || 0);
}
function expand(e: RegistryEvent, base: string): Occurrence[] {
  const result: Occurrence[] = [], max = addDays(base, 31);
  if (Array.isArray(e.dates)) for (const d of e.dates) if (d >= base && d <= max) result.push({ ...e, date: d });
  if (e.multiday?.start && e.multiday?.end) {
    let d = e.multiday.start > base ? e.multiday.start : base;
    for (let i = 0; i < 32 && d <= e.multiday.end && d <= max; i++, d = addDays(d, 1)) result.push({ ...e, date: d, ongoing: d !== e.multiday.start });
  }
  if (Number.isInteger(e.weekday) && e.weekday !== null && e.weekday >= 0 && e.weekday <= 6) {
    // Registry weekdays use Monday=0 while JavaScript starts Sunday=0.
    const day = (e.weekday + 1) % 7;
    for (let i = 0; i < 31; i++) {
      const d = addDays(base, i);
      if (weekday(d) === day) result.push({ ...e, date: d });
    }
  }
  // Prevent duplicate entries where explicit dates overlap a multi-day schedule.
  return [...new Map(result.map(o => [o.date, o])).values()];
}
function EventRow({ event: e }: { event: Occurrence }) {
  const source = safeUrl(e.sourceUrl);
  const price = e.price?.trim();
  const isFree = /^free$/i.test(price ?? "");
  return <article className="event-row">
    <div className="event-day"><span>{month(e.date)}</span><strong>{e.date.slice(8)}</strong></div>
    <div className="event-info">
      <div className="event-meta">{e.recurring ? "WEEKLY" : e.ongoing ? "FESTIVAL" : (e.category || "EVENT").toUpperCase()} <span className="town-mini">· {e.town}</span></div>
      <h3 className="event-title">{e.title}</h3>
      <p className="event-description">{e.time || "Time to be confirmed"}{e.recurring ? " · Repeats weekly" : ""}{e.ongoing ? " · Festival continues" : ""}</p>
    </div>
    <div className="event-place"><b>{e.venue || "Venue to be confirmed"}</b><span>{e.town}</span></div>
    <div className="event-side">
      {price && <span className={isFree ? "price-free" : "price-paid"}>{isFree ? "FREE" : price}</span>}
      {source ? <a className="event-source" href={source} target="_blank" rel="noopener noreferrer" aria-label={`View source post for ${e.title}`}>Source post ↗</a> : <span className="event-source" style={{ textDecoration: "none", color: "#96a19a" }} title="No public link in the supplied registry">Registry entry</span>}
    </div>
  </article>;
}
export default function EventCalendar({ events, asOf, today }: { events: RegistryEvent[]; asOf: string; today: string }) {
  const [period, setPeriod] = useState<Period>("7");
  const [town, setTown] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const entries = useMemo(() => {
    const cutoff = addDays(today, period === "today" ? 0 : Number(period) - 1);
    return events.flatMap(e => expand(e, today))
      .filter(e => e.date <= cutoff && (town === "all" || e.town === town) && categorize(e, category))
      .filter(e => !search.trim() || `${e.title} ${e.venue} ${e.town} ${e.notes || ""}`.toLowerCase().includes(search.toLowerCase().trim()))
      .sort((a, b) => a.date.localeCompare(b.date) || sortTime(a.time) - sortTime(b.time) || a.title.localeCompare(b.title));
  }, [events, today, period, town, category, search]);
  const reset = () => { setPeriod("7"); setTown("all"); setCategory("all"); setSearch(""); };
  let prev = "";
  return <>
    <div className="event-toolbar"><div className="tabs" role="group" aria-label="When">
      {([ ["today", "Today"], ["7", "Next 7 days"], ["30", "Next 30 days"] ] as const).map(([v, label]) => <button key={v} type="button" className={`tab ${period === v ? "active" : ""}`} onClick={() => setPeriod(v)} aria-pressed={period === v}>{label}</button>)}
    </div><label className="search-box"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search events" placeholder="Search events or places…" value={search} onChange={e => setSearch(e.target.value)} /></label></div>
    <div className="filter-row"><label className="filter-label" htmlFor="town-filter">LOCATION</label><select id="town-filter" value={town} onChange={e => setTown(e.target.value)}><option value="all">All communities</option>{["Grand Falls-Windsor", "Bishop's Falls", "Botwood", "Norris Arm", "Gander"].map(t => <option key={t} value={t}>{t === "Gander" ? "Nearby: Gander" : t}</option>)}</select><label className="filter-label" htmlFor="category-filter">INTEREST</label><select id="category-filter" value={category} onChange={e => setCategory(e.target.value)}><option value="all">Everything</option><option value="music">Music & nights out</option><option value="family">Family & kids</option><option value="arts">Arts & creativity</option><option value="markets">Markets & fairs</option><option value="community">Community</option></select><span className="event-count" aria-live="polite">{entries.length} {entries.length === 1 ? "listing" : "listings"}</span></div>
    <div className="event-list" id="event-list">
      {entries.length === 0 && <div className="empty-state"><h3>Nothing listed here just yet.</h3><p>Try a wider date range, another community or a different interest. Events are continually being collected from around the valley.</p><button type="button" onClick={reset}>Reset event filters</button></div>}
      {entries.map(e => {
        const isNew = e.date !== prev;
        prev = e.date;
        return <Fragment key={`${e.id}-${e.date}`}>
          {isNew && <div className="event-group-header"><span>{prettyDay(e.date)}</span><span>{e.date === today ? "TODAY" : e.date === addDays(today, 1) ? "TOMORROW" : ""}</span></div>}
          <EventRow event={e} />
        </Fragment>;
      })}
    </div>
    {today > asOf && <p className="freshness">Calendar source last reviewed <strong>{asOf}</strong>. This edition is not updated live; check organizers before attending.</p>}
  </>;
}
