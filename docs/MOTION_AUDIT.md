# TERAZ (طراز) — Full-Site Motion & Interactivity Audit

## 1. Executive Summary & Audit Scope
This audit catalogs the motion, animation, and interactivity status across all **18 public routes** and global components of the **TERAZ (طراز)** luxury furniture and kitchens platform. The objective is to elevate the entire digital experience to an international "quiet luxury" standard (espresso `#1C1512`, warm cream `#EDE3D3`/`#F7F2EA`, brushed brass gold `#B38B54`/`#D9B97E`, taupe `#8A7762`), maintaining a 60fps framerate, full Arabic (RTL) fidelity, and zero layout shift or LCP degradation.

---

## 2. Route-by-Route Motion Status & Planned Treatments

| Route | Current Status | Deficiencies / Gaps | Planned Motion Treatment | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **`/` (Home)** | Partial motion (`Reveal`, `PinnedStory`, `HorizontalScroll`, `BeforeAfter`) | Hero lack scrub parallax; Intro lacks scrubbed text fill; Process lacks animated vertical gold line; Testimonials static grid; CTA banner lacks parallax. | • Parallax hero background + word-masked headline<br>• Scrubbed text highlight (taupe → espresso)<br>• Vertical gold LineDraw on process timeline<br>• TiltCards on horizontal project gallery<br>• Auto-demo sweep on Before/After<br>• Animated section hairlines & room shifts | **P0** |
| **`/categories`** | Static grid, simple CSS hover scale | No page entrance choreography, no staggered card reveal, static badges. | • SplitText hero heading with word-reveal<br>• Staggered grid entrance (`RevealStagger`)<br>• ImageReveal with architectural clip-path<br>• Animated hover lift with gold hairline border | **P1** |
| **`/categories/[slug]`** | Static banner and basic filter tabs | Cover image lacks depth/parallax; tab switching lacks animated layout indicator; product cards pop in abruptly. | • Parallax header banner with soft zoom<br>• Animated tab pill indicator (Framer Motion `layoutId`)<br>• Staggered product cards with Reveal and TiltCard | **P1** |
| **`/products`** | Static grid with standard filter | Filter tabs snap without layout animation; products pop without entrance choreography; hover lacks luxury feel. | • SplitText header<br>• Framer Motion `layout` filter transitions<br>• Staggered card reveals with ImageReveal<br>• Floating quote bar interaction | **P1** |
| **`/products/[slug]`** | Static gallery thumbnails, plain specs list | Image change lacks smooth crossfade/zoom; specs list is a flat table; related products grid is static. | • Smooth thumbnail gallery crossfade + zoom transition<br>• Sticky desktop summary panel<br>• Staggered specs rows with checkmark draw<br>• Related products horizontal swipe carousel<br>• Mobile sticky bottom contact bar | **P0** |
| **`/projects`** | Basic grid with simple hover | Filter buttons snap; cards pop in without stagger; no interactive cursor cues. | • SplitText title<br>• Framer Motion `layout` grid with stagger<br>• ImageReveal clip unmasking<br>• Custom cursor data-attribute (`data-cursor="view"`) | **P1** |
| **`/projects/[slug]`** | Single main image, basic text | Project imagery lacks cinematic gallery presentation; missing lightbox; before/after (if present) lacks auto-demo. | • Parallax hero image<br>• Architectural image gallery with smooth lightbox<br>• Before/After comparison with viewport sweep<br>• Staggered project metadata specs | **P1** |
| **`/configurator`** | Basic tab selections, static preview swap | Finish changes snap without crossfade; preview lacks 3D shadow lift; quote summary card static. | • Smooth crossfade on kitchen finish transitions<br>• Swatch hover scale with micro-tooltip<br>• Animated price-free summary card<br>• Magnetic CTA with glowing gold pulse | **P1** |
| **`/materials`** | Tab filter with basic grid cards | Swatches lack tactile zoom/inspection feel; tab switching lacks animation; cards enter statically. | • Staggered swatch grid entrance<br>• Hover magnify lens with tactile tooltip<br>• Smooth filter tab layout animations | **P1** |
| **`/about`** | Static text and standard image | Large narrative lack scroll-linked highlights; craft image lacks clip reveal; values cards enter statically. | • Parallax workshop craft image with clip reveal<br>• Staggered values cards with animated gold indices (01-03)<br>• Animated counter statistics<br>• Gold line dividers drawing on scroll | **P1** |
| **`/services`** | 4-card grid, static icons | Service cards lack staggered entrance; checkmarks are static; icons lack hover rotation/glow. | • Staggered entrance for all 4 services<br>• Micro-interaction on service icons (gold glow/hover lift)<br>• Checkmark reveal animation<br>• Magnetic quote action buttons | **P1** |
| **`/faq`** | Basic accordion with abrupt toggle | Accordion height transition could be smoother; no staggered entrance on items. | • Fluid accordion open/collapse (height + opacity)<br>• Smooth Chevron 180° rotation with spring easing<br>• Staggered entry for FAQ questions | **P2** |
| **`/contact`** | Basic form fields | Form inputs lack focused state animations; submit lacks button loading/shake feedback; info cards static. | • Staggered entrance for contact cards<br>• Magnetic WhatsApp & Phone buttons<br>• Form validation shake on error<br>• Smooth success state checkmark animation | **P1** |
| **`/quote`** | Multi-step wizard with standard step swap | Step transitions lack directional slide animations; option cards lack tactile select feedback. | • Directional slide transitions between steps (Framer Motion AnimatePresence)<br>• Progress bar gold fill animation<br>• Selected service/material card gold pulse<br>• Form validation shake & celebration checkmark | **P0** |
| **`/privacy`** | Plain typography | Flat layout, no motion. | • Lightweight SplitText title reveal<br>• Gold hairline progress line<br>• Gentle content fade | **P3** |
| **`/terms`** | Plain typography | Flat layout, no motion. | • Lightweight SplitText title reveal<br>• Gold hairline progress line<br>• Gentle content fade | **P3** |
| **`404` (not-found)** | Static 404 text and links | Standard error page without brand delight. | • Branded logo arc SVG drawing animation<br>• Floating modern armchair illustration with subtle bobbing<br>• Magnetic home return button | **P2** |

