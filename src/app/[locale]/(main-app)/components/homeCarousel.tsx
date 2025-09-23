"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import "animate.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Slide = {
  image: string;
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
};

export type HomeCarousel = {
  slides: Slide[];
  autoplayMs?: number;
  className?: string;
};

export default function AnimateCssHero({
  slides,
  autoplayMs = 5500,
  className = "",
}: HomeCarousel) {
  const data = useMemo(() => slides ?? [], [slides]);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null); // SINGLE bar
  const pathname = usePathname();
  const isRTL = pathname.startsWith("/ar");

  // --- helpers --------------------------------------------------
  const clear = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.remove(
      "animate__animated",
      "animate__fadeInUp",
      "animate__fadeOutDown",
      "hero-img-in",
      "hero-img-out"
    );
  };

  const playOnce = (el: HTMLElement | null, classes: string[]) =>
    new Promise<void>((resolve) => {
      if (!el) return resolve();
      clear(el);
      // force reflow to restart CSS animation
      (el as any).offsetWidth;
      el.classList.add(...classes);
      const done = () => {
        el.removeEventListener("animationend", done);
        resolve();
      };
      el.addEventListener("animationend", done, { once: true });
    });

  // Reset & start progress bar
  const restartProgress = useCallback(() => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";
    // reflow
    bar.offsetWidth;
    bar.style.transition = `width ${autoplayMs}ms linear`;
    bar.style.width = "100%";
  }, [autoplayMs]);

  // --- navigation -----------------------------------------------
  const goTo = useCallback(
    async (nextIdx: number) => {
      if (isTransitioning || nextIdx === index || data.length <= 1) return;
      const container = rootRef.current;
      if (!container) return;

      // show next number + restart bar immediately for harmony
      setIndex(nextIdx);
      restartProgress();
      setIsTransitioning(true);

      const curr = container.querySelector(
        `[data-slide="${index}"]`
      ) as HTMLElement | null;
      const next = container.querySelector(
        `[data-slide="${nextIdx}"]`
      ) as HTMLElement | null;
      if (!curr || !next) {
        setIsTransitioning(false);
        return;
      }

      const currImg = curr.querySelector(
        "[data-hero-image]"
      ) as HTMLElement | null;
      const currTxt = curr.querySelector(
        "[data-hero-panel]"
      ) as HTMLElement | null;
      const nextImg = next.querySelector(
        "[data-hero-image]"
      ) as HTMLElement | null;
      const nextTxt = next.querySelector(
        "[data-hero-panel]"
      ) as HTMLElement | null;

      // ensure next is visible before anim
      next.style.visibility = "visible";
      next.style.opacity = "1";

      // overlap OUT/IN
      const outImg = playOnce(currImg, ["hero-img-out", "hero-3d"]);
      const outTxt = playOnce(currTxt, [
        "animate__animated",
        "animate__fadeOutDown",
      ]);
      const inImg = playOnce(nextImg, ["hero-img-in", "hero-3d"]);
      const inTxt = playOnce(nextTxt, [
        "animate__animated",
        "animate__fadeInUp",
      ]);

      await Promise.all([outImg, outTxt, inImg, inTxt]);

      // hide old
      curr.style.visibility = "hidden";
      curr.style.opacity = "0";

      setIsTransitioning(false);
    },
    [data.length, index, isTransitioning, restartProgress]
  );

  const next = useCallback(
    () => goTo((index + 1) % data.length),
    [goTo, index, data.length]
  );
  const prev = useCallback(
    () => goTo((index - 1 + data.length) % data.length),
    [goTo, index, data.length]
  );

  // --- autoplay -------------------------------------------------
  useEffect(() => {
    if (data.length <= 1) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!isTransitioning) next();
    }, autoplayMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, autoplayMs, data.length, next, isTransitioning]);

  // initial visibility
  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;
    data.forEach((_, i) => {
      const el = container.querySelector(
        `[data-slide="${i}"]`
      ) as HTMLElement | null;
      if (!el) return;
      el.style.visibility = i === 0 ? "visible" : "hidden";
      el.style.opacity = i === 0 ? "1" : "0";
    });
    restartProgress(); // start bar on first render
  }, [data, restartProgress]);

  // swipe
  const onPointerDown = (e: React.PointerEvent) => {
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!lastPointer.current) return;
    const dx = e.clientX - lastPointer.current.x;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    lastPointer.current = null;
  };

  const total = data.length || 0;
  const currentDisplay = String(index + 1).padStart(2, "0");
  const totalDisplay = String(total).padStart(2, "0");

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-screen select-none text-ink overflow-hidden ${className}`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      aria-roledescription="carousel"
      aria-label="Hero"
      style={{ perspective: "1200px" }}
    >
      {/* SINGLE TopControls outside the slides for perfect sync */}
      <div className={`hidden md:block absolute top-6 sm:top-8 z-30 start-6 `}>
        <div
          className="flex flex-col gap-2 min-w-[14rem] max-w-[22rem] 
               rounded-2xl px-4 py-3
               backdrop-blur-md backdrop-saturate-150
               bg-gradient-to-l from-[var(--color-main)]/70 to-black/60
               ring-1 ring-white/15
               shadow-[0_8px_30px_rgba(0,0,0,.25)]"
        >
          <div
            className={`flex justify-between items-center gap-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="grid h-9 w-9 place-items-center rounded-full
                   bg-white/10 hover:bg-white/20
                   ring-1 ring-white/20
                   transition focus:outline-none
                   focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black"
            >
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Counter */}
            <div className="tabular-nums tracking-widest text-base sm:text-lg font-extrabold text-white drop-shadow">
              {currentDisplay}
              <span className="opacity-70"> / </span>
              {totalDisplay}
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next slide"
              className="grid h-9 w-9 place-items-center rounded-full
                   bg-white/10 hover:bg-white/20
                   ring-1 ring-white/20
                   transition focus:outline-none
                   focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black"
            >
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Loading bar */}
          <div className="relative mt-2 h-[4px] w-56 rounded-full bg-white/25 overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 h-full rounded-full
                   bg-gradient-to-r from-[var(--color-main)] to-[var(--color-secondary)]"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Slides */}
      {data.map((s, i) => (
        <div
          key={i}
          data-slide={i}
          className="absolute inset-0 bg-black"
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${data.length}`}
        >
          <img
            data-hero-image
            src={s.image}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/25" />

          {/* Content panel */}
          <div
            data-hero-panel
            className="absolute z-10 end-1 bottom-8 sm:bottom-12 
            w-full lg:max-w-2xl px-3"
          >
            <div
              className="rounded-3xl px-5 py-4 sm:px-6 sm:py-6
               bg-gradient-to-r from-[var(--color-main)]/60 via-[var(--color-main)]/45 to-white/85
               backdrop-blur-md backdrop-saturate-150
               ring-1 ring-white/20
               shadow-[0_10px_40px_rgba(0,0,0,.25)]"
            >
              <div className="space-y-3 max-h-[44vh] overflow-y-auto pr-1">
                <h2 className="text-white drop-shadow-md text-2xl sm:text-3xl font-semibold leading-tight">
                  {s.title}
                </h2>

                {s.description && (
                  <p className="text-white/90 text-sm sm:text-base/relaxed">
                    {s.description}
                  </p>
                )}

                {s.href && (
                  <div className="pt-2">
                    <Link
                      href={s.href}
                      aria-label={`Open project: ${s.title}`}
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2
                       bg-white text-[color:var(--color-main)] font-medium
                       hover:bg-white/90
                       focus:outline-none focus:ring-2 focus:ring-[color:var(--color-main)]
                       focus:ring-offset-2 focus:ring-offset-white/20
                       transition"
                    >
                      {s.ctaLabel ?? "View Project"}
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
