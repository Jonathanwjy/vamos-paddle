"use client";

import { motion, Variants } from "framer-motion";
import { Trophy, Users, Star, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    title: "Premium Quality",
    description: "Rumput sintetis dan kaca berstandar turnamen internasional.",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Bergabunglah dengan ribuan pemain padel dari berbagai level.",
  },
  {
    icon: Star,
    title: "Top Tier Gear",
    description: "Penyewaan raket dan bola kualitas premium selalu tersedia.",
  },
  {
    icon: ShieldCheck,
    title: "Easy Booking",
    description: "Sistem reservasi instan yang bebas ribet dan terpercaya.",
  },
];

export default function AboutPage() {
  // Animasi untuk transisi fade-up sederhana
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Animasi berantai (stagger) untuk grid/kartu
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        {/* Background glow effect - Menggunakan warna primary dengan opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vh] w-[40vw] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-3xl space-y-6"
        >
          <motion.p
            variants={fadeUpVariant}
            className="text-sm font-bold uppercase tracking-widest text-primary"
          >
            About CourtBook
          </motion.p>
          <motion.h1
            variants={fadeUpVariant}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Elevating the <br /> Padel Experience
          </motion.h1>
          <motion.p
            variants={fadeUpVariant}
            className="mx-auto max-w-xl text-lg text-muted-foreground"
          >
            Kami hadir untuk memberikan fasilitas olahraga padel terbaik. Bukan
            sekadar lapangan, tapi rumah bagi komunitas padel yang solid dan
            terus bertumbuh.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. OUR STORY / IMAGE SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Gambar dengan efek paralaks ringan */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted"
          >
            <img
              src="https://images.unsplash.com/photo-1628292262973-10d937a098ed?w=1000&q=80"
              alt="Padel Court"
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay border menggunakan shadcn border */}
            <div className="absolute inset-0 rounded-3xl border border-border" />
          </motion.div>

          {/* Teks Penjelasan */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h2
              variants={fadeUpVariant}
              className="text-3xl font-bold sm:text-4xl"
            >
              Lebih dari Sekadar <span className="text-primary">Lapangan</span>
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Didirikan dengan hasrat untuk memajukan olahraga padel, CourtBook
              dirancang untuk memenuhi kebutuhan pemain modern. Kami
              menggabungkan infrastruktur kelas atas dengan kemudahan teknologi.
            </motion.p>
            <motion.p
              variants={fadeUpVariant}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Apakah Anda baru pertama kali memegang raket atau sedang bersiap
              untuk turnamen nasional, fasilitas kami siap mendukung performa
              maksimal Anda.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="pt-4">
              <div className="flex gap-8 border-t border-border pt-8">
                <div>
                  <p className="text-4xl font-bold text-foreground">6+</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Premium Courts
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-foreground">24/7</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Availability
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      {/* Menggunakan bg-secondary atau bg-muted untuk memberi sedikit perbedaan warna dari background utama */}
      <section className="bg-secondary/30 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16 text-center"
          >
            <motion.h2
              variants={fadeUpVariant}
              className="text-3xl font-bold sm:text-4xl"
            >
              Mengapa Memilih Kami?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariant}
                  // Menggunakan bg-card dan text-card-foreground standar shadcn
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:bg-muted"
                >
                  <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                    {stat.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
