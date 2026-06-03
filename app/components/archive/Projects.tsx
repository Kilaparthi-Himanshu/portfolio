// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { withMedia } from "@/lib/gsapMedia";
// import { Observer } from "gsap/Observer";

// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(Observer);

// export default function NoteToGo() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const pinActiveRef = useRef(false);

//   useGSAP(() => {
//     const cleanup = withMedia(({ isMobile, isTablet, isDesktop }) => {
//       gsap.defaults({ duration: 1, ease: "power4.inOut" });

//       const slides: HTMLElement[] = gsap.utils.toArray(".project", sectionRef.current);
//       // console.log("Slides: ", slides);

//       let currentIndex = 0;
//       let isAnimating = false;

//       // All slides sit stacked; assign permanent z-indices so higher
//       // projects always render above lower ones when revealed.
//       slides.forEach((slide, i) => {
//         gsap.set(slide, { zIndex: i + 1 }); // project-1 = z1, project-2 = z2 …
//       });

//       // Project-1 is the always-visible base: curtains open (scaleX=1).
//       // Every OTHER project starts closed (scaleX=0, curtains opened over it).
//       slides.forEach((slide, i) => {
//         const lc = slide.querySelector(".left-curtain");
//         const rc = slide.querySelector(".right-curtain");
//         gsap.set(lc, { xPercent: -100 });
//         gsap.set(rc, { xPercent: 100 });
//       });

//       function openSlide(slide: HTMLElement, onComplete?: () => void) {
//         // Reveal: curtains pull apart → scaleX 1 → 0
//         gsap.to(
//           slide.querySelector(".left-curtain"),
//           {
//             xPercent: -100,
//             duration: 1,
//             ease: "power4.inOut",
//             onComplete,
//           }
//         );
//         gsap.to(
//           slide.querySelector(".right-curtain"),
//           {
//             xPercent: 100,
//             duration: 1,
//             ease: "power4.inOut",
//             onComplete,
//           }
//         );
//       }

//       function closeSlide(slide: HTMLElement, onComplete?: () => void) {
//         // Cover: curtains close → scaleX 0 → 1
//         gsap.to(
//           slide.querySelector(".left-curtain"),
//           {
//             xPercent: 0,
//             duration: 1,
//             ease: "power4.inOut",
//             onComplete,
//           }
//         );
//         gsap.to(
//           slide.querySelector(".right-curtain"),
//           {
//             xPercent: 0,
//             duration: 1,
//             ease: "power4.inOut",
//             onComplete,
//           }
//         );
//       }

//       const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

//       function changeSlide(direction: number) {
//         if (isAnimating) return;

//         // return if the nextIndex ios out of bounds as there is no more slide to close the curtains of
//         if (direction > 0 && currentIndex >= slides.length) {
//           return;
//         }

//         const nextIndex = clamp(currentIndex + direction, 0, slides.length);

//         // console.log("Current Index, Next Index", currentIndex, nextIndex);

//         // if (nextIndex < 0 || nextIndex >= slides.length) return;

//         isAnimating = true;

//         if (direction > 0) {
//            // scroll Down: close current slide (curtains cover it), then advance
//           closeSlide(slides[currentIndex], () => {
//             currentIndex = nextIndex;
//             // console.log("After Closing Current Index, After Closing Next Index", currentIndex, nextIndex);
//             isAnimating = false;
//           });
//         } else {
//           // scroll Up: go back first, then open that slide (curtains reveal it)
//           currentIndex = nextIndex;
//           openSlide(slides[currentIndex], () => {
//             // console.log("After Opening Current Index, After Opening Next Index", currentIndex, nextIndex);
//             isAnimating = false;
//           });
//         }
//       }

//       Observer.create({
//         target: window,
//         type: "wheel,touch",
//         preventDefault: true,
//         // tolerance: 10,
//         onDown: () => {if (pinActiveRef.current) changeSlide(1);},
//         onUp: () => {if (pinActiveRef.current) changeSlide(-1);},
//       });

//       ScrollTrigger.create({
//         id: 'projects-pin',
//         trigger: sectionRef.current,
//         start: "top top",
//         end: `+=${slides.length * 100}%`, // proportional to slide count
//         pin: true,
//         scrub: false, // pin only - no scrub-driven animation
//         invalidateOnRefresh: true,
//         markers: true,
//         onRefresh(self) {
//           const spacer = self.pin?.parentElement;

