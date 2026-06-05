"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Opening() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "chars",
    });

    split.chars[0].classList.add("first-letter");

    for (let i = 1; i < split.chars.length; i++) {
      split.chars[i].classList.add("letters");
    }

    gsap.set(".first-letter", {
      force3D: false,
    });

    gsap.from(split.chars, {
      y: 200,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
      invalidateOnRefresh: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#opening",
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(".letters", { 
      opacity: 1,
    }, { 
      opacity: 0,
      duration: 0.2,
    }, 0);

    tl.fromTo(".first-letter", {
      y: 0,
    }, {
      scale: () => {
        const element = document.querySelector(".first-letter") as HTMLElement;
        if (!element) return 1;

        const rect = element.getBoundingClientRect();

        const scaleX = (window.innerWidth / rect.width) * 4;
        const scaleY = (window.innerHeight / rect.height) * 45;

        return Math.max(scaleX, scaleY);
      },

      x: () => {
        const element = document.querySelector(".first-letter") as HTMLElement;
        if (!element) return 0;
        const rect = element.getBoundingClientRect();
        return window.innerWidth / 2 - (rect.left + rect.width / 2);
      },

      y: () => {
        const element = document.querySelector(".first-letter") as HTMLElement;
        if (!element) return 0;
        const rect = element.getBoundingClientRect();
        return window.innerHeight / 2 - (rect.top + rect.height / 2);
      },

      transformOrigin: "center center",
      ease: "power2.inOut",
    }, 0);

    // tl.to("#moon", {
    //   scale: 0.5,
    // }, 0);

    // const chars = split.chars;

    // const handleMove = (e: MouseEvent) => {
    //   chars.forEach((char) => {
    //     const rect = char.getBoundingClientRect();

    //     const cx = rect.left + rect.width / 2;
    //     const cy = rect.top + rect.height / 2;

    //     const dx = e.clientX - cx;
    //     const dy = e.clientY - cy;

    //     const distance = Math.sqrt(dx * dx + dy * dy);

    //     const maxDistance = 200;

    //     if (distance < maxDistance) {
    //       const force = (maxDistance - distance) / maxDistance;

    //       gsap.to(char, {
    //         x: -dx * force * 0.15,
    //         y: -dy * force * 0.15,
    //         rotation: -dx * force * 0.05,
    //         scale: 1 + force * 0.2,
    //         duration: 0.4,
    //         ease: "power3.out",
    //       });
    //     } else {
    //       gsap.to(char, {
    //         x: 0,
    //         y: 0,
    //         rotation: 0,
    //         scale: 1,
    //         duration: 0.8,
    //         ease: "elastic.out(1, 0.3)",
    //       });
    //     }
    //   });
    // };

    // window.addEventListener("mousemove", handleMove);

    return () => {
      // window.removeEventListener("mousemove", handleMove);
      split.revert();
    };
  }, []);

  return (
    <section id="opening" className="flex w-screen h-screen items-center justify-center overflow-hidden bg-white">
      {/* <div id="moon" className="absolute bg-[url(/moon.png)] bg-cover bg-center bg-position-[center_top_-40px] inset-0" /> */}

      <p
        ref={textRef}
        className="text-stone-800 lg:text-[200px] sm:text-[140px] max-sm:text-[70px] font-bold"
      >
        HIMANSHU
      </p>
    </section>
  );
}
