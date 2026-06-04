"use client";

import { motion, Variants } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ABOUT_US_CONTENT, TIMELINE } from "@/src/constants/welcome-constant";
import { fadeUp, stagger } from "@/src/utils/variants";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border px-6 py-24 md:py-32">
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
        <div
          aria-hidden
          className="pointer-events-none absolute right-24 top-0 h-full w-px rotate-[12deg] origin-top bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-44 top-0 h-full w-px rotate-[12deg] origin-top bg-border opacity-40"
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
              About Us
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Elevating
              <br />
              the Padel
              <br />
              <span className="text-primary">Experience.</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-5 lg:pb-2"
            >
              <p className="text-base leading-relaxed text-muted-foreground max-w-md">
                Kami hadir untuk memberikan fasilitas olahraga padel terbaik.
                Bukan sekadar lapangan — tapi rumah bagi komunitas yang solid
                dan terus bertumbuh.
              </p>
              <Link href="/bookings/create">
                <Button className="w-fit rounded-full px-7 font-semibold">
                  Coba Lapangan Kami
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── STORY SECTION ──────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Image block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1628292262973-10d937a098ed?w=1000&q=80"
                  alt="CourtBook Padel Court"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 rounded-3xl border border-border" />
                {/* Gradient scrim bottom */}
                <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-background/60 to-transparent rounded-b-3xl" />
              </div>

              {/* Floating pill — bottom of image */}
              <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-lg shadow-black/10">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Trophy className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-card-foreground">
                    Standar WPT
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    World Padel Tour Certified
                  </p>
                </div>
              </div>

              {/* Small decorative square */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-2xl border border-border opacity-60"
              />
            </motion.div>

            {/* Text block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Cerita Kami
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl font-black leading-tight tracking-tight md:text-5xl"
              >
                Lebih dari Sekadar
                <br />
                <span className="text-primary">Lapangan.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-base leading-relaxed text-muted-foreground"
              >
                Didirikan dengan hasrat untuk memajukan olahraga padel,
                CourtBook dirancang untuk memenuhi kebutuhan pemain modern. Kami
                menggabungkan infrastruktur kelas atas dengan kemudahan
                teknologi yang benar-benar berpihak pada pengguna.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base leading-relaxed text-muted-foreground"
              >
                Apakah kamu baru pertama kali memegang raket atau sedang bersiap
                untuk turnamen nasional — fasilitas kami siap mendukung performa
                terbaik di setiap sesi.
              </motion.p>

              {/* Inline stat pair */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 gap-6 border-t border-border pt-7"
              >
                {[
                  { value: "7+", label: "Tahun Beroperasi" },
                  { value: "24 / 7", label: "Jam Operasional" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-black tracking-tight text-foreground">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ───────────────────────────────────────────── */}
      <section className="border-y border-border bg-secondary/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Perjalanan Kami
            </motion.p>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  variants={fadeUp}
                  className="relative cursor-pointer flex flex-col gap-3 border-l-2 border-border pl-5 hover:border-primary transition-colors duration-300"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="font-black text-3xl text-primary tabular-nums">
                    {t.year}
                  </span>
                  <p className="text-sm font-bold text-foreground">{t.label}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES GRID ─────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <motion.h2
                variants={fadeUp}
                className="text-4xl font-black tracking-tight md:text-5xl"
              >
                Mengapa Memilih
                <br />
                <span className="text-primary">Kami?</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ABOUT_US_CONTENT.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.num}
                    variants={{
                      hidden: { opacity: 0, y: 36 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.65,
                          ease: [0.22, 1, 0.36, 1],
                          delay: i * 0.08,
                        },
                      },
                    }}
                    className="group relative cursor-pointer flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/8"
                  >
                    {/* Number watermark */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-2 select-none font-black text-[56px] leading-none text-foreground/[0.04] tabular-nums"
                    >
                      {v.num}
                    </span>

                    {/* Icon */}
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-card-foreground">
                        {v.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {v.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="mt-auto h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
