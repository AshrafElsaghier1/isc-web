"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import "animate.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
  const progressRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isRTL = pathname.startsWith("/ar");

  // --- helpers --------------------------------------------------
  const clear = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.remove(
      "animate__animated",
      "animate__fadeInUp",
      "animate__fadeOutUp",
      "animate__fadeOutDown",
      "hero-img-in",
      "hero-img-out",
      "hero-img-in-ltr",
      "hero-img-out-ltr",
      "hero-img-in-rtl",
      "hero-img-out-rtl",
      "hero-overlay-sweep",
      "hero-underlay-sweep",
      "hero-3d"
    );
  };

  const playOnce = (el: HTMLElement | null, classes: string[]) =>
    new Promise<void>((resolve) => {
      if (!el) return resolve();
      clear(el);
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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

      setIndex(nextIdx);
      restartProgress();
      setIsTransitioning(true);

      const curr = container.querySelector(
        `[data-slide="${index}"]`
      ) as HTMLElement | null;
      const next = container.querySelector(
        `[data-slide="${nextIdx}"]`
      ) as HTMLElement | null;

      const overlay = container.querySelector(
        `[data-hero-overlay]`
      ) as HTMLElement | null;

      if (!curr || !next) {
        setIsTransitioning(false);
        return;
      }

      const currImg = curr.querySelector(
        "[data-hero-image]"
      ) as HTMLElement | null;
      const currUnder = curr.querySelector(
        "[data-hero-underlay]"
      ) as HTMLElement | null;
      const currTxt = curr.querySelector(
        "[data-hero-panel]"
      ) as HTMLElement | null;

      const nextImg = next.querySelector(
        "[data-hero-image]"
      ) as HTMLElement | null;
      const nextUnder = next.querySelector(
        "[data-hero-underlay]"
      ) as HTMLElement | null;
      const nextTxt = next.querySelector(
        "[data-hero-panel]"
      ) as HTMLElement | null;

      // ensure next is visible before anim
      next.style.visibility = "visible";
      next.style.opacity = "1";

      // direction-aware classes
      const inCls = isRTL ? "hero-img-in-rtl" : "hero-img-in-ltr";
      const outCls = isRTL ? "hero-img-out-rtl" : "hero-img-out-ltr";

      // sweeps
      const overlaySweep = overlay
        ? playOnce(overlay, ["hero-overlay-sweep"])
        : Promise.resolve();
      const currUnderSweep = currUnder
        ? playOnce(currUnder, ["hero-underlay-sweep"])
        : Promise.resolve();
      const nextUnderSweep = nextUnder
        ? playOnce(nextUnder, ["hero-underlay-sweep"])
        : Promise.resolve();

      // images
      const outImg = playOnce(currImg, [outCls, "hero-3d"]);
      const inImg = playOnce(nextImg, [inCls, "hero-3d"]);

      // panels (animate.css)
      const outTxt = playOnce(currTxt, [
        "animate__animated",
        "animate__fadeOutDown",
      ]);
      const inTxt = playOnce(nextTxt, [
        "animate__animated",
        "animate__fadeInUp",
      ]);

      await Promise.all([
        currUnderSweep,
        nextUnderSweep,
        overlaySweep,
        outImg,
        inImg,
        outTxt,
        inTxt,
      ]);

      // hide old slide
      curr.style.visibility = "hidden";
      curr.style.opacity = "0";

      setIsTransitioning(false);
    },
    [data.length, index, isTransitioning, restartProgress, isRTL]
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

  // initial visibility + RTL class
  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;
    container.classList.toggle("rtl", isRTL);

    data.forEach((_, i) => {
      const el = container.querySelector(
        `[data-slide="${i}"]`
      ) as HTMLElement | null;
      if (!el) return;
      el.style.visibility = i === 0 ? "visible" : "hidden";
      el.style.opacity = i === 0 ? "1" : "0";
    });

    restartProgress();
  }, [data, restartProgress, isRTL]);

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
  const current = data[index] ?? {
    title: "",
    description: "",
    href: "",
    ctaLabel: "",
  };

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
      {/* PERSISTENT HEADLINE (always visible) */}
      <div
        className={`absolute z-20 ${
          isRTL ? "top-1/4 right-6 sm:right-12" : "top-1/4 left-6 sm:left-12"
        } max-w-2xl`}
        aria-live="polite"
      >
        <div className={`${isRTL ? "text-right" : "text-left"} mb-4`}>
          <span className="uppercase tracking-[0.25em] text-[var(--color-main)]/90 text-xs sm:text-sm font-medium">
            {process.env.NEXT_PUBLIC_BRAND_NAME ?? "ATTAL PROPERTIES"}
          </span>
          <div
            className={`mt-2 h-[2px] w-16 bg-[var(--color-main)] ${
              isRTL ? "ml-auto" : ""
            }`}
          />
        </div>

        <h1 className="text-white drop-shadow-xl text-3xl sm:text-5xl leading-tight font-extrabold">
          {current.title}
        </h1>

        {current.description ? (
          <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
            {current.description}
          </p>
        ) : null}

        {current.href ? (
          <div className="mt-6 pointer-events-auto">
            <Link
              href={current.href}
              className="inline-flex items-center gap-2 border-b-2 border-white/80 text-white text-lg tracking-wide
                         hover:border-[var(--color-main)] transition"
            >
              {current.ctaLabel ?? (isRTL ? "المشاريع" : "Projects")}
              <svg
                className="h-5 w-5"
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
        ) : null}
      </div>

      {/* Top controls */}
      <div
        className={`hidden md:block absolute top-6 sm:top-8 z-30 ${
          isRTL ? "right-6" : "left-6"
        }`}
      >
        <div className="flex flex-col gap-2 min-w-[14rem] max-w-[22rem] rounded-2xl px-4 py-3">
          <div
            className={`flex justify-between items-center gap-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="grid h-9 w-9 place-items-center rounded-full outline-none bg-white/10 hover:bg-white/20 ring-1 ring-white/20 transition"
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

            <div className="tabular-nums tracking-widest text-base sm:text-lg font-extrabold text-white drop-shadow">
              {currentDisplay}
              <span className="opacity-70"> / </span>
              {totalDisplay}
            </div>

            <button
              onClick={next}
              aria-label="Next slide"
              className="grid h-9 w-9 place-items-center rounded-full outline-none bg-white/10 hover:bg-white/20 ring-1 ring-white/20 transition"
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

          <div className="relative mt-2 h-[4px] w-56 rounded-full bg-white/25 overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 h-full rounded-full bg-gradient-to-r from-[var(--color-main)] to-[var(--color-secondary)]"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Overlay (above images, below text) */}
      <div
        data-hero-overlay
        className="pointer-events-none absolute inset-0 z-[5]"
      />

      {/* Slides with per-slide panel (animated) */}
      {data.map((s, i) => (
        <div
          key={i}
          data-slide={i}
          className="absolute inset-0 bg-black"
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${data.length}`}
        >
          {/* UNDERLAY behind image */}
          <div
            data-hero-underlay
            className="absolute inset-0 z-[1] pointer-events-none"
          />

          {/* IMAGE */}
          <Image
            data-hero-image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover z-[2] will-change-transform will-change-opacity"
            priority={i === 0}
            sizes="100vw"
          />

          {/* veil below text */}
          <div className="absolute inset-0 z-[6] bg-ink/25" />

          {/* OLD CONTENT PANEL (per-slide) — participates in animation */}
          <div
            data-hero-panel
            className="absolute z-10 end-0 bottom-0 w-full lg:max-w-2xl p-3 lg:p-0"
          >
            {/* Wrapper so we can place an ambient shadow under the card */}
            <div className="relative mx-auto lg:ms-auto lg:me-0 group">
              {/* Ambient floor shadow (creates the 'space under' illusion) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-4 -bottom-6 h-10
                 rounded-[999px] bg-black/55 blur-2xl opacity-80
                 group-hover:opacity-95 transition"
              />

              {/* Card */}
              <div
                className="relative px-5 py-4 sm:px-6 sm:py-6
                 bg-gradient-to-r from-main-dark via-[var(--color-main)]/45 to-main-dark/75
                 backdrop-blur-md backdrop-saturate-150
                 ring-1 ring-white/20
                 /* layered, deeper, softer shadow */
                 shadow-[0_18px_60px_rgba(0,0,0,0.55),0_35px_55px_-20px_rgba(0,0,0,0.65)]
                 text-white"
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
        </div>
      ))}
    </div>
  );
}
