"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/src/utils/variants";
import { CONTACT_INFO } from "@/src/constants/welcome-constant";

export default function ContactPage() {
  // Variabel Animasi

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* 1. HEADER SECTION */}
      <section className="relative flex min-h-[45vh] flex-col items-center justify-center px-6 py-20 text-center border-b border-border bg-secondary/20">
        {/* Subtle glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30vh] w-[50vw] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-2xl space-y-4"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hubungi <span className="text-primary">Kami</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
            Punya pertanyaan tentang penyewaan lapangan, turnamen, atau kerja
            sama? Tim CourtBook siap membantu Anda kapan saja.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. CONTACT CARDS SECTION */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {CONTACT_INFO.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
              >
                <div>
                  <div className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-card-foreground">
                    {info.title}
                  </h3>
                  <p className="mb-4 text-lg font-medium text-foreground">
                    {info.details}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {info.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href={info.actionLink}
                    target={info.icon === MapPin ? "_blank" : "_self"}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10 group/btn"
                    >
                      {info.actionText}
                      <ExternalLink className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
}