//           spacer?.style.setProperty("pointer-events", "none");

//           (self.pin as HTMLElement | null)?.style.setProperty("pointer-events", "auto");
//         },
//         onToggle: (self) => {
//           pinActiveRef.current = self.isActive;

//           // self.isActive ? obs.enable() : obs.disable();

//           // if (!self.isActive) {
//           //   // Snap all slides back to their correct visual state
//           //   slides.forEach((slide, i) => {
//           //     const lc = slide.querySelector(".left-curtain");
//           //     const rc = slide.querySelector(".right-curtain");
//           //     // slides above currentIndex should be closed, at/below open
//           //     gsap.set([lc, rc], { scaleX: i <= currentIndex ? 0 : 1 });
//           //   });
//           //   isAnimating = false; // unstick if animation was mid-flight
//           // }
//         },
//       });
//     });

//     return () => cleanup();
//   }, { scope: sectionRef });

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-screen w-full overflow-hidden text-white"
//       style={{ isolation: "isolate" }}
//     >
//       <div className="project project-1 absolute inset-0 flex">
//         <div className="left-curtain flex-1 bg-[#1a1025] origin-left flex items-center justify-between px-12 md:px-20 gap-8">
//           <div className="flex flex-col gap-6 max-w-lg">
//             <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
//               2026
//             </span>
//             <h3 className="proj-title text-[56px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
//               NoteToGo
//             </h3>
//             <p className="proj-desc text-white/50 text-base md:text-lg leading-relaxed">
//               A seamless cross-device note-taking extension with instant sync, rich editing, and distraction-free capture anywhere on the web.
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {['Chrome Extension', 'React', 'Plasmo'].map(tag => (
//                 <span key={tag} className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="right-curtain flex-1 bg-purple-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8">
//           <div className="relative proj-mockup hidden md:flex flex-shrink-0 w-[380px] xl:w-[440px] aspect-[4/3] rounded-2xl bg-red border border-white/10 items-center justify-center before:absolute before:inset-0 before:bg-stone-700 before:content-[''] before:-z-10 before:rounded-2xl transition-[transform, shadow] duration-300 ease-out hover:-translate-y-2 hover:translate-x-2">
//             <span className="text-white/20 text-sm font-mono">screenshot</span>
//           </div>
//         </div>
//       </div>

//       <div className="project project-2 absolute inset-0 flex">
//         <div className="left-curtain flex-1 bg-neutral-800 origin-left flex items-center justify-between px-12 md:px-20 gap-8">
//           <div className="flex flex-col gap-6 max-w-lg">
//             <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
//               2025
//             </span>
//             <h3 className="proj-title text-[56px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
//               BlinkShare
//             </h3>
//             <p className="proj-desc text-white/50 text-base md:text-lg leading-relaxed">
//               Secure, lightning-fast file sharing with expiring sessions and no sign-up required.
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {['Next.js', 'Supabase', 'Realtime', 'File Sharing'].map(tag => (
//                 <span key={tag} className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="right-curtain flex-1 bg-neutral-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8">
//           <div className="proj-mockup hidden md:flex flex-shrink-0 w-[380px] xl:w-[440px] aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 items-center justify-center">
//             <span className="text-white/20 text-sm font-mono">screenshot</span>
//           </div>
//         </div>
//       </div>

//       <div className="project project-3 absolute inset-0 flex">
//         <div className="left-curtain flex-1 bg-green-800 origin-left flex items-center justify-between px-12 md:px-20 gap-8">
//           <div className="flex flex-col gap-6 max-w-lg">
//             <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
//               2026
//             </span>
//             <h3 className="proj-title text-[56px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
//               Cubely
//             </h3>
//             <p className="proj-desc text-white/50 text-base md:text-lg leading-relaxed">
//               Open-source desktop app for instantly creating, managing, and sharing Minecraft servers with built-in tunneling and one-click setup.
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {['Rust', 'Tauri', 'Minecraft'].map(tag => (
//                 <span key={tag} className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="right-curtain flex-1 bg-green-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8">
//           <div className="proj-mockup hidden md:flex flex-shrink-0 w-[380px] xl:w-[440px] aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 items-center justify-center">
//             <span className="text-white/20 text-sm font-mono">screenshot</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
