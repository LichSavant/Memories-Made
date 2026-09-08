import { useEffect, useRef } from "react";

export default function useSectionReveal(reducedMotion) {
  const rootRef = useRef(null);

  useEffect(() => {
    const sections = rootRef.current?.querySelectorAll("[data-reveal]");
    if (!sections?.length) return undefined;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return rootRef;
}
