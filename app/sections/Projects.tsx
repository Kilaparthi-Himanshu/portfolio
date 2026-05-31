"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { withMedia } from "@/lib/gsapMedia";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

export default function NoteToGo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinActiveRef = useRef(false);

  useGSAP(() => {
    const cleanup = withMedia(({ isMobile, isTablet, isDesktop }) => {
      gsap.defaults({ duration: 1, ease: "power4.inOut" });

      const slides: HTMLElement[] = gsap.utils.toArray(".project", sectionRef.current);

      let currentIndex = 0;
      let isAnimating = false;

      // All slides sit stacked; assign permanent z-indices so higher
      // projects always render above lower ones when revealed.
      slides.forEach((slide, i) => {
        gsap.set(slide, { zIndex: i + 1 }); // project-1 = z1, project-2 = z2 …
      });

      // Project-1 is the always-visible base: curtains open (scaleX=0).
      // Every OTHER project starts closed (scaleX=1, curtains cover it).
      slides.forEach((slide, i) => {
        const lc = slide.querySelector(".left-curtain");
        const rc = slide.querySelector(".right-curtain");
        const isCurrent = i === 0;
        gsap.set([lc, rc], { scaleX: isCurrent ? 0 : 1 });
      });

      function openSlide(slide: HTMLElement, onComplete?: () => void) {
        // Reveal: curtains pull apart → scaleX 1 → 0
        gsap.to(
          [slide.querySelector(".left-curtain"), slide.querySelector(".right-curtain")],
          {
            scaleX: 0,
            duration: 1,
            ease: "power4.inOut",
            onComplete,
          }
        );
      }

      function closeSlide(slide: HTMLElement, onComplete?: () => void) {
        // Cover: curtains close → scaleX 0 → 1
        gsap.to(
          [slide.querySelector(".left-curtain"), slide.querySelector(".right-curtain")],
          {
            scaleX: 1,
            duration: 1,
            ease: "power4.inOut",
            onComplete,
          }
        );
      }

      function changeSlide(direction: number) {
        if (isAnimating) return;

        const nextIndex = currentIndex + direction;
        if (nextIndex < 0 || nextIndex >= slides.length) return;

        isAnimating = true;

        if (direction > 0) {
          // Scrolling DOWN: open (reveal) the next slide on top
          openSlide(slides[nextIndex], () => {
            currentIndex = nextIndex;
            isAnimating = false;
          });
        } else {
          // Scrolling UP: close (cover) the current slide to expose the one below
          closeSlide(slides[currentIndex], () => {
            currentIndex = nextIndex;
            isAnimating = false;
          });
        }
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${slides.length * 100}%`, // proportional to slide count
        pin: true,
        scrub: false, // pin only - no scrub-driven animation
        invalidateOnRefresh: true,
        onRefresh(self) {
          const spacer = self.pin?.parentElement;

          spacer?.style.setProperty("pointer-events", "none");

          (self.pin as HTMLElement | null)?.style.setProperty("pointer-events", "auto");
        },
        onToggle: (self) => {
          pinActiveRef.current = self.isActive;
        },
      });

      Observer.create({
        target: window,
        type: "wheel,touch",
        preventDefault: true,
        tolerance: 10,
        onDown: () => {if (pinActiveRef.current) changeSlide(1);},
        onUp: () => {if (pinActiveRef.current) changeSlide(-1);},
      });
    });

    return () => cleanup();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden text-white"
      style={{ transform: 'translateY(100%)', isolation: "isolate" }}
    >
      <div className="project project-1 absolute inset-0 flex">
        <div className="left-curtain flex-1 bg-purple-800 origin-left">

        </div>

        <div className="right-curtain flex-1 bg-purple-900 origin-right">

        </div>
      </div>

      <div className="project project-2 absolute inset-0 flex">
        <div className="left-curtain flex-1 bg-red-800 origin-left">

        </div>

        <div className="right-curtain flex-1 bg-red-900 origin-right">

        </div>
      </div>

      <div className="project project-3 absolute inset-0 flex">
        <div className="left-curtain flex-1 bg-green-800 origin-left">

        </div>

        <div className="right-curtain flex-1 bg-green-900 origin-right">

        </div>
      </div>
    </section>
  );
}
