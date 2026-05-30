'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function ProjectsWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const stackRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".notetogo",
      { 
        yPercent: 100 
      },  // starts fully below viewport
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".projects", // use Projects as trigger, not NoteToGo
          start: "top top", // when Projects hits top of viewport
          end: "+=120%",
          scrub: true,
          markers: true,
          pinSpacing: false,
        },
      }
    );
  });

  return (
    <div ref={stackRef} className='project-stack relative h-max'>
      {children}
    </div>
  );
}
