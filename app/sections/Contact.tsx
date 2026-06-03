'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { FaArrowUpLong } from 'react-icons/fa6';

gsap.registerPlugin(SplitText, ScrollTrigger);

const LINKS = [
  { label: 'GitHub', handle: '@himanshu', href: 'https://github.com' },
  { label: 'LinkedIn', handle: 'Himanshu', href: 'https://linkedin.com' },
  { label: 'Twitter', handle: '@himanshu', href: 'https://twitter.com' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !emailRef.current) return;

    const splitHeading = new SplitText(headingRef.current, { type: 'chars' });
    const linkCards = gsap.utils.toArray<HTMLElement>('.contact-link-card');
    const tagline = sectionRef.current.querySelector('.contact-tagline');
    const dropTagline  = sectionRef.current.querySelector('.drop-tagline');
    const footerItems = gsap.utils.toArray<HTMLElement>('.contact-footer-item');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        invalidateOnRefresh: true,
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(splitHeading.chars, {
      y: 140,
      opacity: 0,
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
    });

    if (tagline) {
      const splitTagline = new SplitText(tagline as HTMLElement, { type: 'words' });
      tl.from(splitTagline.words, {
        y: 40,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'power3.out',
      }, '>-0.6');
    }

    if (dropTagline) {
      const splitTagline = new SplitText(dropTagline as HTMLElement, { type: 'words' });
      tl.from(splitTagline.words, {
        y: 40,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'power3.out',
      }, '>-0.6');
    }

    tl.from(emailRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
    }, '>-0.4');

    // Cards scale up from below
    tl.from(linkCards, {
      y: 50,
      opacity: 0,
      scale: 0.94,
      stagger: 0.08,
      duration: 0.7,
      ease: 'expo.out',
    }, '>-0.3');

    tl.from(footerItems, {
      opacity: 0,
      y: 10,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power2.out',
    }, '>-0.2');

    // Magnetic hover on email
    const emailEl = emailRef.current;
    const handleEmailMove = (e: MouseEvent) => {
      const rect = emailEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.12;
      const dy = (e.clientY - cy) * 0.12;
      gsap.to(emailEl, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    };
    const handleEmailLeave = () => {
      gsap.to(emailEl, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };
    emailEl.addEventListener('mousemove', handleEmailMove);
    emailEl.addEventListener('mouseleave', handleEmailLeave);

    return () => {
      emailEl.removeEventListener('mousemove', handleEmailMove);
      emailEl.removeEventListener('mouseleave', handleEmailLeave);
      splitHeading.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-stone-900 text-white flex flex-col justify-between px-10 md:px-20 py-16 overflow-hidden"
    >
      {/* Ghost watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end max-sm:justify-center overflow-hidden pb-8 sm:pr-8">
        <span className=" max-sm:text-[15vw] text-[22vw] font-bold tracking-tighter text-white/[0.025] uppercase leading-none select-none">
          CONTACT
        </span>
      </div>

      {/* Top: heading + availability */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="contact-tagline text-xs tracking-[0.3em] uppercase text-white/30 mb-6 font-medium">
            Get in touch
          </p>
          <h2
            ref={headingRef}
            className="font-semibold tracking-tight text-[50px] md:text-[80px] xl:text-[110px] leading-none overflow-hidden"
            style={{ clipPath: 'inset(0 0 -20% 0)' }}
          >
            LET'S WORK
            <br />
            TOGETHER.
          </h2>
        </div>

        <div className="contact-footer-item flex items-center gap-3 mb-2 max-sm:self-start self-end md:self-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm text-white/40 tracking-wide">Available for projects</span>
        </div>
      </div>

      {/* Big email CTA */}
      <div className="flex flex-col items-start gap-3">
        <p className="drop-tagline text-xs tracking-[0.25em] uppercase text-white/20">Drop a line</p>
        <div className="overflow-hidden">
          <a
            ref={emailRef}
            href="mailto:himanshunani.dev@gmail.com"
            className="group inline-block text-[5.8vw] md:text-[5.5vw] font-semibold tracking-tight leading-none text-white hover:text-white/70 transition-colors duration-300 cursor-pointer"
            data-cursor-hover
          >
            himanshunani.dev@gmail.com
            <span className="block h-[2px] bg-white/20 mt-2 group-hover:bg-white/60 transition-colors duration-300" />
          </a>
        </div>
      </div>

      {/* Social link cards — distinct from the project list rows */}
      <div className="flex flex-col sm:flex-row gap-3">
        {LINKS.map(({ label, handle, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-card group relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 flex items-center justify-between cursor-pointer"
            data-cursor-hover
          >
            {/* White fill sweeps up from bottom on hover */}
            <span
              className="absolute inset-0 z-0 translate-y-full group-hover:translate-y-0 bg-white transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
            />

            <span className="relative z-10 text-2xl md:text-3xl font-semibold tracking-tight text-white group-hover:text-stone-900 transition-colors duration-300 leading-none">
              {label}
            </span>

            <div className="relative z-10 flex flex-col items-end gap-1.5">
              <FaArrowUpLong className="rotate-45 text-white/40 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              <span className="text-xs font-mono text-white/30 group-hover:text-stone-500 transition-colors duration-300">
                {handle}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between">
        <p className="contact-footer-item text-[8px] tracking-[0.25em] uppercase text-white/20 max-sm:text-center">
          Himanshu · 2026
        </p>
        <p className="contact-footer-item text-[8px] tracking-[0.25em] uppercase text-white/20 max-sm:text-center">
          Visakhapatnam, India
        </p>
        <p className="contact-footer-item text-[8px] tracking-[0.25em] uppercase text-white/20 max-sm:text-center">
          Built with Next.js & GSAP
        </p>
      </div>
    </section>
  );
}