'use client';

import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import React, { useRef } from 'react'
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { withMedia } from '@/lib/gsapMedia';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const tagLineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "chars",
    });

    const cleanup = withMedia(({ isMobile, isTablet, isDesktop }) => {
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      });

      const splitTagLine = new SplitText(tagLineRef.current, {
        type: "words",
      });

      const descriptionLine = new SplitText(descriptionRef.current, {
        type: "words",
      });

      const tl2 = gsap.timeline({
        paused: true,
      });

      // The ScrollTrigger was declared seperately so as to use onEnter and onLeaveBack instead of play none none reverse in order to increase leave back speed
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",

        onEnter: () => {
          tl2.timeScale(1).play();
        },

        onLeaveBack: () => {
          tl2.timeScale(3).reverse(); // faster reverse
        },
      });

      tl2.from(split.chars, {
        y: 200,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      });

      tl2.from(splitTagLine.words, {
        y: 200,
        opacity: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: "power4.out",
      }, ">-0.9");

      tl2.from(descriptionLine.words, {
        y: 200,
        opacity: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: "power4.out",
      }, ">-0.5");

      tl2.from('.my-photo', {
        y: 100,
        opacity: 0,
        ease: "power4.out",
      }, ">-0.5");

      tl2.fromTo('.navbar', {
        y: 100,
        opacity: 0,
      }, {
        y: 0,
        opacity: 100,
        ease: "power4.out",
        duration: "1",
      }, "<+0.2");

      const imageTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          invalidateOnRefresh: true,
          markers: false,
        }
      });

      imageTl.to({}, { duration: 2 }); // delay flip and zoom until above animations finish

      imageTl.to('.photo-inner', {
        rotateY: 180,
        duration: 2,
        ease: "power2.inOut",
      });

      imageTl.to(['.my-photo', '.my-photo .absolute'], {  // target wrapper + inner faces
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",  // reset all of them
        ease: "expo.inOut",
        duration: 6,
      }, ">-0.5");
    });

    return () => cleanup;
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-stone-800 text-white flex"
    >
      <div className='flex-1 p-10'>
        <h1 ref={textRef} className="about-title font-black tracking-tight text-[38px] sm:text-[60px] md:text-[80px] lg:text-[110px] xl:text-[160px]">
          ABOUT ME
        </h1>

        <p ref={tagLineRef} className="tag-line mt-6 max-w-xl text-lg text-white/60 md:text-2xl">
          I BUILD <br />
          DIGITAL EXPERIENCES <br />
          THAT FEEL ALIVE.
        </p>
      </div>

      <div
        className="my-photo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 z-[9999]"
        style={{
          perspective: "1200px",
          borderRadius: "9999px",  // back on wrapper so GSAP can tween it to 0
        }}
      >
        <div
          className="photo-inner relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backfaceVisibility: "hidden", borderRadius: "9999px" }}  // on face, not Tailwind rounded-full
          >
            <img src="/my_photo.png" className="w-full h-full object-cover" />
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 bg-stone-700"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "9999px",  // on face too
            }}
          />
        </div>
      </div>

      {/* Round Version */}
      {/* <div className="my-photo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  before:absolute before:inset-0 before:rounded-full before:bg-stone-700 before:content-[''] before:-z-10 w-50 h-50">
        <img className="rounded-full transition-[transform, shadow] duration-300 ease-out hover:-translate-y-2 hover:translate-x-2 hover:shadow-2xl hover:shadow-stone-700 w-full h-full object-cover" src='/my_photo.png' />
      </div> */}

      <div className='flex-1 flex items-end justify-end p-10'>
        <p ref={descriptionRef} className="tag-line mt-6 max-w-xl text-lg text-white/60 md:text-2xl">
          From SaaS products to realtime platforms, <br />
          I build digital experiences designed to feel fast, <br />
          intuitive, and memorable.
        </p>
      </div>
    </section>
  );
}
