'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

const SKILLS = [
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TanStack Start',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
      'Jotai',
    ],
  },

  {
    category: 'Backend',
    items: [
      'Node.js',
      'Express',
      'Supabase',
      'PostgreSQL',
      'Redis',
      'WebSockets',
      'REST APIs',
      'Authentication',
    ],
  },

  {
    category: 'Apps & Platforms',
    items: [
      'Electron',
      'Tauri',
      'React Native',
      'Expo',
      'Plasmo',
      'Chrome Extensions',
    ],
  },

  {
    category: 'Systems & Tooling',
    items: [
      'Rust',
      'Axum',
      'Docker',
      'Kubernetes',
      'Linux',
      'Git',
      'Vercel',
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !gridRef.current) return;

    const splitHeading = new SplitText(headingRef.current, { type: 'chars' });

    const categoryEls = gridRef.current.querySelectorAll('.skill-category');
    const itemEls = gridRef.current.querySelectorAll('.skill-item');
    const lineEls = gridRef.current.querySelectorAll('.skill-line');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        // scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        toggleActions: 'play none none reverse',
      },
    });

    // Heading chars fly in from below
    tl.from(splitHeading.chars, {
      y: 120,
      opacity: 0,
      stagger: 0.03,
      // duration: 1.5,
      ease: 'power4.out',
    });

    // Lines draw in
    tl.from(lineEls, {
      scaleX: 0,
      transformOrigin: 'left center',
      stagger: 0.15,
      // duration: 1,
      ease: 'expo.out',
    }, '>-0.8');

    // Category labels appear
    tl.from(categoryEls, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      // duration: 0.8,
      ease: 'power3.out',
    }, '<+0.2');

    // Skill pills stagger in
    tl.from(itemEls, {
      y: 30,
      opacity: 0,
      stagger: 0.05,
      // duration: 0.6,
      ease: 'power3.out',
    }, '<+0.1');

    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',        // extends 100% beyond the entry pin
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    exitTl.to({}, { duration: 4 }); // idle

    exitTl.to(sectionRef.current, {
      scale: 0.88,
      borderRadius: '30px',
      ease: 'power2.inOut',
      duration: 1,
    });

    const items = gsap.utils.toArray(".skill-item");

    items.forEach((item: any, index) => {
      item.addEventListener("mousemove", (e: any) => {
        const bounds = item.getBoundingClientRect();
        const x = e.clientX - bounds.left; // Find mouse X position inside the item

        const center = bounds.width / 2; // Find the center of the item
        const distance = Math.abs(x - center); // Calculate distance from center

        const scale = gsap.utils.mapRange(0, 200, 1.2, 1, distance); // Convert distance into scale value

        gsap.to(item, {
          scale,
          duration: 0.2,
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
        });
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen max-md:min-h-max w-full bg-stone-700 text-white flex flex-col justify-center px-10 md:px-20 overflow-hidden max-md:pt-12 z-10"
      style={{ position: 'relative' }}
    >
      {/* Subtle grain texture overlay */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          // backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          // backgroundSize: '200px 200px',
        }}
      /> */}

      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-semibold tracking-tight text-[60px] md:text-[100px] xl:text-[140px] leading-none mb-16 overflow-hidden"
        style={{ clipPath: 'inset(0 0 -20% 0)' }}
      >
        SKILLS
      </h2>

      {/* Skills grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
        {SKILLS.map(({ category, items }) => (
          <div key={category} className="flex flex-col gap-4">
            {/* Divider line */}
            <div className="skill-line h-px bg-white/20 w-full" />

            {/* Category label */}
            <p className="skill-category text-xs tracking-[0.3em] uppercase text-white/40 font-medium">
              {category}
            </p>

            {/* Items */}
            <ul className="flex flex-col gap-3 mt-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="skill-item flex items-center gap-3 group cursor-default"
                  data-cursor-hover
                >
                  <span
                    className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/80 transition-colors duration-300"
                  />
                  <span className="text-xl md:text-2xl font-light tracking-tight text-white/70 group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom label */}
      <p className="absolute max-md:top-14 bottom-10 right-10 text-xs tracking-[0.25em] uppercase text-white/20">
        What I work with
      </p>
    </section>
  );
}
