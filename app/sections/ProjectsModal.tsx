'use client';

import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { activeProjectAtom, projectModalOpenAtom } from '../store/atoms';
import ModalRenderer from '../components/misc/ModalRenderer';
import { motion } from "framer-motion";
import { useLenis } from '../components/misc/SmoothScroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { withMedia } from '@/lib/gsapMedia';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { PROJECTS } from './ProjectsContents';

gsap.registerPlugin(ScrollTrigger);

function ProjectsModal({
	setIsOpen
}: {
	setIsOpen: (open: boolean) => void;
}) {
  const lenis = useLenis();

	useEffect(() => {
		lenis?.stop();

		return () => {
			lenis?.start();
		};
	}, [lenis]);

  const transitionRef = useRef<HTMLDivElement | null>(null);
  const switchProjectRef = useRef<(direction: "next" | "prev") => void>(null);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				(document.activeElement as HTMLElement)?.blur();
				setIsOpen(false);
			}
		}

		window.addEventListener("keydown", handleKey);

		return () => {
			window.removeEventListener("keydown", handleKey);
		}
	}, []);

  const [isAnimating, setIsAnimating] = useState(false);

  // Contains index of the project
  const [activeProjectIndex, setActiveProjectIndex] = useAtom(activeProjectAtom);

  useGSAP(() => {
    const cleanup = withMedia(({ isMobile, isTablet, isDesktop }) => {
      // Calculate amount of squares with respect to dimensions
      const container = transitionRef.current;
      if (!container) return;

      // Clear any previous cells
      container.innerHTML = "";

      const W = container.offsetWidth;
      const H = container.offsetHeight;
      const cellSize = Math.ceil(W / 20); // 20 columns, square cells

      const cols = Math.ceil(W / cellSize);
      const rows = Math.ceil(H / cellSize);

      const cells: HTMLElement[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement("div");
          cell.style.cssText = `
            position: absolute;
            width: ${cellSize}px;
            height: ${cellSize}px;
            left: ${c * cellSize}px;
            top: ${r * cellSize}px;
            background: rgb(68 64 60); /* stone-700 */
            transform: scale(0);
            transform-origin: center center;
          `;
          container.appendChild(cell);
          cells.push(cell);
        }
      }

      // Set initial state ONCE on mount
      gsap.set(cells, { scale: 0, transformOrigin: "center center" });

      switchProjectRef.current = (direction: "next" | "prev") => {
        if (isAnimating) return;

        setIsAnimating(true);

        const blocks = transitionRef.current?.children;

        if (!blocks) return;

        const cols = 20;
        const rows = 12;

        const cells = Array.from(blocks);

        const centerX = cols / 2;
        const centerY = rows / 2;

        const distances = cells.map((_, index) => {
          const x = index % cols;
          const y = Math.floor(index / cols);

          return Math.sqrt(
            Math.pow(x - centerX, 2) +
            Math.pow(y - centerY, 2)
          );
        });

        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false);
          }
        });

        tl.to(cells, {
          scale: 1.2,
          transformOrigin: "center center",
          duration: 0.5,
          ease: "power2.inOut",
        });

        tl.call(() => {
          if (direction === "next") {
            setActiveProjectIndex(prev =>
              prev === PROJECTS.length - 1 ? 0 : prev + 1
            );
          } else {
            setActiveProjectIndex(prev =>
              prev === 0 ? PROJECTS.length - 1 : prev - 1
            );
          }
        });

        // tl.set({}, {}, "+=0.3");

        tl.to(cells, {
          scale: 0,
          transformOrigin: "center center",
          duration: 0.5,
          ease: "power2.inOut",
        });
      };
    });

    return cleanup;
  });

  const nextProject = () => {
    if (isAnimating) return;

    switchProjectRef.current?.("next");
  };

  const prevProject = () => {
    if (isAnimating) return;

    switchProjectRef.current?.("prev");
  };

  return (
    <motion.div 
      data-lenis-prevent
			className='fixed inset-0 h-[100lvh] bg-black/40 flex p-8 z-99999 backdrop-blur-md gap-4'
			initial={{
				opacity: 0
			}}
			animate={{
				opacity: 1
			}}
			exit={{
				opacity: 0
			}}
			transition={{
				duration: 0.2,
			}}
			onClick={(e) => {
				e.preventDefault();
				setIsOpen(false);
			}}
		>
      <motion.div
				className='w-full h-full rounded-4xl bg-stone-900 relative flex items-center overflow-auto scrollbar-hide modal-inner-container scroll-container'
				onClick={(e) => e.stopPropagation()}
			>
        <div
          ref={transitionRef}
          className="absolute inset-0 pointer-events-none z-999999 overflow-hidden"
        />

        {PROJECTS[activeProjectIndex].component}

        <motion.div className='w-max p-1 bg-red-400/30 rounded-3xl absolute max-lg:left-3 lg:right-3 top-3 z-999 flex gap-1 border border-neutral-400/50'>
          <button className='hover:bg-red-400/40 p-1 max-sm:p-0 rounded-full active:scale-90 transition-all text-white' data-cursor-hover onClick={() => setIsOpen(false)}>
            <RxCross2 size={20} />
          </button>
        </motion.div>

        <motion.div className='w-max p-1 bg-neutral-400/20 rounded-3xl absolute max-lg:right-3 lg:left-3 top-3 z-999 flex gap-1 max-sm:gap-2 border border-neutral-400/50'>
          <button className='hover:bg-neutral-400/40 p-2 max-sm:p-1 rounded-full active:scale-90 transition-all text-white' data-cursor-hover onClick={prevProject}>
            <FaArrowLeft size={22} />
          </button>

          <button className='hover:bg-neutral-400/40 p-2 max-sm:p-1 rounded-full active:scale-90 transition-all text-white' data-cursor-hover onClick={nextProject}>
            <FaArrowRight size={22} />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsModalRenderer() {
	const [projectModalOpen, setProjectModalOpen] = useAtom(projectModalOpenAtom);

	return (
		<ModalRenderer isOpen={projectModalOpen}>
			<ProjectsModal setIsOpen={setProjectModalOpen} />
		</ModalRenderer>
	);
}
