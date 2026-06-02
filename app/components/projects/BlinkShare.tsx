'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function BlinkShare() {
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
        '<'
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
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
        '-=0.35'
      );

      tl.fromTo('.proj-mockup',
        { y: 60, opacity: 0, rotationX: 20, scale: 0.88 },
        { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 0.85, ease: 'expo.out', transformPerspective: 800 },
        '-=0.6'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="project project-2 absolute inset-0 flex max-lg:flex-col overflow-hidden">
      <div className="left-curtain flex-1 bg-neutral-800 origin-left flex items-center justify-between px-12 md:px-20 gap-8">
        <div className="flex flex-col gap-6 max-w-lg">
          <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">2025</span>
          <div className="overflow-hidden">
            <h3 className="proj-title text-[56px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
              BlinkShare
            </h3>
          </div>
          <p className="proj-desc text-white/50 text-base max-sm:text-[12px] md:text-lg leading-relaxed">
            BlinkShare is a secure file-sharing platform that allows users to transfer files through temporary sharing sessions without creating an account. Built with Next.js, TypeScript, Supabase, and deployed globally on Vercel, it features real-time uploads, password-protected sessions, expiring links, usage limits, and secure access controls. The platform was designed to make sharing files fast, private, and effortless while maintaining a strong focus on security.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'Supabase', 'Realtime', 'File Sharing'].map(tag => (
              <span key={tag} className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="right-curtain flex-1 bg-neutral-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8">
        <div className="proj-mockup md:flex flex-shrink-0 w-[380px] xl:w-[440px] aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 items-center justify-center">
          <span className="text-white/20 text-sm font-mono">screenshot</span>
        </div>
      </div>
    </div>
  );
}
