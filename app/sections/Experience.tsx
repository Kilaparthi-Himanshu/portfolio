'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(SplitText, ScrollTrigger);

const CONTRIBUTIONS = [
  { label: 'Razorpay Integration', desc: 'Full payment flow — order creation, webhook verification, and post-payment order fulfillment.', icon: '💳' },
  { label: 'Supabase Backend', desc: 'Schema design, RLS policies, real-time subscriptions, and storage for product assets.', icon: '🗄️' },
  { label: 'REST APIs & Webhooks', desc: 'Built and secured API routes for cart, checkout, orders, and payment event handlers.', icon: '🔗' },
  { label: 'Twilio Messaging', desc: 'Automated SMS confirmations and delivery updates triggered via order status webhooks.', icon: '📱' },
  { label: 'Cart & Checkout', desc: 'End-to-end cart logic with coupon codes, quantity controls, and dynamic pricing.', icon: '🛒' },
  { label: 'Frontend UI', desc: 'Contributed to product pages, checkout UI, and responsive layout across the storefront.', icon: '🎨' },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const label = sectionRef.current.querySelector('.exp-label');
    const roleTag = sectionRef.current.querySelector('.exp-role');
    const companyWord = sectionRef.current.querySelector('.exp-company');
    const cards = gsap.utils.toArray<HTMLElement>('.contrib-card');
    const screenshots = gsap.utils.toArray<HTMLElement>('.exp-img-card');
    const sideText = sectionRef.current.querySelector('.exp-side-text');
    const metaPills = gsap.utils.toArray<HTMLElement>('.exp-pill');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        toggleActions: "play none none reverse",
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // Label slides in
    tl.from(label, { y: 16, opacity: 0, duration: 0.5, ease: 'power2.out' });

    // Company name — big reveal
    tl.from(companyWord, {
      xPercent: -4,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
    }, '>-0.2');

    // Role tag
    tl.from(roleTag, { y: 12, opacity: 0, duration: 0.5, ease: 'power2.out' }, '>-0.5');

    // Meta pills stagger
    tl.from(metaPills, {
      y: 12,
      opacity: 0,
      stagger: 0.07,
      duration: 0.4,
      ease: 'power2.out',
    }, '>-0.3');

    // Contribution cards cascade
    tl.from(cards, {
      y: 40,
      opacity: 0,
      stagger: 0.07,
      duration: 0.6,
      ease: 'power3.out',
    }, '>-0.2');

    // Screenshots slide in from the right
    tl.from(screenshots, {
      x: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'expo.out',
    }, '<+0.1');

    // Side text
    tl.from(sideText, {
      opacity: 0,
      duration: 0.6,
    }, '<');

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',               // same trigger element
        end: '+=250%',                  // pin(200%) + 50% buffer for fade
        scrub: 1,
        invalidateOnRefresh: true,
        // No pin here — tl1's ScrollTrigger owns the pin
      },
    });

    // Delay the opacity tween so it only activates in the last 50% of tl2's scroll range
    // (i.e. after the 200% pin zone)
    tl2
      .to({}, { 
        duration: 3 
    }) // empty tween = 200/250 of the scroll = skip the pin zone (3/4 of 250% ≈ 200%)

    tl.to('.wrapper-container', {
      backgroundColor: '#1c1917',
    });

    tl2.to(sectionRef.current, {
      opacity: 0,
      duration: 1, // remaining 50/350 of scroll (1/4 of 250% ≈  50%)
    });

  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col"
      style={{ background: '#F0EBE1' }}
    >
      {/* Top accent bar */}
      {/* <div className="w-full h-1" style={{ background: 'linear-gradient(90deg, #1a1a1a 0%, #4a3728 50%, #1a1a1a 100%)' }} /> */}

      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── Left narrow sidebar ── */}
        <div
          className="exp-side-text hidden lg:flex flex-col justify-between items-center py-10 px-3 border-r border-black/10"
          style={{ width: '48px', minWidth: '48px' }}
        >
          <span
            className="text-[9px] font-mono tracking-[0.3em] uppercase text-black/30 whitespace-nowrap"
            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
          >
            Full Stack Intern
          </span>
          <span
            className="text-[9px] font-mono tracking-[0.3em] uppercase text-black/20 whitespace-nowrap"
            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
          >
            May – Jul 2025
          </span>
        </div>

        {/* ── Main content ── */}
        <div className="flex flex-col flex-1 min-w-0 px-8 md:px-12 py-8 gap-6 overflow-hidden">

          {/* Header row */}
          <div className="flex flex-col gap-3">
            <p className="exp-label text-xl tracking-[0.35em] uppercase font-medium" style={{ color: '#9a7c6a' }}>
              Work Experience · 2025
            </p>

            {/* Giant company name */}
            <div className="overflow-hidden">
              <h2
                className="exp-company font-black leading-none tracking-tighter"
                style={{
                  fontSize: 'clamp(52px, 9vw, 120px)',
                  color: '#1a1a1a',
                  fontFamily: "'Georgia', serif",
                  letterSpacing: '-0.03em',
                }}
              >
                ZIEL
                <span style={{ color: '#c8a882', fontStyle: 'italic' }}> Group</span>
              </h2>
            </div>

            {/* Role + pills row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="exp-role text-sm font-semibold px-4 py-1.5 rounded-full text-white"
                style={{ background: '#1a1a1a' }}
              >
                Full Stack Intern
              </span>
              {['Remote', '3 months', 'May–Jul 2025'].map(t => (
                <span
                  key={t}
                  className="exp-pill text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-full border font-medium"
                  style={{ borderColor: '#c8a882', color: '#7a5c44' }}
                >
                  {t}
                </span>
              ))}
              <a
                href="https://www.ancientfoods.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="exp-pill text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-full font-medium hover:opacity-70 transition-opacity"
                style={{ background: '#c8a882', color: '#fff' }}
              >
                ancientfoods.in ↗
              </a>
            </div>
          </div>

          {/* ── Bento grid ── */}
          <div className="flex flex-1 min-h-0 gap-4 overflow-hidden rounded-2xl">

            {/* Left: contribution cards grid */}
            <div className="flex-1 min-w-0 grid grid-cols-2 grid-rows-3 gap-3 content-start">
              {CONTRIBUTIONS.map(({ label, desc, icon }, i) => (
                <div
                  key={label}
                  className="contrib-card group relative rounded-2xl p-4 flex flex-col gap-1.5 cursor-default overflow-hidden"
                  style={{ background: i % 3 === 0 ? '#1a1a1a' : i % 3 === 1 ? '#fff' : '#e8dfd4', minHeight: '90px' }}
                >
                  {/* Hover shimmer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(200,168,130,0.15) 0%, transparent 60%)' }}
                  />
                  {/* <span className="text-lg leading-none">{icon}</span> */}
                  <span
                    className="text-[12px] md:text-[20px] font-semibold tracking-tight leading-tight"
                    style={{ color: i % 3 === 0 ? '#fff' : '#1a1a1a' }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[10px] md:text-[15px] leading-relaxed transition-opacity duration-200"
                    style={{ color: i % 3 === 0 ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
                  >
                    {desc}
                  </span>
                  {/* Corner index */}
                  <span
                    className="absolute top-3 right-3 text-[14px] font-mono tabular-nums"
                    style={{ color: i % 3 === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: screenshots column */}
            <div className="hidden lg:flex flex-col gap-3 shrink-0" style={{ width: '320px' }}>
              <div
                className="exp-img-card relative rounded-2xl overflow-hidden border shadow-lg flex-[1.1]"
                style={{ borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                <img
                  src="/ancientfoods/checkout.png"
                  alt="Ancient Foods checkout"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(240,235,225,0.8), transparent)' }}
                />
                <span
                  className="absolute bottom-3 left-4 text-[9px] font-mono tracking-widest uppercase"
                  style={{ color: '#7a5c44' }}
                >
                  Checkout UI
                </span>
              </div>

              <div
                className="exp-img-card relative rounded-2xl overflow-hidden border shadow-lg flex-[0.9]"
                style={{ borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                <img
                  src="/ancientfoods/payment.png"
                  alt="Ancient Foods Razorpay payment"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(240,235,225,0.8), transparent)' }}
                />
                <span
                  className="absolute bottom-3 left-4 text-[9px] font-mono tracking-widest uppercase"
                  style={{ color: '#7a5c44' }}
                >
                  Razorpay Flow
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="flex items-center justify-between px-8 md:px-12 py-3 border-t text-[9px] font-mono tracking-[0.25em] uppercase"
        style={{ borderColor: 'rgba(0,0,0,0.08)', color: '#b0927a' }}
      >
        <span>Ziel Group</span>
        <span style={{ color: '#c8a882' }}>● E-Commerce Platform</span>
        <span>Ancient Foods India</span>
      </div>
    </section>
  );
}