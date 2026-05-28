'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

const PROJECTS = [
  {
    slug: 'blinkshare',
    title: 'BlinkShare',
    tags: ['Next.js', 'Supabase', 'Realtime', 'File Sharing'],
    year: '2025',
    desc: 'Secure high-speed file sharing with expiring links, realtime transfers, and auth-less encrypted access.',
  },
  {
    slug: 'notetogo',
    title: 'NoteToGo',
    tags: ['Chrome Extension', 'React', 'Plasmo'],
    year: '2024',
    desc: 'Capture thoughts anywhere on the web.',
  },
  {
    slug: 'cubely',
    title: 'Cubely',
    tags: ['Three.js', 'React Three Fiber', 'Game Dev'],
    year: '2024',
    desc: 'A Minecraft-inspired voxel sandbox built to explore procedural worlds, rendering, and game systems.',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const splitHeading = new SplitText(headingRef.current, { type: 'chars' });
    const rows = gsap.utils.toArray<HTMLElement>('.project-row');
    const lines = gsap.utils.toArray<HTMLElement>('.project-line');

    const tl = gsap.timeline({
      paused: true,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=250%',
      pin: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        tl.timeScale(1).play();
      },

      onLeaveBack: () => {
        tl.timeScale(3).reverse(); // faster reverse
      },
      markers: false
    });

    gsap.set(splitHeading.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.03,
      ease: 'power4.out',
    });

    gsap.set(rows, {
      opacity: 0,
      y: 50,
    });

    gsap.set(lines, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    gsap.set(".selected-work", {
      opacity: 0,
    });

    tl.to('.selected-work', {
      opacity: 1,
    });

    tl.to(splitHeading.chars, {
      y: 0,
      opacity: 1,
      stagger: 0.03,
      ease: 'power4.out',
    });

    tl.to(lines, {
      scaleX: 100,
      transformOrigin: 'center center',
      stagger: 0.1,
      ease: 'expo.out',
    }, '>-0.5');

    tl.to(rows, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out',
    }, '<+0.1');
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-stone-800 text-white flex flex-col justify-center px-10 md:px-20 overflow-hidden"
      style={{ marginTop: '-30vh', position: 'relative', zIndex: 0 }}
    >
      {/* Giant ghost title that changes on hover */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {PROJECTS.map((p, i) => (
          <span
            key={p.slug}
            className="absolute font-black tracking-tighter text-[15vw] text-white/[0.04] uppercase transition-opacity duration-500 select-none whitespace-nowrap"
            style={{ opacity: activeIndex === i ? 1 : 0 }}
          >
            {p.title}
          </span>
        ))}
      </div>

      {/* Section label */}
      <p className="selected-work text-xs tracking-[0.3em] uppercase text-white/30 mb-8 font-medium">
        Selected Work
      </p>

      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-black tracking-tight text-[52px] md:text-[80px] xl:text-[110px] leading-none mb-12 md:mb-16 overflow-hidden"
        style={{ clipPath: 'inset(0 0 -20% 0)' }}
      >
        PROJECTS
      </h2>

      {/* Project list */}
      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <div key={project.slug}>
            <div className="project-line h-px bg-white/10 w-full" />

            <div
              className="project-row group flex items-center justify-between py-5 md:py-6 cursor-pointer"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => {
                // scroll to NoteToGo or navigate
                document.querySelector('#notetogo')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Left: index + title */}
              <div className="flex items-baseline gap-6">
                <span className="text-xs text-white/20 font-mono tabular-nums w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-2xl md:text-4xl font-black tracking-tight group-hover:text-white/60 transition-colors duration-300">
                  {project.title}
                </span>
              </div>

              {/* Right: tags + year + arrow */}
              <div className="flex items-center gap-6">
                <div className="hidden md:flex gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs tracking-wider uppercase text-white/30 border border-white/10 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-white/20 font-mono hidden md:block">
                  {project.year}
                </span>
                <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg">
                  ↗
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="project-line h-px bg-white/10 w-full" />
      </div>
    </section>
  );
}