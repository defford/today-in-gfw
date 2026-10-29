/**
 * Read-only editorial data checks. These are structural guardrails, not a
 * substitute for verifying facts, sources, licenses or editorial judgment.
 */
import { readFileSync } from 'node:fs';

const load = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const isISODate = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
const isSourceURL = (value) => {
  if (!nonempty(value)) return false;
  try { const u = new URL(value); return u.protocol === 'https:' && Boolean(u.hostname); } catch { return false; }
};
const unique = (values, label) => check(values.length === new Set(values).size, `${label} must be unique`);

const journal = load('data/perspectives.json');
const stories = load('data/stories.json');
const registry = load('data/events.json');

check(Array.isArray(journal.posts), 'perspectives.posts must be an array');
const posts = Array.isArray(journal.posts) ? journal.posts : [];
unique(posts.map(p => p.slug), 'Journal slugs');
const slugs = new Set(posts.map(p => p.slug));
for (const p of posts) {
  const id = `Essay ${p.slug ?? '(missing slug)'}`;
  check(typeof p.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug), `${id}: invalid slug`);
  for (const key of ['title', 'dek', 'thesis', 'category']) check(nonempty(p[key]), `${id}: missing ${key}`);
  check(isISODate(p.date) && isISODate(p.updated), `${id}: invalid publication/update date`);
  if (isISODate(p.date) && isISODate(p.updated)) check(p.updated >= p.date, `${id}: update before publication`);
  check(Array.isArray(p.sections) && p.sections.length > 0, `${id}: no narrative sections`);
  for (const section of p.sections ?? []) {
    check(nonempty(section.heading), `${id}: missing section heading`);
    check(Array.isArray(section.body) && section.body.every(nonempty), `${id}: invalid section body`);
  }
  check(Array.isArray(p.sources) && p.sources.length >= 2, `${id}: fewer than two public sources`);
  for (const source of p.sources ?? []) check(nonempty(source.label) && isSourceURL(source.url), `${id}: invalid source attribution or URL`);
  for (const slug of p.related ?? []) check(slugs.has(slug) && slug !== p.slug, `${id}: broken related-essay reference ${slug}`);
  check(Array.isArray(p.log) && p.log.some(l => l.date === p.updated && nonempty(l.note)), `${id}: updated date needs a log entry`);
}

check(Array.isArray(stories.stories), 'stories.stories must be an array');
const news = Array.isArray(stories.stories) ? stories.stories : [];
unique(news.map(s => s.id), 'Story IDs');
for (const s of news) {
  check(nonempty(s.id) && nonempty(s.title) && nonempty(s.summary), `Story ${s.id}: missing text`);
  check(isISODate(s.date) && isISODate(s.updated), `Story ${s.id}: invalid date`);
  check(nonempty(s.source) && isSourceURL(s.sourceUrl), `Story ${s.id}: missing source`);
}

check(Array.isArray(registry.events), 'events.events must be an array');
const events = Array.isArray(registry.events) ? registry.events : [];
unique(events.map(e => e.id), 'Event IDs');
for (const e of events) {
  check(nonempty(e.id) && nonempty(e.title) && nonempty(e.town), `Event ${e.id}: missing identifying text`);
  check(Array.isArray(e.dates) && e.dates.every(isISODate), `Event ${e.id}: invalid event dates`);
  check(e.multiday === null || (isISODate(e.multiday?.start) && isISODate(e.multiday?.end) && e.multiday.start <= e.multiday.end), `Event ${e.id}: invalid multi-day range`);
  check(e.weekday === null || (Number.isInteger(e.weekday) && e.weekday >= 0 && e.weekday <= 6), `Event ${e.id}: invalid weekday`);
  check(Boolean(e.dates?.length) || Boolean(e.multiday) || Number.isInteger(e.weekday), `Event ${e.id}: undated and not recurring`);
  if (e.sourceUrl !== null) check(isSourceURL(e.sourceUrl), `Event ${e.id}: invalid source URL`);
}

if (errors.length) {
  console.error(`Editorial content validation failed (${errors.length}):\n` + errors.map(e => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`Content structure validated: ${posts.length} essays, ${news.length} stories, ${events.length} events.`);
console.log('Note: human/editorial fact checking and source rights checks remain mandatory.');
