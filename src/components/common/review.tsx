"use client";

import {
  motion,
  Variants,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Star, Quote, ThumbsUp, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CountUp } from "../lightswind/count-up";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 4.9, label: "Rating Rata-rata", suffix: "", decimals: 1 },
  { value: 1280, label: "Total Ulasan", suffix: "+", decimals: 0 },
  { value: 98, label: "Kepuasan Pelanggan", suffix: "%", decimals: 0 },
  { value: 7, label: "Tahun Beroperasi", suffix: "+", decimals: 0 },
];

const BREAKDOWN = [
  { stars: 5, count: 1024, pct: 80 },
  { stars: 4, count: 179, pct: 14 },
  { stars: 3, count: 51, pct: 4 },
  { stars: 2, count: 13, pct: 1 },
  { stars: 1, count: 13, pct: 1 },
];

const REVIEWS = [
  {
    id: 1,
    name: "Aditya Pratama",
    initials: "AP",
    court: "VIP Panoramic Indoor",
    date: "28 Mei 2025",
    rating: 5,
    helpful: 42,
    tag: "Fasilitas",
    body: "Lapangannya luar biasa! Kaca panoramik 360° beneran bikin sensasi main jadi beda — terasa profesional banget. AC-nya juga dingin merata, nggak ada sudut yang gerah. Sudah main di sini berkali-kali dan tidak pernah kecewa.",
  },
  {
    id: 2,
    name: "Sari Dewi",
    initials: "SD",
    court: "Pro Outdoor Blue",
    date: "14 Mei 2025",
    rating: 5,
    helpful: 31,
    tag: "Suasana",
    body: "Main pagi-pagi di lapangan outdoor ini beneran refreshing. Udara segar, lampu sorotnya terang banget buat main malam hari. Worth banget dengan harga segitu. Highly recommended buat yang suka sensasi outdoor!",
  },
  {
    id: 3,
    name: "Budi Santoso",
    initials: "BS",
    court: "Standard Semi-Indoor",
    date: "2 Mei 2025",
    rating: 4,
    helpful: 18,
    tag: "Value",
    body: "Pilihan yang tepat untuk budget yang lebih terjangkau. Atap kanopinya melindungi dari panas matahari langsung. Kipas anginnya cukup membantu sirkulasi udara. Satu hal kecil: pencahayaan di sudut tertentu bisa lebih ditingkatkan.",
  },
  {
    id: 4,
    name: "Rina Kusuma",
    initials: "RK",
    court: "VIP Panoramic Indoor",
    date: "19 Apr 2025",
    rating: 5,
    helpful: 56,
    tag: "Pelayanan",
    body: "Proses booking sangat mudah dan staff-nya super ramah! Lapangannya selalu bersih dan terawat setiap kali kami datang. Fasilitas loker dan shower-nya juga memuaskan. Kami rutin pakai untuk latihan tim setiap minggu.",
  },
  {
    id: 5,
    name: "Denny Wijaya",
    initials: "DW",
    court: "Pro Outdoor Blue",
    date: "8 Apr 2025",
    rating: 5,
    helpful: 27,
    tag: "Fasilitas",
    body: "Tekstur permukaan lapangannya enak banget untuk pergerakan kaki. Bola yang keluar dari lapangan juga tidak langsung jatuh ke jalan — ada net pembatas yang bagus. Lampu sorotnya nggak silau dari sudut manapun.",
  },
  {
    id: 6,
    name: "Maya Indira",
    initials: "MI",
    court: "Standard Semi-Indoor",
    date: "22 Mar 2025",
    rating: 4,
    helpful: 14,
    tag: "Value",
    body: "Untuk harga Rp 200 ribu per jam ini sangat layak. Lapangan semi-indoor cocok banget buat yang nggak mau kepanasan tapi juga mau tetap merasakan suasana luar. Saya suka bagian tengah yang ada area duduknya.",
  },
];

const FILTERS = [
  "Semua",
  "Indoor",
  "Outdoor",
  "Semi-Indoor",
  "Bintang 5",
  "Bintang 4",
];

// ─── Components ──────────────────────────────────────────────────────────────

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

