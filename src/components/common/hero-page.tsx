"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    tag: "Premium Courts",
    heading: "Where Champions\nAre Made",
    subheading:
      "World-class badminton courts with professional-grade flooring, lighting, and equipment. Book your slot in seconds.",
    cta: { label: "Book a Court", href: "/reservation" },
    accent: "#16a34a", // green-600
    bg: "from-[#0a1a0f] to-[#0f2d1a]",
    imageUrl:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1400&q=80",
  },
  {
    id: 2,
    tag: "Indoor & Outdoor",
    heading: "Six Courts,\nInfinite Possibilities",
    subheading:
      "Whether you're a beginner or a competitive player, our courts cater to every level. Flexible time slots, every day.",
    cta: { label: "View Courts", href: "/courts" },
    accent: "#0ea5e9", // sky-500
    bg: "from-[#071525] to-[#0c2040]",
    imageUrl:
      "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=1400&q=80",
  },
  {
    id: 3,
    tag: "Community",
    heading: "Play Together,\nGrow Together",
    subheading:
      "Join weekly tournaments, coaching clinics, and community events. Be part of the CourtBook family.",
    cta: { label: "Read Reviews", href: "/review" },
    accent: "#f59e0b", // amber-500
    bg: "from-[#1a1205] to-[#2d1f08]",
    imageUrl:
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=1400&q=80",
  },
];

const SLIDE_DURATION = 6000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((index: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrent((index + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 100 / (SLIDE_DURATION / 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [paused, next]);

  const slide = SLIDES[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: "75svh",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            {/* Overlay gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-80`}
            />
            {/* Noise texture overlay for depth */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full max-w-7xl mx-auto flex-col justify-end px-6 pb-20 sm:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Tag */}
              <div className="mb-5 inline-flex items-center gap-2">
                <span
                  className="h-px w-8"
                  style={{ backgroundColor: slide.accent }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: slide.accent }}
                >
                  {slide.tag}
                </span>
              </div>

              {/* Heading */}
              <h1 className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {slide.heading.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              {/* Subheading */}
              <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                {slide.subheading}
              </p>

              {/* CTA */}
              <Link
                href={slide.cta.href}
                className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300"
                style={{
                  backgroundColor: slide.accent,
                  boxShadow: `0 0 32px ${slide.accent}55`,
                }}
              >
                {slide.cta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="absolute bottom-20 right-6 z-20 flex items-center gap-2 sm:right-10">
        <button
          onClick={prev}
          className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={next}
          className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 sm:left-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="group relative h-[3px] overflow-hidden rounded-full transition-all duration-300"
            style={{ width: i === current ? 48 : 20 }}
            aria-label={`Go to slide ${i + 1}`}
          >
            {/* Track */}
            <span className="absolute inset-0 rounded-full bg-white/30" />
            {/* Fill */}
            {i === current && (
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  backgroundColor: slide.accent,
                  width: `${progress}%`,
                }}
              />
            )}
            {i < current && (
              <span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: slide.accent }}
              />
            )}
          </button>
        ))}

        {/* Slide counter */}
        <span className="ml-1 text-xs font-medium tabular-nums text-white/50">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Subtle vignette bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-background/30 to-transparent" />
    </section>
  );
}
