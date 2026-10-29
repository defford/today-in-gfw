import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Identity & image credits · Today in GFW",
  description: "The sources, licensing and design approach behind the independent Today in GFW visual identity.",
};

export default function Credits() {
  return <main className="credit-page">
    <div className="wrap credit-layout">
      <a href="/" className="credit-back">← Back to Today in GFW</a>
      <div className="small-eyebrow">VISUAL IDENTITY & CREDITS</div>
      <h1>Made for <em>Grand Falls-Windsor.</em></h1>
      <p className="credit-intro">Today in GFW is an independent community publication. Its visual identity is rooted in the area's river, natural landscape, built heritage and shared community life. It is not the official Town of Grand Falls-Windsor website and is not municipally sponsored.</p>
      <section className="credit-section">
        <h2>Visual design</h2>
        <p>Our original three-current river emblem and flowing contour pattern represent the Exploits River, a defining part of Grand Falls-Windsor's history and landscape. A deep evergreen/river-teal palette combines with the warm orange and pale cream seen throughout the town's built and natural landscape. We have not copied or embedded the Town's official logo.</p>
        <p>For comparison, the Town's longstanding <a href="https://grandfallswindsor.com/" target="_blank" rel="noopener noreferrer">“Perfectly Centered”</a> identity uses the tree and houses logo adopted in 2011. <a href="https://www.crwflags.com/Fotw/Flags/ca-nlgfw.html" target="_blank" rel="noopener noreferrer">Information on the municipal mark's symbolism</a> is published by Flags of the World, quoting the Town's communications officer.</p>
      </section>
      <section className="credit-section">
        <h2>Photograph</h2>
        <div className="credit-photo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Harmsworth_Hall_2.jpg/1280px-Harmsworth_Hall_2.jpg" alt="Harmsworth Hall on High Street" width="1280" height="683" loading="lazy" /></div>
        <p><strong>“Harmsworth Hall 2”</strong>, photographed September 13, 2016 by <a href="https://commons.wikimedia.org/wiki/User:Highstreet5" target="_blank" rel="noopener noreferrer">Highstreet5</a>. Source: <a href="https://commons.wikimedia.org/wiki/File:Harmsworth_Hall_2.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>. License: <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-ShareAlike 4.0 International</a>. The image is displayed with a responsive crop and subtle color treatment; its underlying file is unchanged. The photograph is not a current event photo.</p>
      </section>
      <section className="credit-section">
        <h2>Place references</h2>
        <p>The local identity and site copy draw on the Town's <a href="https://grandfallswindsor.com/" target="_blank" rel="noopener noreferrer">official website</a>, <a href="https://exploreexploits.ca/towns-communities/grand-falls-windsor/" target="_blank" rel="noopener noreferrer">Explore Exploits</a> and the <a href="https://heritagenl.ca/heritage-property/harmsworth-hall-registered-heritage-structure/" target="_blank" rel="noopener noreferrer">Heritage Foundation of Newfoundland and Labrador</a>.</p>
        <p>Original graphics, river mark, site favicon and social sharing artwork are custom assets of Today in GFW. These original assets are separate from the licensed photograph.</p>
      </section>
      <a href="/" className="btn btn-cream">Return to the briefing ↗</a>
    </div>
  </main>
}
