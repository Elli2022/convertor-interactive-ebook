"use client";

import { useEffect, useRef, useState } from "react";

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 1;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

type HeroMotion = {
  wheelStep: number;
  touchStep: number;
  scaleStart: number;
  scaleEnd: number;
  colorAt: number;
};

const DESKTOP_MOTION: HeroMotion = {
  wheelStep: 0.0014,
  touchStep: 0.0021,
  scaleStart: 0.5,
  scaleEnd: 2.75,
  colorAt: 0.48,
};

const MOBILE_MOTION: HeroMotion = {
  wheelStep: 0.0022,
  touchStep: 0.0048,
  scaleStart: 0.42,
  scaleEnd: 1.45,
  colorAt: 0.42,
};

const WelcomeSection: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const lastTouchYRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const motionRef = useRef<HeroMotion>(DESKTOP_MOTION);

  const motion = isMobile ? MOBILE_MOTION : DESKTOP_MOTION;
  motionRef.current = motion;

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMobile = () => setIsMobile(mobileQuery.matches);
    const syncMotionPreference = () => {
      prefersReducedMotionRef.current = motionQuery.matches;
      setPrefersReducedMotion(motionQuery.matches);
    };

    syncMobile();
    syncMotionPreference();
    mobileQuery.addEventListener("change", syncMobile);
    motionQuery.addEventListener("change", syncMotionPreference);

    return () => {
      mobileQuery.removeEventListener("change", syncMobile);
      motionQuery.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  useEffect(() => {
    const commitProgress = (nextProgress: number) => {
      const clamped = clamp(nextProgress, PROGRESS_MIN, PROGRESS_MAX);

      if (clamped === progressRef.current) {
        return;
      }

      progressRef.current = clamped;

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        setProgress(clamped);
      });
    };

    const shouldOwnScroll = (deltaY: number) => {
      const hero = heroRef.current;
      if (!hero || prefersReducedMotionRef.current || deltaY === 0) {
        return false;
      }

      const heroRect = hero.getBoundingClientRect();
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const topThreshold = mobile ? 0.28 : 0.18;
      const bottomThreshold = mobile ? 0.42 : 0.55;

      const heroIsLeadingViewport =
        heroRect.top <= window.innerHeight * topThreshold &&
        heroRect.bottom >= window.innerHeight * bottomThreshold;
      const pageIsAtTop = window.scrollY <= 8;
      const currentProgress = progressRef.current;

      if (deltaY > 0) {
        return heroIsLeadingViewport && currentProgress < PROGRESS_MAX;
      }

      return pageIsAtTop && currentProgress > PROGRESS_MIN;
    };

    const applyInteraction = (
      deltaY: number,
      input: "wheel" | "touch",
    ) => {
      if (!shouldOwnScroll(deltaY)) {
        return false;
      }

      const { wheelStep, touchStep } = motionRef.current;
      const stepSize = input === "touch" ? touchStep : wheelStep;
      const direction = deltaY > 0 ? 1 : -1;
      const nextProgress =
        progressRef.current + Math.abs(deltaY) * stepSize * direction;

      commitProgress(nextProgress);
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (applyInteraction(event.deltaY, "wheel")) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (lastTouchYRef.current === null) {
        return;
      }

      const currentTouchY = event.touches[0]?.clientY ?? lastTouchYRef.current;
      const deltaY = lastTouchYRef.current - currentTouchY;

      if (applyInteraction(deltaY, "touch")) {
        event.preventDefault();
      }

      lastTouchYRef.current = currentTouchY;
    };

    const handleTouchEnd = () => {
      lastTouchYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const scale =
    motion.scaleStart + (motion.scaleEnd - motion.scaleStart) * progress;
  const highlightColor = progress >= motion.colorAt ? "white" : "#32ABBC";
  const scrollComplete = progress >= PROGRESS_MAX;

  return (
    <section
      ref={heroRef}
      className="relative flex w-full items-center justify-center overflow-hidden text-center"
      style={{
        background: "#D3E0E5",
        minHeight: isMobile
          ? "clamp(32rem, 100svh, 40rem)"
          : "clamp(31rem, 78vh, 44rem)",
        touchAction: scrollComplete ? "pan-y" : "none",
      }}
      aria-label="Välkommen till Convertor"
    >
      <div
        className="pointer-events-none absolute left-1/2 z-0 h-24 w-24 rounded-full bg-[#32ABBC] sm:h-32 sm:w-32 md:top-1/2 md:h-36 md:w-36"
        style={{
          top: isMobile ? "58%" : undefined,
          transform: isMobile
            ? `translate(-50%, -50%) scale(${scale})`
            : `translate(-50%, -50%) scale(${scale})`,
          transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-10 pt-6 sm:px-6 md:px-4 md:py-0">
        <h1 className="font-century-gothic-pro text-3xl font-bold leading-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">
          Välkommen till
        </h1>

        <div className="mx-auto mt-3 max-w-xl font-century-gothic-pro text-base font-bold leading-snug text-black sm:mt-4 sm:max-w-2xl sm:text-lg sm:leading-relaxed md:text-xl lg:text-3xl">
          <span className="block text-balance">en byrå fylld av passionerade,</span>
          <span className="mt-1 block text-balance">
            <span className="text-black">prestigelösa och </span>
            <span
              style={{
                color: highlightColor,
                transition: "color 320ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              resultatdrivna doers.
            </span>
          </span>
        </div>

        {isMobile && !scrollComplete && !prefersReducedMotion && (
          <p className="mt-8 text-xs font-medium tracking-wide text-[#14243D]/55">
            Svep uppåt för att fortsätta
          </p>
        )}
      </div>
    </section>
  );
};

export default WelcomeSection;
