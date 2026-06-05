'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

gsap.registerPlugin(SplitText, ScrollTrigger);

const CONTRIBUTIONS = [
  { label: 'Razorpay Integration', desc: 'Full payment flow — order creation, webhook verification, and post-payment order fulfillment.' },
  { label: 'Supabase Backend', desc: 'Schema design, RLS policies, real-time subscriptions, and storage for product assets.' },
  { label: 'REST APIs & Webhooks', desc: 'Built and secured API routes for cart, checkout, orders, and payment event handlers.' },
  { label: 'Twilio Messaging', desc: 'Automated SMS confirmations and delivery updates triggered via order status webhooks.' },
  { label: 'Cart & Checkout', desc: 'End-to-end cart logic with coupon codes, quantity controls, and dynamic pricing.' },
  { label: 'Frontend UI', desc: 'Contributed to product pages, checkout UI, and responsive layout across the storefront.' },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeContrib, setActiveContrib] = useState<number | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const splitHeading = new SplitText(headingRef.current, { type: 'chars' });
    const lines = gsap.utils.toArray<HTMLElement>('.exp-line');
    const contribRows = gsap.utils.toArray<HTMLElement>('.contrib-row');
    const metaItems = gsap.utils.toArray<HTMLElement>('.exp-meta-item');
    const screenshot = sectionRef.current.querySelector('.exp-screenshot');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=350%',
        pin: true,
        invalidateOnRefresh: true,
        toggleActions: 'play none none reverse',
      },
    });

    // Section label
    tl.from('.exp-label', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Heading chars
    tl.from(splitHeading.chars, {
      y: 130,
      opacity: 0,
      stagger: 0.025,
      duration: 0.9,
      ease: 'power4.out',
    }, '>-0.3');

    // Meta pills
    tl.from(metaItems, {
      y: 20,
      opacity: 0,
      stagger: 0.07,
      duration: 0.5,
      ease: 'power3.out',
    }, '>-0.5');

    // Lines draw in
    tl.from(lines, {
      scaleX: 0,
      transformOrigin: 'left center',
      stagger: 0.08,
      duration: 0.6,
      ease: 'expo.out',
    }, '>-0.3');

    // Contribution rows stagger
    tl.from(contribRows, {
      y: 24,
      opacity: 0,
      stagger: 0.06,
      duration: 0.55,
      ease: 'power3.out',
    }, '<+0.15');

    // Screenshot slides in from right
    if (screenshot) {
      tl.from(screenshot, {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
      }, '>-0.7');
    }

    return () => {
      splitHeading.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-stone-800 text-white flex flex-col justify-center px-10 md:px-20 py-16 overflow-hidden"
    >
      {/* Ghost watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-start overflow-hidden pl-8 opacity-100">
        <span className="text-[18vw] font-bold tracking-tighter text-white/[0.03] uppercase leading-none select-none whitespace-nowrap">
          ZIEL GROUP
        </span>
      </div>

      {/* Section label */}
      <p className="exp-label text-xs tracking-[0.3em] uppercase text-white/30 mb-6 font-medium">
        Work Experience
      </p>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* Left column */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">

          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-semibold tracking-tight text-[40px] md:text-[64px] xl:text-[80px] leading-none overflow-hidden"
            style={{ clipPath: 'inset(0 0 -20% 0)' }}
          >
            ZIEL GROUP
          </h2>

          {/* Meta row */}
          <div className="flex flex-wrap gap-2">
            {[
              { text: 'Full Stack Intern' },
              { text: 'May – Jul 2025' },
              { text: '3 months' },
              { text: 'Remote' },
            ].map(({ text }) => (
              <span
                key={text}
                className="exp-meta-item text-xs tracking-wider uppercase text-white/50 border border-white/10 px-3 py-1.5 rounded-full"
              >
                {text}
              </span>
            ))}
          </div>

          {/* Project callout */}
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] uppercase text-white/20">Project</span>
            <a
              href="https://www.ancientfoods.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
              data-cursor-hover
            >
              ancientfoods.in
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
            </a>
          </div>

          {/* Contributions list */}
          <div className="flex flex-col mt-2">
            <div className="exp-line h-px bg-white/10 w-full" />
            {CONTRIBUTIONS.map(({ label, desc }, i) => (
              <div key={label}>
                <div
                  className="contrib-row group relative flex items-start justify-between gap-6 py-3.5 cursor-default"
                  onMouseEnter={() => setActiveContrib(i)}
                  onMouseLeave={() => setActiveContrib(null)}
                >
                  {/* Subtle hover bg */}
                  <div
                    className="absolute inset-0 bg-white/[0.03] transition-opacity duration-200 rounded-sm"
                    style={{ opacity: activeContrib === i ? 1 : 0 }}
                  />

                  <div className="flex items-baseline gap-4 relative z-10 min-w-0">
                    <span className="text-xs text-white/20 font-mono tabular-nums shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-base md:text-lg font-medium tracking-tight text-white/80 group-hover:text-white transition-colors duration-200">
                        {label}
                      </span>
                      <span
                        className="text-sm text-white/30 leading-relaxed transition-all duration-300 overflow-hidden"
                        style={{
                          maxHeight: activeContrib === i ? '60px' : '0px',
                          opacity: activeContrib === i ? 1 : 0,
                        }}
                      >
                        {desc}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="exp-line h-px bg-white/10 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column — screenshot */}
        <div className="exp-screenshot hidden lg:flex flex-col gap-3 w-[380px] xl:w-[440px] shrink-0">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            <img
              src="/ancientfoods/checkout.png"
              alt="Ancient Foods checkout page"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            <img
              src="/ancientfoods/payment.png"
              alt="Ancient Foods checkout page"
              className="w-full h-auto object-cover"
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-white/20 font-mono tracking-wide">Ancient Foods E-commerce</span>
            <a
              href="https://www.ancientfoods.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 tracking-wide"
              data-cursor-hover
            >
              ancientfoods.in ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}