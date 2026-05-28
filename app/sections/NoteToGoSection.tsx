"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function NoteToGoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });

      // INTRO TEXT
      tl.fromTo(
        ".ntg-title",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        }
      );

      tl.fromTo(
        ".ntg-subtitle",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "<0.2"
      );

      // MOVE TEXT UP
      tl.to(
        ".intro-wrapper",
        {
          y: -200,
          opacity: 0,
          duration: 1,
        },
        "+=0.5"
      );

      // BROWSER EMERGES
      tl.fromTo(
        ".browser-window",
        {
          opacity: 0,
          scale: 0.7,
          rotateX: 25,
          rotateY: -20,
          y: 200,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 2,
          ease: "power3.out",
        },
        "<"
      );

      // FLOATING MOTION
      gsap.to(".browser-window", {
        y: "-=20",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // NOTE CARDS EMERGE
      tl.fromTo(
        ".note-card",
        {
          opacity: 0,
          scale: 0,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      // NOTE CARDS FLOAT OUTWARD
      tl.to(
        ".note-1",
        {
          x: -300,
          y: -120,
          rotate: -15,
          duration: 2,
        },
        "+=0.3"
      );

      tl.to(
        ".note-2",
        {
          x: 0,
          y: -180,
          rotate: 8,
          duration: 2,
        },
        "<"
      );

      tl.to(
        ".note-3",
        {
          x: 300,
          y: -100,
          rotate: 15,
          duration: 2,
        },
        "<"
      );

      // AMBIENT PARALLAX
      gsap.to(".background-glow", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // SYNC PULSE
      gsap.to(".sync-dot", {
        scale: 1.5,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white"
    >
      {/* ATMOSPHERIC GLOW */}
      <div className="background-glow absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[180px]" />
      </div>

      {/* NOISE */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
      </div>

      {/* INTRO */}
      <div className="intro-wrapper absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="ntg-title text-6xl font-black tracking-tight md:text-[10rem]">
          NOTE TO GO
        </h1>

        <p className="ntg-subtitle mt-6 max-w-xl text-lg text-white/60 md:text-2xl">
          Capture thoughts anywhere on the web.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* LEFT TEXT */}
        <div className="absolute left-[8%] top-1/2 z-20 hidden max-w-xl -translate-y-1/2 lg:block">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Productivity Reimagined
          </p>

          <h2 className="mt-6 text-6xl font-black leading-[0.95]">
            CAPTURE
            <br />
            IDEAS
            <br />
            WITHOUT
            <br />
            BREAKING
            <br />
            FLOW.
          </h2>
        </div>

        {/* BROWSER */}
        <div className="browser-window relative h-[420px] w-[90vw] max-w-[900px] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
          {/* TOP BAR */}
          <div className="flex h-14 items-center gap-2 border-b border-white/10 px-6">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />

            <div className="ml-6 h-8 w-[60%] rounded-full bg-white/5" />
          </div>

          {/* WEBSITE MOCK */}
          <div className="relative flex h-full">
            {/* SIDEBAR */}
            <div className="w-20 border-r border-white/10 bg-white/[0.03]" />

            {/* CONTENT */}
            <div className="flex-1 p-10">
              <div className="h-8 w-64 rounded-lg bg-white/10" />

              <div className="mt-6 space-y-4">
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-[90%] rounded bg-white/5" />
                <div className="h-4 w-[80%] rounded bg-white/5" />
              </div>
            </div>
          </div>

          {/* SYNC INDICATOR */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3">
            <div className="sync-dot h-3 w-3 rounded-full bg-green-400" />
            <p className="text-sm text-white/50">Synced</p>
          </div>
        </div>

        {/* FLOATING NOTES */}
        <div className="note-card note-1 absolute left-1/2 top-1/2 z-30 h-40 w-52 rounded-3xl bg-yellow-300 p-6 text-black shadow-2xl">
          <p className="font-semibold">
            Improve onboarding animation timings.
          </p>
        </div>

        <div className="note-card note-2 absolute left-1/2 top-1/2 z-30 h-44 w-56 rounded-3xl bg-cyan-300 p-6 text-black shadow-2xl">
          <p className="font-semibold">
            Add sync between extension and dashboard.
          </p>
        </div>

        <div className="note-card note-3 absolute left-1/2 top-1/2 z-30 h-40 w-52 rounded-3xl bg-pink-300 p-6 text-black shadow-2xl">
          <p className="font-semibold">
            New browser clipping experience idea.
          </p>
        </div>
      </div>
    </section>
  );
}