"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Sun, CloudRain, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const courtsInfo = [
  {
    id: 1,
    name: "VIP Panoramic Indoor",
    type: "Indoor",
    price: "Rp 250.000",
    period: "/ jam",
    surface: "Mondo Supercourt XN",
    description:
      "Lapangan premium dengan kaca panoramik penuh untuk pengalaman bermain dan menonton terbaik. Bebas cuaca panas dan hujan.",
    features: [
      "Full AC",
      "Kaca Panoramik 360°",
      "Lampu LED Standar WPT",
      "Tribun Mini",
    ],
    icon: CloudRain,
    tag: "PALING POPULER",
    imageUrl:
      "https://images.unsplash.com/photo-1628292262973-10d937a098ed?w=800&q=80",
  },
  {
    id: 2,
    name: "Pro Outdoor Blue",
    type: "Outdoor",
    price: "Rp 150.000",
    period: "/ jam",
    surface: "Texturized Artificial Grass",
    description:
      "Nikmati bermain di bawah langit terbuka. Sangat cocok untuk sesi pagi atau sore hari dengan sirkulasi udara alami yang segar.",
    features: [
      "Udara Terbuka",
      "Lampu Sorot 800W",
      "Area Duduk Santai",
      "Kaca Standar 12mm",
    ],
    icon: Sun,
    tag: null,
    imageUrl:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a631d6?w=800&q=80",
  },
  {
    id: 3,
    name: "Standard Semi-Indoor",
    type: "Semi-Indoor",
    price: "Rp 200.000",
    period: "/ jam",
    surface: "Synthetic Turf",
    description:
      "Solusi sempurna: sirkulasi udara luar ruangan dengan atap kanopi tinggi yang melindungimu dari hujan dan terik matahari langsung.",
    features: [
      "Atap Kanopi Tinggi",
      "Kipas Angin Besar",
      "Pencahayaan Optimal",
      "Kaca Standar 10mm",
    ],
    icon: MapPin,
    tag: null,
    imageUrl:
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&q=80",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CourtsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border px-6 py-24 md:py-32">
        {/* Fine dot grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Diagonal accent line */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 top-0 h-full w-px rotate-[14deg] origin-top bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-16 top-0 h-full w-px rotate-[14deg] origin-top bg-border opacity-50"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 mx-auto max-w-6xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              CourtBook
            </span>
          </motion.div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <motion.h1
              variants={fadeUp}
              className="max-w-lg text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Pilih
              <br />
              <span className="text-primary">Lapangan</span>
              <br />
              Terbaikmu.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-right"
            >
              Tiga pilihan lapangan dengan standar fasilitas kelas dunia.
              Temukan yang paling sesuai dengan gaya permainanmu.
            </motion.p>
          </div>

          {/* Stat bar */}
          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border"
          >
            {[
              { value: "3", label: "Tipe Lapangan" },
              { value: "7+", label: "Tahun Beroperasi" },
              { value: "4.9★", label: "Rating Pelanggan" },
            ].map((s) => (
              <div key={s.label} className="py-5 px-6 first:pl-0 last:pr-0">
                <p className="text-2xl font-black tracking-tight">{s.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── COURTS GRID ─────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {courtsInfo.map((court, idx) => {
              const TypeIcon = court.icon;
              const isFeatured = court.tag !== null;

              return (
                <motion.article
                  key={court.id}
                  variants={cardAnim}
                  className={[
                    "group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300",
                    isFeatured
                      ? "border-primary/40 lg:col-span-1 lg:row-span-1"
                      : "border-border",
                    "bg-card hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10",
                  ].join(" ")}
                >
                  {/* Popular tag */}
                  {isFeatured && (
                    <div className="absolute left-4 top-4 z-20 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                      {court.tag}
                    </div>
                  )}

                  {/* Court number watermark */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-3 z-10 font-black text-[80px] leading-none text-foreground/[0.04] select-none tabular-nums"
                  >
                    0{idx + 1}
                  </span>

                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={court.imageUrl}
                      alt={court.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

                    {/* Type badge — bottom-left of image */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3 py-1 backdrop-blur-sm">
                      <TypeIcon className="size-3 text-primary" />
                      <span className="text-[11px] font-semibold text-foreground">
                        {court.type}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Surface label */}
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {court.surface}
                    </p>

                    <h2 className="mb-2 text-xl font-bold leading-tight tracking-tight text-card-foreground">
                      {court.name}
                    </h2>

                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {court.description}
                    </p>

                    {/* Features */}
                    <ul className="mb-6 grid grid-cols-2 gap-x-3 gap-y-2 flex-1">
                      {court.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Price + CTA */}
                    <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Mulai dari
                        </p>
                        <p className="text-lg font-black text-foreground">
                          {court.price}
                          <span className="ml-1 text-xs font-normal text-muted-foreground">
                            {court.period}
                          </span>
                        </p>
                      </div>

                      <Link href="/bookings/create">
                        <Button
                          size="sm"
                          className={[
                            "h-9 rounded-full px-5 text-xs font-semibold tracking-wide transition-all",
                            isFeatured
                              ? ""
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                          ].join(" ")}
                          variant={isFeatured ? "default" : "secondary"}
                        >
                          Book Sekarang
                          <ArrowRight className="ml-1.5 size-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── COMPARISON TABLE STRIP ──────────────────────────── */}
      <section className="border-y border-border bg-secondary/20 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Perbandingan Singkat
            </motion.p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-semibold text-foreground w-36">
                      Fitur
                    </th>
                    {courtsInfo.map((c) => (
                      <th
                        key={c.id}
                        className="pb-3 text-center font-semibold text-foreground px-4"
                      >
                        {c.type}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { label: "AC / Pendingin", values: [true, false, false] },
                    { label: "Tahan Hujan", values: [true, false, true] },
                    { label: "Lampu Malam", values: [true, true, true] },
                    { label: "Sirkulasi Alami", values: [false, true, true] },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="py-3 text-muted-foreground">
                        {row.label}
                      </td>
                      {row.values.map((v, i) => (
                        <td key={i} className="py-3 text-center">
                          {v ? (
                            <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary">
                              <Check className="size-3" />
                            </span>
                          ) : (
                            <span className="inline-block size-5 rounded-full bg-muted" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ──────────────────────────────────────── */}
    </main>
  );
}
