'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function NoteToGo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.left-curtain', 
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
      );

      tl.fromTo('.right-curtain',
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
        '<' // same time as left curtain
      );

      tl.fromTo('.proj-year',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      tl.fromTo('.proj-title',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.75, ease: 'expo.out' },
        '-=0.2'
      );

      tl.fromTo('.proj-desc',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      tl.fromTo('.proj-tag',
        { y: 20, opacity: 0, scale: 0.85 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.7)'
        },
        '-=0.35'
      );

      tl.fromTo('.proj-mockup',
        { y: 60, opacity: 0, rotationX: 20, scale: 0.88 },
        { 
          y: 0, opacity: 1, rotationX: 0, scale: 1,
          duration: 0.85,
          ease: 'expo.out',
          transformPerspective: 800,
        },
        '-=0.6'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="project project-1 absolute inset-0 flex max-lg:flex-col overflow-hidden"
    >
      <div className="left-curtain flex-1 bg-[#1a1025] origin-left flex items-center justify-between px-12 md:px-20 gap-8">
        <div className="flex flex-col gap-6 max-w-lg">
          <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
            2026
          </span>

          {/* Clip mask wrapper for the title slide-up */}
          <div className="overflow-hidden">
            <h3 className="proj-title text-[56px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
              NoteToGo
            </h3>
          </div>

          <p className="proj-desc text-white/50 text-base max-sm:text-[12px] md:text-lg leading-relaxed">
            NoteToGo is a cross-device note-taking Chrome extension designed for quickly capturing ideas, snippets, and reminders while browsing the web. Built with React, TypeScript, and Plasmo, it provides a seamless writing experience with rich text editing, cloud synchronization, and instant access to notes across devices. The project focuses on speed, simplicity, and keeping important information available wherever users work.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Chrome Extension', 'React', 'Plasmo'].map(tag => (
              <span
                key={tag}
                className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="right-curtain flex-1 bg-purple-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8">
        <div className="relative proj-mockup md:flex flex-shrink-0 w-[380px] xl:w-[440px] aspect-[4/3] rounded-2xl bg-red border border-white/10 items-center justify-center before:absolute before:inset-0 before:bg-stone-700 before:content-[''] before:-z-10 before:rounded-2xl transition-[transform,shadow] duration-300 ease-out hover:-translate-y-2 hover:translate-x-2">
          <span className="text-white/20 text-sm font-mono">screenshot</span>
        </div>
      </div>
    </div>
  );
}
