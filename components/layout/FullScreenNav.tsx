"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = { label: string; href: string };

type FullScreenNavProps = {
  brand?: string;
  phoneLabel?: string;
  leftItems?: NavItem[];
  rightItems?: NavItem[];
  localeSwitcher?: { enHref: string; arHref: string };
  className?: string;
};

export default function FullScreenNav({
  brand = "ATTAL PROPERTIES",
  phoneLabel = "19431",
  leftItems,
  rightItems,
  localeSwitcher = { enHref: "/en", arHref: "/ar" },
  className = "",
}: FullScreenNavProps) {
  const pathname = usePathname();
  const isRTL = pathname?.startsWith("/ar") ?? false;
  const [open, setOpen] = useState(false);

  // fixed on scroll
  const [pinned, setPinned] = useState(false);
  const barFixed = open || pinned;

  // measure header height to offset overlay content
  const barRef = useRef<HTMLDivElement | null>(null);
  const [barH, setBarH] = useState(0);
  useEffect(() => {
    const measure = () => setBarH(barRef.current?.offsetHeight ?? 0);
    measure();
    const ro = new ResizeObserver(measure);
    if (barRef.current) ro.observe(barRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setPinned(y > 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // defaults
  const defaults = useMemo(
    () => ({
      left: [
        { label: "About", href: "/about" },
        { label: "Attal Properties", href: "/properties" },
        { label: "Subsidiaries", href: "/subsidiaries" },
        { label: "Our Partners", href: "/partners" },
      ],
      right: [
        { label: "Media Center", href: "/media" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    }),
    []
  );

  const L = leftItems ?? defaults.left;
  const R = rightItems ?? defaults.right;

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  // lock page scroll when open (overlay itself will scroll)
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  // close on route change
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div className={`relative ${className}`}>
      {/* Top Bar */}
      <div
        ref={barRef}
        className={`pointer-events-none ${
          barFixed ? "fixed" : ""
        } top-0 left-0 right-0 z-[60]`}
      >
        <div
          className={`pointer-events-auto transition-all duration-300
      ${
        barFixed
          ? "backdrop-blur-md backdrop-saturate-150 ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,.35)] bg-gradient-to-r from-[var(--color-main)]/22 via-main-dark/70 to-[var(--color-secondary,var(--color-main))]/22"
          : ""
      }`}
        >
          <div
            className={`flex items-center justify-between p-4 sm:p-5 ${
              barFixed ? "" : "bg-main-dark"
            }`}
          >
            {" "}
            {/* Brand */}
            <div className="pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
                aria-label="Go to home"
              >
                <span className="grid place-items-center h-10 w-10 rounded-lg bg-[var(--main-900,#2C3132)] ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,.35)]">
                  <Emblem />
                </span>
                <span className="hidden sm:block text-white/90 tracking-[0.3em] uppercase text-xs">
                  {brand}
                </span>
              </Link>
            </div>
            {/* Locale */}
            <div className="pointer-events-auto">
              <nav
                aria-label="Language"
                className="flex items-center gap-2 text-[13px] text-white/90"
              >
                <Link
                  href={localeSwitcher.enHref}
                  className={`hover:text-[var(--color-main)] transition ${
                    !isRTL ? "text-[var(--color-main)]" : ""
                  }`}
                >
                  EN
                </Link>
                <span className="opacity-60">•</span>
                <Link
                  href={localeSwitcher.arHref}
                  className={`hover:text-[var(--color-main)] transition ${
                    isRTL ? "text-[var(--color-main)]" : ""
                  }`}
                >
                  AR
                </Link>
              </nav>
            </div>
            {/* Phone + Toggle */}
            <div className="pointer-events-auto flex items-center gap-3">
              <a
                href={`tel:${phoneLabel.replace(/\s/g, "")}`}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl
                           bg-[var(--main-900,#2C3132)] text-[var(--color-main)] font-semibold
                           ring-1 ring-white/10 shadow-[0_12px_30px_rgba(0,0,0,.45)] hover:bg-white/5 transition"
              >
                <PhoneIcon />
                <span className="tracking-wide">{phoneLabel}</span>
              </a>

              <button
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={toggle}
                className="group relative h-12 w-12 rounded-xl bg-[var(--main-900,#2C3132)]
                           ring-1 ring-white/10 shadow-[0_12px_30px_rgba(0,0,0,.45)]
                           hover:bg-white/5 transition grid place-items-center"
              >
                <Hamburger open={open} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            key="overlay"
            className="fixed inset-0 z-[50] pointer-events-auto"
            initial={{ clipPath: "circle(0% at 95% 3rem)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 95% 3rem)" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Background */}
            <div className="absolute inset-0 menu-bg bg-main-dark" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_0%,rgba(255,255,255,0.06),rgba(255,255,255,0)_60%)]" />

            {/* Scrollable content (offset by header height) */}
            <div
              className={`relative h-full w-full text-white ${
                isRTL ? "rtl" : ""
              } overflow-y-auto overscroll-contain touch-pan-y`}
              dir={isRTL ? "rtl" : "ltr"}
              style={{
                paddingTop: barH,
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              {/* Grid of links */}
              <div className="container mx-auto px-4 sm:px-10">
                <div className="grid min-h-[calc(100dvh-var(--n,0px))] grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-8 md:py-0 md:items-center">
                  {/* Left column */}
                  <ColumnList headline={brand} items={L} />

                  {/* Right column */}
                  <ColumnList items={R} />

                  {/* Footer */}
                  <div className="md:col-span-2 flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-6 text-sm text-white/80 pb-8">
                    <span className="opacity-80">
                      © El-Attal Holding, {new Date().getFullYear()}
                    </span>
                    <div className="flex items-center gap-4">
                      <SocialIcon kind="instagram" href="#" />
                      <SocialIcon kind="youtube" href="#" />
                      <SocialIcon kind="facebook" href="#" />
                      <SocialIcon kind="linkedin" href="#" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- UI Subcomponents ---------------- */

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6">
      <span
        className={`absolute left-0 top-0 h-[2px] w-full bg-white transition-transform duration-300 ${
          open ? "translate-y-[10px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 bottom-0 h-[2px] w-full bg-white transition-transform duration-300 ${
          open ? "-translate-y-[10px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function Emblem() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className="text-[var(--color-main)]"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M6 8h12M6 12h8M6 16h5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className="text-[var(--color-main)]"
    >
      <path
        d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.89.31 1.76.57 2.6a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.48-1.14a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.6.57A2 2 0 0 1 22 16.92z"
        fill="currentColor"
      />
    </svg>
  );
}

function ColumnList({
  headline,
  items,
}: {
  headline?: string;
  items: NavItem[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className="pt-2 sm:pt-6"
    >
      {headline ? (
        <div className="mb-6 sm:mb-8">
          <span className="uppercase tracking-[0.25em] text-[var(--color-main)]/90 text-xs sm:text-sm font-medium">
            {headline}
          </span>
        </div>
      ) : null}

      <ul className="space-y-6 sm:space-y-8">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group inline-flex items-center gap-3 sm:gap-4 text-white text-xl sm:text-3xl font-semibold"
            >
              <span className="grid place-items-center h-6 w-6 sm:h-7 sm:w-7 rounded-md bg-white/5 ring-1 ring-white/10 shadow-[0_6px_20px_rgba(0,0,0,.25)]">
                <Emblem />
              </span>
              <span className="relative">
                <span className="group-hover:text-white">{it.label}</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white/75 transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SocialIcon({
  kind,
  href,
}: {
  kind: "instagram" | "youtube" | "facebook" | "linkedin";
  href: string;
}) {
  const Icon = {
    instagram: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8ZM9.8 15.5v-7l6.2 3.5-6.2 3.5Z" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M13.5 22v-9h3l.5-4h-3.5V6.3c0-1 .3-1.7 1.8-1.7H17V1.2A22 22 0 0 0 14.7 1c-2.4 0-4 1.5-4 4.2V9H8v4h2.8v9h2.7Z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M20 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h16ZM8.3 19v-8.6H5.6V19h2.7Zm-1.3-9.8c.9 0 1.6-.7 1.6-1.5S7.9 6 7 6c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5ZM21 19v-5.4c0-2.9-1.6-4.3-3.7-4.3-1.7 0-2.5 1-2.9 1.7V10H11c.1 1 .1 9 0 9h3.4v-5c0-.3 0-.5.1-.7.3-.5.9-1 1.9-1 1.3 0 1.8.9 1.8 2.2V19H21Z" />
      </svg>
    ),
  }[kind];
  return (
    <Link
      href={href}
      className="text-white/85 hover:text-white transition grid place-items-center h-8 w-8 rounded-md bg-white/5 ring-1 ring-white/10"
      aria-label={kind}
    >
      {Icon}
    </Link>
  );
}
