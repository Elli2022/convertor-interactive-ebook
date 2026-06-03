import { useEffect, useRef } from "react";

const PREP_TEXT = "reveal-text-prep";
const PREP_RISE = "reveal-rise-prep";

function prepClassFor(el: HTMLElement): string | null {
  if (el.dataset.scrollAnimate === "rise") {
    return PREP_RISE;
  }
  if (el.matches("h1, p")) {
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

    const revealNodes = Array.from(
      rootNode.querySelectorAll<HTMLElement>("h1, p, [data-scroll-animate]"),
    );

    revealNodes.forEach((node, index) => {
      node.style.setProperty("--reveal-delay", `${index * 58}ms`);
      const prep = prepClassFor(node);
      if (prep) {
        node.classList.add(prep);
      }
    });

    const accentNodes = Array.from(
      rootNode.querySelectorAll<HTMLElement>("[data-accent-line]"),
    );

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.18,
    };

    const revealObserver = new IntersectionObserver((entries) => {
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
    }, observerOptions);

    const accentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const targetNode = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          targetNode.classList.add("accent-line-active");
          return;
        }
        targetNode.classList.remove("accent-line-active");
      });
    }, observerOptions);

    revealNodes.forEach((node) => revealObserver.observe(node));
    accentNodes.forEach((node) => accentObserver.observe(node));

    return () => {
      revealNodes.forEach((node) => revealObserver.unobserve(node));
      accentNodes.forEach((node) => accentObserver.unobserve(node));
      revealObserver.disconnect();
      accentObserver.disconnect();
    };
  }, []);

  return containerRef;
}
