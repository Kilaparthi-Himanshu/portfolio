'use client';

/**
 * HorizontalSlideTransition
 *
 * Pins a two-panel horizontal strip (Experience | Contact) and scrolls it
 * left so Contact slides in from the right — a hard side-wipe between sections.
 *
 * Replace `<Experience /> <Contact />` in page.tsx with:
 *   <HorizontalSlideTransition />
 *
 * Internal pin budget:
 *   - 400% for Experience to do its own animations    (set in Experience.tsx)
 *   - 100% for the side-wipe travel                   (here)
 *   - 300% for Contact to do its own animations       (set in Contact.tsx)
 *
 * IMPORTANT: Remove the internal ScrollTrigger pins from Experience.tsx and
 * Contact.tsx (the ones that use `pin: true` on their own sectionRef).
 * This wrapper owns the pinning; the child timelines should use
 * `pin: false` and drive off the same trigger, or simply use
 * `paused: true` timelines that this wrapper .plays() at the right time.
 *
 * If you'd rather keep the individual section pins, use the simpler
 * `clipPath` approach in ClipWipeTransition.tsx (also provided).
 */

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSlideTransition() {
  const outerRef = useRef<HTMLDivElement>(null);  // pinned container
  const trackRef = useRef<HTMLDivElement>(null);  // 200vw horizontal strip

  useGSAP(() => {
    if (!outerRef.current || !trackRef.current) return;

    gsap.to(trackRef.current, {
      xPercent: -50,            // slide one full viewport width to the left
      ease: 'none',
      scrollTrigger: {
        trigger: outerRef.current,
        start: 'top top',
        end: '+=100%',          // 1 viewport of scroll = full wipe
        pin: true,
        scrub: 0.6,             // 0.6 s lag for a "weighty" feel
        invalidateOnRefresh: true,
      },
    });
  }, []);

  return (
    /* Outer: clips to one viewport width */
    <div ref={outerRef} className="relative w-full h-screen overflow-hidden">
      {/* Track: two panels side by side → total 200vw */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: '200vw' }}
      >
        {/* Panel A — Experience */}
        <div className="w-screen h-full shrink-0 overflow-hidden">
          <Experience />
        </div>

        {/* Panel B — Contact */}
        <div className="w-screen h-full shrink-0 overflow-hidden">
          <Contact />
        </div>
      </div>
    </div>
  );
}