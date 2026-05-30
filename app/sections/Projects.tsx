"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { withMedia } from "@/lib/gsapMedia";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

export default function NoteToGo() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cleanup = withMedia(({ isMobile, isTablet, isDesktop }) => {
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onRefresh(self) {
            const spacer = self.pin?.parentElement;

            spacer?.style.setProperty("pointer-events", "none");
            (self.pin as HTMLElement | null)?.style.setProperty(
              "pointer-events",
              "auto"
            );
          },
        },
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          markers: true,
          scrub: true,
          toggleActions: "play none none reverse"
        }
      });

      tl2.from(".left-section", {
        scaleX: 0,
      });

      tl2.from(".right-section", {
        scaleX: 0,
      }, "<");

      tl2.from(".left-red-section", {
        scaleX: 0,
      }, ">");

      tl2.from(".right-red-section", {
        scaleX: 0,
      }, "<");
    });

    return () => cleanup();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden text-white"
      style={{ transform: 'translateY(100%)' }}
    >
      <div className="project project-1 absolute inset-0 flex z-1">
        <div className="left-curtain flex-1 bg-purple-800 origin-left">

        </div>

        <div className="right-curtain flex-1 bg-purple-900 origin-right">

        </div>
      </div>

      <div className="project project-2 absolute inset-0 flex z-2">
        <div className="left-curtain flex-1 bg-red-800 origin-left">

        </div>

        <div className="right-curtain flex-1 bg-red-900 origin-right">

        </div>
      </div>
    </section>
  );
}
