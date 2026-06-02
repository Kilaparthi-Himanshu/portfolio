// 'use client';

// import { useAtom } from 'jotai';
// import React, { useEffect, useRef } from 'react';
// import { projectModalAtom } from '../store/atoms';
// import ModalRenderer from '../components/misc/ModalRenderer';
// import { motion } from "framer-motion";
// import { useLenis } from '../components/misc/SmoothScroll';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// import { withMedia } from '@/lib/gsapMedia';

// gsap.registerPlugin(ScrollTrigger);

// function ProjectsModal({
// 	setIsOpen
// }: {
// 	setIsOpen: (open: boolean) => void;
// }) {
//   const lenis = useLenis();

// 	useEffect(() => {
// 		lenis?.stop();

// 		return () => {
// 			lenis?.start();
// 		};
// 	}, [lenis]);

//   const modalRef = useRef<HTMLDivElement | null>(null);

//   useGSAP(() => {
//     const cleanup = withMedia(({ isMobile, isTablet, isDesktop }) => {
//       const modalHeight = modalRef.current?.clientHeight ?? 0;
//       const leftSections = gsap.utils.toArray(".left-side-col > div");
//       const rightSections = gsap.utils.toArray(".right-side-col > div");
//       const rightContainer = document.querySelector(".right-side-col");
//       const sectionCount = leftSections.length;


//       // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       // gsap.killTweensOf([leftSections, rightContainer]);
//       const getSectionSize = () => modalHeight;
//       const getScrollLength = () => getSectionSize() * sectionCount;

//       gsap.set(rightContainer, {
//         x: 0,
//         y: () => -getSectionSize() * (sectionCount - 1)
//       });

//       // left column moves vertically
//       gsap.to(leftSections, {
//         yPercent: -100 * (sectionCount - 1),
//         ease: "none",
//         scrollTrigger: {
//           scroller: ".modal-inner-container",
//           trigger: ".scroll-container",
//           start: "top top",
//           end: () => "+=" + getScrollLength(),
//           scrub: true,
//           pin: ".sticky-container",
//           invalidateOnRefresh: true,
//           markers: false
//         }
//       });

//       // right column moves back to 0 on scroll
//       gsap.to(rightContainer, {
//         y: 0,
//         ease: "none",
//         scrollTrigger: {
//           scroller: ".modal-inner-container",
//           trigger: ".scroll-container",
//           start: "top top",
//           end: () => "+=" + getScrollLength(),
//           scrub: true,
//           invalidateOnRefresh: true,
//           markers: false
//         }
//       });
//     });

//     return () => cleanup();
//   });

// 	useEffect(() => {
// 		const handleKey = (e: KeyboardEvent) => {
// 			if (e.key === "Escape") {
// 				(document.activeElement as HTMLElement)?.blur();
// 				setIsOpen(false);
// 			}
// 		}

// 		window.addEventListener("keydown", handleKey);

// 		return () => {
// 			window.removeEventListener("keydown", handleKey);
// 		}
// 	}, []);

