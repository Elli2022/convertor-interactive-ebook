import { useEffect, useRef } from "react";

const PREP_TEXT = "reveal-text-prep";
const PREP_RISE = "reveal-rise-prep";

function prepClassFor(el: HTMLElement): string | null {
  if (el.dataset.scrollAnimate === "rise") {
    return PREP_RISE;
  }
  if (el.matches("h1, p, p > span")) {
    return PREP_TEXT;
  }
  return null;
}

function animateClassFor(el: HTMLElement): "scroll-rise-in" | "wave-in" {
  return el.dataset.scrollAnimate === "rise" ? "scroll-rise-in" : "wave-in";
}

export function useRevealOnIntersect<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const rootNode = containerRef.current;
    if (!rootNode) {
      return;
    }

    const nodes = rootNode.querySelectorAll<HTMLElement>(
      "h1, p, p > span, [data-scroll-animate]",
    );

    nodes.forEach((node) => {
      const prep = prepClassFor(node);
      if (prep) {
        node.classList.add(prep);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetNode = entry.target as HTMLElement;
          const prep = prepClassFor(targetNode);
          const animateClass = animateClassFor(targetNode);

          if (entry.isIntersecting) {
            if (prep) {
              targetNode.classList.remove(prep);
            }
            targetNode.classList.remove("wave-in", "scroll-rise-in");
            void targetNode.offsetWidth;
            targetNode.classList.add(animateClass);
            return;
          }

          targetNode.classList.remove("wave-in", "scroll-rise-in");
          if (prep) {
            targetNode.classList.add(prep);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.18,
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      nodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, []);

  return containerRef;
}
