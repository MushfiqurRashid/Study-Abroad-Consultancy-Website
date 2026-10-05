"use client";

import { useEffect, useRef } from "react";

// Modern, lightweight mouse trail with requestAnimationFrame-based smoothing.
// Uses a single absolutely-positioned element to avoid layout thrash.
export function MouseTrail() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    const handlePointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.18);
      current.current.y = lerp(current.current.y, target.current.y, 0.18);

      const translate = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      if (dotRef.current) dotRef.current.style.transform = translate;
      if (glowRef.current) glowRef.current.style.transform = translate;

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden>
      <div
        ref={glowRef}
        className="pointer-events-none fixed h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl transition-transform duration-0"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(4,49,104,0.18)] drop-shadow-lg transition-transform duration-0"
      />
    </div>
  );
}