//   return (
//     <motion.div 
//       data-lenis-prevent
// 			className='fixed inset-0 bg-black/40 flex p-8 z-99999 backdrop-blur-md gap-4'
// 			initial={{
// 				opacity: 0
// 			}}
// 			animate={{
// 				opacity: 1
// 			}}
// 			exit={{
// 				opacity: 0
// 			}}
// 			transition={{
// 				duration: 0.2,
// 			}}
// 			onClick={(e) => {
// 				e.preventDefault();
// 				setIsOpen(false);
// 			}}
// 		>
//       <motion.div
// 				className='w-full h-full rounded-4xl corner-squircle bg-stone-900 relative flex items-center overflow-auto scrollbar-hide modal-inner-container scroll-container'
//         ref={modalRef}
// 				onClick={(e) => e.stopPropagation()}
// 			>
//         <div className='sticky-container flex w-full h-full flex-1 sticky'>
//           <div className='left-side-col flex flex-col flex-1 h-full'>
//             <div className="left-curtain flex-1 bg-[#1a1025] origin-left flex items-center justify-between px-12 md:px-20 gap-8 min-h-full">
//               <div className="flex flex-col gap-6 max-w-lg">
//                 <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
//                   2026
//                 </span>
//                 <h3 className="proj-title text-[56px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
//                   NoteToGo
//                 </h3>
//                 <p className="proj-desc text-white/50 text-base md:text-lg leading-relaxed">
//                   A seamless cross-device note-taking extension with instant sync, rich editing, and distraction-free capture anywhere on the web.
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {['Chrome Extension', 'React', 'Plasmo'].map(tag => (
//                     <span key={tag} className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="left-curtain flex-1 bg-neutral-800 origin-left flex items-center justify-between px-12 md:px-20 gap-8 min-h-full">
//               <div className="flex flex-col gap-6 max-w-lg">
//                 <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
//                   2025
//                 </span>
//                 <h3 className="proj-title text-[56px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
//                   BlinkShare
//                 </h3>
//                 <p className="proj-desc text-white/50 text-base md:text-lg leading-relaxed">
//                   Secure, lightning-fast file sharing with expiring sessions and no sign-up required.
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {['Next.js', 'Supabase', 'Realtime', 'File Sharing'].map(tag => (
//                     <span key={tag} className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="left-curtain flex-1 bg-green-800 origin-left flex items-center justify-between px-12 md:px-20 gap-8 min-h-full">
//               <div className="flex flex-col gap-6 max-w-lg">
//                 <span className="proj-year text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
//                   2026
//                 </span>
//                 <h3 className="proj-title text-[56px] md:text-[72px] font-semibold tracking-tight leading-none text-white">
//                   Cubely
//                 </h3>
//                 <p className="proj-desc text-white/50 text-base md:text-lg leading-relaxed">
//                   Open-source desktop app for instantly creating, managing, and sharing Minecraft servers with built-in tunneling and one-click setup.
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {['Rust', 'Tauri', 'Minecraft'].map(tag => (
//                     <span key={tag} className="proj-tag text-xs tracking-wider uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className='right-side-col flex flex-col flex-1 h-full'>
//             <div className="right-curtain flex-1 bg-green-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8 min-h-full">
//               <div className="proj-mockup hidden md:flex flex-shrink-0 w-[380px] xl:w-[440px] aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 items-center justify-center">
//                 <span className="text-white/20 text-sm font-mono">screenshot</span>
//               </div>
//             </div>

//             <div className="right-curtain flex-1 bg-neutral-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8 min-h-full">
//               <div className="proj-mockup hidden md:flex flex-shrink-0 w-[380px] xl:w-[440px] aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 items-center justify-center">
//                 <span className="text-white/20 text-sm font-mono">screenshot</span>
//               </div>
//             </div>

//             <div className="right-curtain flex-1 bg-purple-900 origin-right flex items-center justify-center px-12 md:px-20 gap-8 min-h-full">
//               <div className="relative proj-mockup hidden md:flex flex-shrink-0 w-[380px] xl:w-[440px] aspect-[4/3] rounded-2xl bg-red border border-white/10 items-center justify-center before:absolute before:inset-0 before:bg-stone-700 before:content-[''] before:-z-10 before:rounded-2xl transition-[transform, shadow] duration-300 ease-out hover:-translate-y-2 hover:translate-x-2">
//                 <span className="text-white/20 text-sm font-mono">screenshot</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* <motion.div className='w-[100px] h-[200px] bg-red-500 rounded-2xl'>

//       </motion.div> */}
//     </motion.div>
//   )
// }

// export function ProjectsModalRenderer() {
// 	const [projectModalOpen, setProjectModalOpen] = useAtom(projectModalAtom);

// 	return (
// 		<ModalRenderer isOpen={projectModalOpen}>
// 			<ProjectsModal setIsOpen={setProjectModalOpen} />
// 		</ModalRenderer>
// 	);
// }