---

## 3. Global Interactivity & Navigation Audit

| Component | Current State | Deficiencies | Planned Upgrade |
| :--- | :--- | :--- | :--- |
| **`Header`** | Fixed transparent / blurred bar | Does not hide on scroll-down and reveal on scroll-up; mega-menu lacks staggered preview animations. | • Smart scroll behavior (hide on scroll down, reveal on scroll up)<br>• Integrated gold `ScrollProgress` bar at bottom of header<br>• Staggered image previews inside the mega-menu<br>• Full-screen mobile menu with staggered link entrance |
| **`CustomCursor`** | Basic dot with view variant | Limited interactive triggers; needs better spring physics and explicit `data-cursor` bindings. | • Calibrated spring physics (`stiffness: 600, damping: 30`)<br>• Support for `view`, `drag`, `magnetic`, and `link` states<br>• Hidden on touch devices and reduced-motion |
| **`FloatingActions`** | Fixed WhatsApp / Phone pill | Always visible in same position, competing with bottom content. | • Smart scroll hide/show reacting to scroll direction<br>• Magnetic hover pull<br>• Micro-pulse on gold icon |
| **`Footer`** | Standard static footer | Links enter without stagger; back-to-top is a simple button without scroll progress. | • Staggered links reveal on scroll<br>• Back-to-top button with circular SVG scroll progress ring<br>• Elegant gold brand wordmark slide |
| **`PageTransition`** | None | Page routes switch instantaneously with potential flash. | • Global curtain/clip wipe in espresso (`#1C1512`) with gold logo mark (duration ≤ 650ms)<br>• Scroll reset to top with `ScrollTrigger.refresh()` |

---

## 4. Performance & RTL Compatibility Guidelines
1. **RTL Compliance**: All horizontal scrolls, carousels, slide-ins, and arrows mirror accurately when `language === "ar"`.
2. **Typography Protection**: `SplitText` splits Arabic by words only to protect ligatures and letter joins.
3. **GPU-Only Animation**: Exclusively animate `transform`, `opacity`, and `clip-path` to maintain 60fps on mobile.
4. **LCP Safety**: Above-the-fold hero content flagged with `priority={true}` renders synchronously without delaying initial paint.
5. **Reduced Motion**: Full fallback to zero-animation static layout when `prefers-reduced-motion: reduce` is detected.
