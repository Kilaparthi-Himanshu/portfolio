import gsap from "gsap";

export function withMedia(
  cb: (conditions: {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  }) => void
) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: "(max-width: 767px)",
      isTablet: "(min-width: 768px) and (max-width: 1023px)",
      isDesktop: "(min-width: 1024px)",
    },
    (context) => {
      cb(context.conditions as any);
    }
  );

  return () => mm.revert();
}
