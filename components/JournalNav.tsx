import Link from "next/link";
export default function JournalNav(){
 return <><div className="journal-topline"><div className="wrap"><span>AN INDEPENDENT CIVIC JOURNAL</span><span>GRAND FALLS-WINDSOR · NEWFOUNDLAND & LABRADOR</span></div></div>
 <header className="journal-nav"><div className="wrap journal-nav-inside">
   <Link className="journal-logo" href="/"><img src="/assets/river-mark.svg" width="38" height="38" alt=""/><span>TODAY <em>IN</em> GFW<b>.</b></span></Link>
   <nav aria-label="Journal navigation"><Link href="/">Today's briefing</Link><Link href="/bigger-picture" aria-current="page">The bigger picture</Link><Link href="/#events">Events</Link></nav>
   <Link className="journal-nav-home" href="/">Back to today <span>↗</span></Link>
 </div></header></>
}
