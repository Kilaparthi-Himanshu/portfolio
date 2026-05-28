"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { withMedia } from "@/lib/gsapMedia";

gsap.registerPlugin(ScrollTrigger);

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
        },
      });

      tl.fromTo (".ntg-title", {
        opacity: 0,
        y: 100,
      }, {
        opacity: 1,
        y: 0,
        // duration: 0.1,
        ease: "power4.out",
      });

      tl.fromTo(".ntg-subtitle", {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        // duration: 0.1,
      }, "<0.1");

      const titleDimensions = document.querySelector('.ntg-title')?.getBoundingClientRect();

      gsap.set(".intro-wrapper", {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      tl.set(".intro-wrapper",  {
        width: titleDimensions?.width,
      });

      tl.to(".intro-wrapper", {
        left: () => {
          if (isMobile) return "50%";

          const rect = document
            .querySelector(".ntg-title")
            ?.getBoundingClientRect();

          return `${20 + (rect?.width ?? 0) / 2}px`;
        },
        top: () => {
          const rect = document
            .querySelector(".ntg-title")
            ?.getBoundingClientRect();

          return 14 + (rect?.height ?? 0) / 2;
        },
        ease: "power3.inOut",
        duration: 1,
      });

      tl.fromTo([".bar-a", ".bar-b", ".bar-c"], {
        scaleX: 0,
      }, {
        scaleX: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
      }, "<");
    });

    return () => cleanup();
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-stone-700 text-white"
    >
      {/* ATMOSPHERIC GLOW */}
      {/* <div className="background-glow absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[180px]" />
      </div> */}

      <div className="intro-wrapper max-lg:mt-8 absolute text-center flex flex-col items-center justify-center">
        <h1 className="ntg-title font-black tracking-tight text-[56px] sm:text-[60px] md:text-[80px] lg:text-[110px] xl:text-[160px]">
          NoteToGo
        </h1>

        <p className="ntg-subtitle mt-6 max-w-xl text-lg text-white/60 md:text-2xl">
          Capture thoughts anywhere <br /> on the web.
        </p>
      </div>

      <div className="bars flex flex-col gap-4 absolute bottom-[8%]">
        <div className="bar-a origin-left bg-white w-[300px] h-[30px]" />
        <div className="bar-b origin-left bg-white w-[500px] h-[30px]" />
        <div className="bar-c origin-left bg-white w-[700px] h-[30px]" />
      </div>
    </section>
  );
}
