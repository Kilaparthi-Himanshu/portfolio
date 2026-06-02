'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { FaArrowUpLong } from "react-icons/fa6";
import { useSetAtom } from 'jotai';
import { activeProjectAtom, projectModalOpenAtom } from '../store/atoms';
import NoteToGo from '../components/projects/NoteToGo';
import BlinkShare from '../components/projects/BlinkShare';
import Cubely from '../components/projects/Cubely';

export const PROJECTS = [
  {
    slug: 'notetogo',
    title: 'NoteToGo',
    tags: ['Chrome Extension', 'React', 'Plasmo'],
    year: '2026',
    desc: 'A seamless cross-device note-taking extension with instant sync, rich editing, and distraction-free capture anywhere on the web.',
    component: <NoteToGo />
  },
  {
    slug: 'blinkshare',
    title: 'BlinkShare',
    tags: ['Next.js', 'Supabase', 'Realtime', 'File Sharing'],
    year: '2025',
    desc: 'Secure, lightning-fast file sharing with expiring sessions and no sign-up required.',
    component: <BlinkShare />
  },
  {
    slug: 'cubely',
    title: 'Cubely',
    tags: ['Rust', 'Tauri', 'Minecraft'],
    year: '2026',
    desc: 'Cubely is an open-source desktop app for instantly creating, managing, and sharing Minecraft servers with built-in tunneling and seamless one-click setup.',
    component: <Cubely />,
  },
];

export const PROJECT_INDEX_MAP = {
  notetogo: 0,
  blinkshare: 1,
  cubely: 2,
};

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
      end: '+=450%',
      pin: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        tl.timeScale(1).play();
      },

      onLeaveBack: () => {
        tl.pause(0); // faster reverse
      },
      pinSpacing: false,
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

  type ProjectSlug = "notetogo" | "blinkshare" | "cubely";

  const setProjectModalOpen = useSetAtom(projectModalOpenAtom);

  // For arrow navigation
  const setActiveProjectIndex = useSetAtom(activeProjectAtom);

  return (
    <section
      ref={sectionRef}
      className="projects relative h-screen w-full bg-stone-800 text-white flex flex-col justify-center px-10 md:px-20 overflow-hidden mb-[100vh]"
      style={{ marginTop: '-30vh', position: 'relative', zIndex: 0 }}
    >
      {/* Giant ghost title that changes on hover */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {PROJECTS.map((p, i) => (
          <span
            key={p.slug}
            className="absolute max-md:top-20 tracking-tighter text-[15vw] text-white/[0.04] uppercase transition-opacity duration-500 select-none whitespace-nowrap"
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
        className="font-semibold tracking-tight text-[52px] md:text-[80px] xl:text-[110px] leading-none mb-12 md:mb-16 overflow-hidden"
        style={{ clipPath: 'inset(0 0 -20% 0)' }}
      >
        PROJECTS

        <p className='text-xl tracking-normal font-semibold'>
          Select a project to view it.
        </p>
      </h2>

      {/* Project list */}
      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <div key={project.slug}>
            <div className="project-line h-px bg-white/10 w-full" />

            <div
              className="project-row group flex items-center justify-between py-5 md:py-6 cursor-pointer" 
              data-cursor-hover
              //  before:absolute before:left-[-10] before:right-[-10] before:top-0 before:bottom-0 before:bg-white before:content-[''] before:origin-bottom before:-z-10 before:scale-y-0 hover:before:scale-y-100 before:transition-[scale]
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => {
                // scroll to NoteToGo or navigate
                // document.querySelector('#notetogo')?.scrollIntoView({ behavior: 'smooth' });
                setProjectModalOpen(true);
                setActiveProjectIndex(PROJECT_INDEX_MAP[project.slug as ProjectSlug]);
              }}
            >
              {/* Left: index + title */}
              <div className="flex items-baseline gap-6">
                <span className="text-xs text-white/20 font-mono tabular-nums w-5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className='flex flex-col'>
                  <span className="text-2xl md:text-4xl tracking-tight group-hover:text-white/60 transition-colors duration-300">
                    {project.title}
                  </span>

                  {/* <span className="text-md md:text-lg tracking-tight text-neutral-500 group-hover:text-neutral-500/60 transition-colors duration-300">
                    {project.desc}
                  </span> */}
                </div>
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

                <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg rotate-45">
                  <FaArrowUpLong />
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
