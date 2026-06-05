'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const topStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const counter = counterRef.current;
    const lineFill = lineFillRef.current;
    const tag = tagRef.current;
    if (!overlay || !counter || !lineFill || !tag) return;

    // Collect resources to track
    const images = Array.from(document.images);
    const total = Math.max(images.length, 1);
    let loaded = 0;
    let progressValue = 0; // the displayed number
    let targetProgress = 0; // what we're animating toward
    let rafId: number;
    let completed = false;

    // Animate the counter smoothly toward targetProgress
    const tick = () => {
      if (progressValue < targetProgress) {
        progressValue = Math.min(progressValue + 1.4, targetProgress);
        const rounded = Math.round(progressValue);
        counter.textContent = String(rounded).padStart(2, '0');
        gsap.set(lineFill, { scaleX: rounded / 100 });
      }

      if (progressValue >= 100 && !completed) {
        completed = true;
        cancelAnimationFrame(rafId);
        runExitAnimation();
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onResourceLoad = () => {
      loaded++;
      targetProgress = Math.min(Math.round((loaded / total) * 95), 95);
    };

    // Track image loads
    if (images.length === 0) {
      targetProgress = 95;
    } else {
      images.forEach((img) => {
        if (img.complete) {
          onResourceLoad();
        } else {
          img.addEventListener('load', onResourceLoad, { once: true });
          img.addEventListener('error', onResourceLoad, { once: true });
        }
      });
    }

    // Entrance animation
    const entranceTl = gsap.timeline();
    entranceTl
      .from(tag, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from(counter, { y: 60, opacity: 0, duration: 0.7, ease: 'power4.out' }, '>-0.3')
      .from(lineRef.current, { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'expo.out' }, '>-0.2')
      .from(topStripRef.current, { opacity: 0, duration: 0.4 }, '<');

    // Kick off counter RAF after a small delay
    setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, 200);

    // Minimum display time safety net — push to 100 after 2.5s
    const safetyTimer = setTimeout(() => {
      targetProgress = 100;
    }, 2500);

    // Exit animation
    const runExitAnimation = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          onComplete?.();
        },
      });

      // Counter + line fade
      exitTl
        .to([counter, tag, lineRef.current, topStripRef.current], {
          opacity: 0,
          y: -30,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.in',
        })
        // Overlay slides up and off screen
        .to(overlay, {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
        }, '>-0.1');
    };

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <div
    className='border-b border-b-stone-800'
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#292524', // stone-50
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2.5rem 2.5rem 2.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Top strip */}
      <div
        ref={topStripRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#a8a29e', // stone-400
          }}
        >
          Himanshu Kilaparthi
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#a8a29e',
          }}
        >
          Portfolio · 2026
        </span>
      </div>

      {/* Center: giant counter */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1.5rem',
        }}
      >
        <p
          ref={tagRef}
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#78716c', // stone-500
            margin: 0,
          }}
        >
          Loading
        </p>

        {/* Counter */}
        <div style={{ overflow: 'hidden', lineHeight: 1 }}>
          <span
            ref={counterRef}
            style={{
              display: 'block',
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 600,
              fontSize: 'clamp(100px, 20vw, 220px)',
              letterSpacing: '-0.04em',
              color: '#fafaf9', // stone-900
              lineHeight: 0.88,
            }}
          >
            00
          </span>
        </div>

        {/* Progress line */}
        <div
          ref={lineRef}
          style={{
            width: '100%',
            height: '1px',
            background: '#1c1917', // stone-200
            position: 'relative',
            overflow: 'visible',
            transformOrigin: 'left center',
          }}
        >
          {/* Animated fill */}
          <div
            ref={lineFillRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#e7e5e4',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
          {/* Dot at the tip */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#e7e5e4',
              transform: 'translate(50%, -50%)',
            }}
          />
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#d6d3d1', // stone-300
          }}
        >
          Visakhapatnam, India
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#d6d3d1',
          }}
        >
          Built with Next.js & GSAP
        </span>
      </div>
    </div>
  );
}