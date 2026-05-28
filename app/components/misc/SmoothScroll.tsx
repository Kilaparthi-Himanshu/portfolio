'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
	return useContext(LenisContext);
}

export default function SmoothScroll({
	children,
}: {
	children: React.ReactNode;
}) {
	const [lenis, setLenis] = useState<Lenis | null>(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const lenisInstance = new Lenis({
			duration: 1.2,
			smoothWheel: true,
		});

		setLenis(lenisInstance);

		let rafId: number;

		function raf(time: number) {
			lenisInstance.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		lenisInstance.on('scroll', ScrollTrigger.update);

		ScrollTrigger.scrollerProxy(document.body, {
			scrollTop(value) {
				if (value !== undefined) {
					lenisInstance.scrollTo(value);
				}

				return window.scrollY;
			},

			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},

			pinType: document.body.style.transform
				? 'transform'
				: 'fixed',
		});

		ScrollTrigger.refresh();

		return () => {
			cancelAnimationFrame(rafId);

			lenisInstance.destroy();

			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	return (
		<LenisContext.Provider value={lenis}>
			{children}
		</LenisContext.Provider>
	);
}
