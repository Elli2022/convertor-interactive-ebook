import { useEffect, useRef } from "react";

/**
 * Subtle vertical parallax via CSS variable `--parallax-y` on the target node.
 * Intended for decorative blobs; respects prefers-reduced-motion.
 */
export function useParallaxY(maxPx = 22) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      node.style.setProperty("--parallax-y", "0px");
      return;
    }

    let frameId = 0;
    let currentY = 0;

    const update = () => {
      frameId = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const ratio =
        (rect.top + rect.height / 2 - vh * 0.5) / Math.max(vh * 0.65, 1);
      const clamped = Math.max(-1, Math.min(1, ratio));
      const targetY = clamped * maxPx;
      currentY += (targetY - currentY) * 0.1;
      node.style.setProperty("--parallax-y", `${currentY.toFixed(2)}px`);
    };

    const schedule = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const handleMotionPreference = () => {
      if (motionQuery.matches) {
        node.style.setProperty("--parallax-y", "0px");
      } else {
        update();
      }
    };

    motionQuery.addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motionQuery.removeEventListener("change", handleMotionPreference);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [maxPx]);

  return ref;
}
