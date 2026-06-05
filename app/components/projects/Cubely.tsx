'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { withMedia } from '@/lib/gsapMedia';
import { FaLocationArrow } from 'react-icons/fa6';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Cubely() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const cleanup = withMedia(({ isMobile, isTablet, isDesktop }) => {
      const ctx = gsap.context(() => {
        if (!textRef.current) return;

        const split = new SplitText(textRef.current, {
          type: "lines",
        });

        for (let i = 0; i < split.lines.length; i++) {
          split.lines[i].classList.add("letters");
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.left-curtain', 
          isMobile
            ? { yPercent: -100, opacity: 0 }
            : { xPercent: -100, opacity: 0 },
          isMobile
            ? { yPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
            : { xPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
        );

        tl.fromTo('.right-curtain',
           isMobile
            ? { yPercent: 100, opacity: 0 }
            : { xPercent: 100, opacity: 0 },
          isMobile
            ? { yPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
            : { xPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
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

        // tl.fromTo('.proj-desc',
        //   { y: 24, opacity: 0 },
        //   { y: 0, opacity: 1, duration: 0.6 },
        //   '-=0.4'
        // );

        tl.from(split.lines, {
          y: 200,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power4.out",
          invalidateOnRefresh: true,
        }, "<");

        tl.fromTo('.proj-tag',
          { y: 20, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.35'
        );

        tl.fromTo('.proj-mockup',
          { y: 60, opacity: 0, rotationX: 20, scale: 0.88 },
          { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 0.85, ease: 'expo.out', transformPerspective: 800},
          '-=0.6'
        );

        tl.call(() => gsap.delayedCall(1.5, cycle), [], '-=0.5');

        tl.fromTo('.links', 
          { y: 20, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 0.2, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.35'
        );

        const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
        const total = cards.length;

        // Each card peeks 18px above the one in front
        const PEEK = 18;

        // Set initial stack: index 0 = front (bottom of stack visually),
        // higher index = further back (higher up)
        gsap.set(cards, { transformOrigin: 'center center', rotation: 0, x: 0 });
        cards.forEach((card, i) => {
          const rank = i; // 0 = front, total-1 = back
          gsap.set(card, {
            zIndex: total - rank,
            y: -rank * PEEK,
            scale: 1 - rank * 0.04,
          });
        });

        let current = 0; // cards[0] is now correctly the front

        const cycle = () => {
          const outCard = cards[current];
          const nextIdx = (current + 1) % total;

          // Front card drops down and fades out
          gsap.to(outCard, {
            y: 80,
            scale: 0.88,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              const backRank = total - 1;

              // First: move outCard completely off-screen before repositioning
              gsap.set(outCard, {
                opacity: 0,
                y: 200,       // push it far out of view
                zIndex: 0,    // behind everything
              });

              // Shift remaining cards forward
              cards.forEach((card, i) => {
                if (card === outCard) return;
                const rank = ((i - nextIdx + total) % total);
                gsap.to(card, {
                  zIndex: total - rank,
                  y: -rank * PEEK,
                  scale: 1 - rank * 0.04,
                  duration: 0.45,
                  ease: 'power2.out',
                });
              });

              // After the forward shift finishes, silently snap outCard to back
              gsap.delayedCall(0.1, () => {
                gsap.fromTo(outCard,
                  {
                    zIndex: 1,
                    y: -backRank * PEEK,
                    scale: 1 - backRank * 0.04,
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                    duration: 0.35,
                    ease: 'power2.out',
                  }
                );
              });

              current = nextIdx;
              gsap.delayedCall(1.8, cycle);
            },
          });
        };
      }, containerRef);

      return () => ctx.revert();
    });

    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className="project project-3 absolute inset-0 flex max-lg:flex-col overflow-hidden">
      <div className="left-curtain flex-1 bg-green-800 origin-left flex items-center justify-between px-12 md:px-20 gap-8">
        <div className="flex flex-col gap-6 max-sm:gap-2 max-w-lg">
          <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">2026</span>
          <div className="overflow-hidden">
            <h3 className="proj-title text-[25px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
              Cubely
            </h3>
          </div>
          <p ref={textRef} className="proj-desc text-white/50 text-base max-sm:text-[12px] md:text-lg leading-relaxed">
            Cubely is an open-source desktop application that simplifies Minecraft server hosting for players of all experience levels. Built using Rust and Tauri, it enables users to create, configure, manage, and share servers through an intuitive interface while maintaining native-level performance. Features such as one-click server setup, built-in tunneling, Discord Rich Presence support, and automated server management provide a streamlined multiplayer experience without the usual hosting complexity.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Rust', 'Tauri', 'Next.js', 'Minecraft'].map(tag => (
              <span key={tag} className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="right-curtain max-sm:flex-[0.8] flex-1 bg-green-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8">
        <div className="proj-mockup relative w-full max-w-[380px] xl:max-w-[440px] aspect-[4/3]">
          <img
            src="/cubely/c_1.png"
            className="stack-card stack-card-1 absolute inset-0 w-full h-full object-cover rounded-2xl"
          />

          <img
            src="/cubely/c_2.png"
            className="stack-card stack-card-2 absolute inset-0 w-full h-full object-cover rounded-2xl"
          />

          <img
            src="/cubely/c_3.png"
            className="stack-card stack-card-3 absolute inset-0 w-full h-full object-cover rounded-2xl"
          />

          <img
            src="/cubely/c_4.png"
            className="stack-card stack-card-3 absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className='absolute bottom-5 right-0 left-0 flex gap-3 items-center justify-center'>
          {[
            { label: 'Download', href: 'https://github.com/Kilaparthi-Himanshu/cubely/releases/tag/v1.0.0' },
            { label: 'GitHub', href: 'https://github.com/Kilaparthi-Himanshu/cubely' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              rel="noopener noreferrer"
              target='_blank'
              className='links flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/70 hover:text-blue-400 hover:border-white/40 hover:bg-white/10 transition-all duration-200 text-xs tracking-wide'
            >
              {label}
              <FaLocationArrow className='text-[10px] opacity-60' />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