// Countup hook using Framer Motion
function useCountUp(target: number, decimals = 0, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent =
            decimals > 0
              ? v.toFixed(decimals)
              : Math.round(v).toLocaleString("id-ID");
        }
      },
    });
    return () => controls.stop();
  }, [inView, target, decimals, duration, motionVal]);

  return ref;
}

function ReviewCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[0];
  index: number;
}) {
  const [liked, setLiked] = useState(false);

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.07,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariant}
      className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/8 hover:border-primary/20"
    >
      {/* Quote icon */}
      <Quote className="absolute right-5 top-5 size-7 text-primary/8 group-hover:text-primary/15 transition-colors duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {review.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">
              {review.name}
            </p>
            <p className="text-[11px] text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <StarRow rating={review.rating} size={13} />
      </div>

      {/* Court + Tag */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          {review.court}
        </span>
        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          {review.tag}
        </span>
      </div>

      {/* Body */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {review.body}
      </p>

      {/* Helpful */}
      <button
        onClick={() => setLiked((p) => !p)}
        className={[
          "mt-auto flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-200",
          liked
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-border bg-transparent text-muted-foreground hover:border-border hover:text-foreground",
        ].join(" ")}
      >
        <ThumbsUp className="size-3" />
        Membantu ({liked ? review.helpful + 1 : review.helpful})
      </button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filtered =
    activeFilter === "Semua"
      ? REVIEWS
      : activeFilter === "Bintang 5"
        ? REVIEWS.filter((r) => r.rating === 5)
        : activeFilter === "Bintang 4"
          ? REVIEWS.filter((r) => r.rating === 4)
          : REVIEWS.filter((r) =>
              r.court.toLowerCase().includes(activeFilter.toLowerCase()),
            );

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border px-6 py-20 md:py-28">
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Diagonal lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 top-0 h-full w-px rotate-[-12deg] origin-top bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-14 top-0 h-full w-px rotate-[-12deg] origin-top bg-border opacity-50"
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
              <p className="text-sm text-muted-foreground max-w-[220px] md:ml-auto">
                Berdasarkan 1.280+ ulasan terverifikasi dari pelanggan nyata.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── COUNTUP STATS ─────────────────────────────────────── */}
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
              <motion.div key={s.label} variants={fadeUp}>
                <CountUp {...s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── RATING BREAKDOWN ──────────────────────────────────── */}
      <section className="px-6 py-14 border-b border-border">
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
                  <span className="w-10 shrink-0 text-xs text-muted-foreground tabular-nums">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FILTER + REVIEWS ──────────────────────────────────── */}
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Filter pills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 flex flex-wrap items-center gap-2"
          >
            <span className="mr-2 hidden items-center gap-1.5 text-xs font-semibold text-muted-foreground sm:flex">
              <Filter className="size-3" /> Filter:
            </span>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={[
                  "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                  activeFilter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                ].join(" ")}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Review grid */}
          <motion.div
            key={activeFilter}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
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

      {/* ─── WRITE A REVIEW CTA ────────────────────────────────── */}
      <section className="border-t border-border px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-14 md:px-14">
            {/* Decorative stars */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-4 opacity-[0.04]"
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="absolute fill-foreground text-foreground"
                  style={{
                    width: 40 + i * 18,
                    height: 40 + i * 18,
                    right: i * 44,
                    top: i * 20,
                  }}
                />
              ))}
            </div>

            {/* Score watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -right-4 select-none font-black text-[160px] leading-none text-foreground/[0.03]"
            >
              4.9
            </span>

            <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <motion.p
                  variants={fadeUp}
                  className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                >
                  Sudah Pernah Main?
                </motion.p>
                <motion.h3
                  variants={fadeUp}
                  className="text-3xl font-black tracking-tight md:text-4xl"
                >
                  Bagikan pengalaman
                  <br />
                  bermainmu di sini.
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground"
                >
                  Ulasanmu membantu ribuan pemain lain menemukan lapangan yang
                  tepat. Hanya butuh 2 menit!
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="shrink-0">
                <Link href="/reviews/create">
                  <Button
                    size="lg"
                    className="h-12 rounded-full px-8 font-semibold"
                  >
                    <Star className="mr-2 size-4" />
                    Tulis Ulasan
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
