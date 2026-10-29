import type { Article } from "@/lib/perspectives";

export function ArticleArt({kind,detail=false}: {kind:Article["graphic"];detail?:boolean}) {
  return <div className={`journal-art journal-art--${kind} ${detail?"journal-art--detail":""}`} aria-hidden="true">
    <span className="art-noise"/>
    {kind==="heritage" && <><div className="art-heritage-lines"><i/><i/><i/><i/><i/></div><span className="art-emblem">G<span>↔</span>W</span><span className="art-caption">1909 · 1938 · 1991</span></>}
    {kind==="housing" && <><div className="art-homes"><i/><i/><i/><i/><i/><i/><i/></div><span className="art-sun"/><span className="art-caption">PLACES TO LIVE</span></>}
    {kind==="economy" && <><div className="art-network"><i/><i/><i/><i/><i/><i/><i/></div><span className="art-caption">BUILD CAPACITY · KEEP VALUE</span></>}
    {kind==="culture" && <><div className="art-circle r1"/><div className="art-circle r2"/><div className="art-circle r3"/><div className="art-circle r4"/><div className="art-center">✳</div><span className="art-caption">TOGETHER, ACROSS THE VALLEY</span></>}
    {kind==="river" && <><div className="art-river"><i/><i/><i/><i/></div><span className="art-cross">✳</span><span className="art-caption">THE EXPLOITS RIVER</span></>}
  </div>;
}
