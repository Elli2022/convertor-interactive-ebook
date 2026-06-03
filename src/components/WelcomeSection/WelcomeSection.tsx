"use client";

import { useEffect, useRef, useState } from "react";

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 1;
const WHEEL_STEP = 0.0014;
const TOUCH_STEP = 0.0021;
const SCALE_START = 0.5;
const SCALE_END = 2.75;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const WelcomeSection: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const lastTouchYRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncMotionPreference);
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
      const heroIsLeadingViewport =
        heroRect.top <= window.innerHeight * 0.18 &&
        heroRect.bottom >= window.innerHeight * 0.55;
      const pageIsAtTop = window.scrollY <= 8;
      const currentProgress = progressRef.current;

      if (deltaY > 0) {
        return heroIsLeadingViewport && currentProgress < PROGRESS_MAX;
      }

      return pageIsAtTop && currentProgress > PROGRESS_MIN;
    };

    const applyInteraction = (deltaY: number, stepSize: number) => {
      if (!shouldOwnScroll(deltaY)) {
        return false;
      }

      const direction = deltaY > 0 ? 1 : -1;
      const nextProgress =
        progressRef.current + Math.abs(deltaY) * stepSize * direction;

      commitProgress(nextProgress);
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (applyInteraction(event.deltaY, WHEEL_STEP)) {
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

      if (applyInteraction(deltaY, TOUCH_STEP)) {
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

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const scale = SCALE_START + (SCALE_END - SCALE_START) * progress;
  const highlightColor = progress >= 0.48 ? "white" : "#32ABBC";

  return (
    <section
      ref={heroRef}
      className="relative flex w-full items-center justify-center overflow-hidden text-center"
      style={{
        background: "#D3E0E5",
        minHeight: "clamp(31rem, 78vh, 44rem)",
        touchAction: progress >= PROGRESS_MAX ? "pan-y" : "none",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 z-0 h-32 w-32 rounded-full bg-[#32ABBC] sm:h-36 sm:w-36"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <h1 className="font-century-gothic-pro text-4xl font-bold text-black md:text-6xl lg:text-7xl">
          Välkommen till
        </h1>
        <div className="mt-2 font-century-gothic-pro text-lg font-bold text-black md:text-xl lg:text-3xl">
          en byrå fylld av passionerade,
        </div>
        <div
          className="font-century-gothic-pro text-lg font-bold md:text-xl lg:text-3xl"
          style={{
            color: highlightColor,
            transition: "color 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span className="text-black">prestigelösa och </span>
          resultatdrivna doers.
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
