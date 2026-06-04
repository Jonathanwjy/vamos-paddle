"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { Star, Quote, ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CountUp } from "../lightswind/count-up";
import { BREAKDOWN, REVIEWS, STATS } from "@/src/constants/welcome-constant";
import { fadeUp, stagger } from "@/src/utils/variants";

// ─── Data ────────────────────────────────────────────────────────────────────

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i <= rating ? "fill-primary text-primary" : "fill-muted text-muted"
          }
        />
      ))}
    </span>
  );
}

function ReviewCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[0];
  index: number;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.07,
          },
        },
      }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-black/8"
    >
      <Quote className="absolute right-5 top-5 size-6 text-foreground/[0.05] transition-colors duration-300 group-hover:text-primary/10" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {review.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground leading-tight">
              {review.name}
            </p>
            <p className="text-[11px] text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <StarRow rating={review.rating} size={12} />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          {review.court}
        </span>
        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          {review.tag}
        </span>
      </div>

      {/* Body */}
      <p className="text-sm leading-relaxed text-muted-foreground flex-1">
        {review.body}
      </p>

      {/* Helpful */}
      <button
        onClick={() => setLiked((p) => !p)}
        className={[
          "mt-auto flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-200",
          liked
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:text-foreground",
        ].join(" ")}
      >
        <ThumbsUp className="size-3" />
        Membantu ({liked ? review.helpful + 1 : review.helpful})
      </button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border px-6 py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 top-0 h-full w-px -rotate-12 origin-top bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-14 top-0 h-full w-px -rotate-12 origin-top bg-border opacity-50"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 mx-auto max-w-6xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              CourtBook · Ulasan
            </span>
          </motion.div>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Apa Kata
              <br />
              Mereka <span className="text-primary">Tentang</span>
              <br />
              Kami?
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 md:text-right"
            >
              <div className="flex items-center gap-2 md:justify-end">
                <StarRow rating={5} size={18} />
                <span className="text-2xl font-black text-foreground">4.9</span>
              </div>
              <p className="max-w-[220px] text-sm text-muted-foreground md:ml-auto">
                Berdasarkan 1.280+ ulasan terverifikasi dari pelanggan nyata.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── COUNTUP STATS ──────────────────────────────────────── */}
      <section className="border-b border-border bg-secondary/20 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="flex flex-col items-center gap-1 text-center"
              >
                <CountUp {...s} />
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SCORE + BREAKDOWN ──────────────────────────────────── */}
      <section className="border-b border-border px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center"
          >
            {/* Big score */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Skor Keseluruhan
              </p>
              <div className="flex items-end gap-4">
                <span className="font-black text-[88px] leading-none tracking-tight text-foreground">
                  4.9
                </span>
                <div className="mb-3 flex flex-col gap-1.5">
                  <StarRow rating={5} size={20} />
                  <p className="text-sm text-muted-foreground">
                    dari 1.280 ulasan
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Breakdown bars */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              {BREAKDOWN.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-14 shrink-0 text-right text-xs font-semibold text-muted-foreground">
                    {row.stars} ★
                  </span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: (5 - row.stars) * 0.06,
                      }}
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    />
                  </div>
                  <span className="w-10 shrink-0 text-xs tabular-nums text-muted-foreground">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── REVIEWS GRID ───────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Section label */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-10 flex items-end justify-between"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Ulasan Terbaru
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">
                Yang Mereka Rasakan
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="hidden text-xs text-muted-foreground sm:block"
            >
              1.280 ulasan · diperbarui berkala
            </motion.p>
          </motion.div>

          {/* Masonry-style grid: featured top row + rest */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {/* Top row: first review spans wider on desktop */}
            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Featured card — col-span-2 on lg */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="group relative flex flex-col gap-4 rounded-2xl border border-primary/25 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/8 lg:col-span-2"
              >
                {/* Featured badge */}
                <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                  <Star className="size-2.5 fill-primary" />
                  Top Review
                </div>

                <Quote className="size-7 text-primary/15" />

                <p className="text-base leading-relaxed text-card-foreground">
                  "{REVIEWS[0].body}"
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {REVIEWS[0].initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">
                        {REVIEWS[0].name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {REVIEWS[0].date}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StarRow rating={REVIEWS[0].rating} size={12} />
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      {REVIEWS[0].tag}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Second card */}
              <ReviewCard review={REVIEWS[1]} index={1} />
            </div>

            {/* Bottom row: remaining 4 cards equal columns */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {REVIEWS.slice(2).map((r, i) => (
                <ReviewCard key={r.id} review={r} index={i + 2} />
              ))}
            </div>
          </motion.div>

          {/* Load more */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex justify-center"
          >
            <button className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground">
              Tampilkan Lebih Banyak
              <ChevronDown className="size-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
