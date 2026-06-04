"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV = [
  {
    heading: "Lapangan",
    links: [
      { label: "VIP Panoramic Indoor", href: "/courts/vip-indoor" },
      { label: "Pro Outdoor Blue", href: "/courts/pro-outdoor" },
      { label: "Standard Semi-Indoor", href: "/courts/semi-indoor" },
      { label: "Booking Sekarang", href: "/bookings/create" },
    ],
  },
  {
    heading: "CourtBook",
    links: [
      { label: "Tentang Kami", href: "/about" },
      { label: "Ulasan", href: "/reviews" },
      { label: "Komunitas", href: "/community" },
      { label: "Kontak", href: "/contact" },
    ],
  },
  {
    heading: "Informasi",
    links: [
      { label: "Kebijakan Privasi", href: "/privacy" },
      { label: "Syarat & Ketentuan", href: "/terms" },
      { label: "FAQ", href: "/faq" },
      { label: "Jadwal & Harga", href: "/pricing" },
    ],
  },
];

const CONTACT = [
  { icon: MapPin, text: "Jl. Padel Raya No. 12, Palembang, Sumatera Selatan" },
  { icon: Phone, text: "+62 812-3456-7890" },
  { icon: Mail, text: "hello@courtbook.id" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-primary text-primary-foreground">
      {/* Dot grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ── Top: brand + nav ── */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand block — takes 2 of 5 cols */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="group flex items-baseline gap-1 w-fit">
              <span className="text-2xl font-black tracking-tight text-foreground">
                Court
              </span>
              <span className="text-2xl font-black tracking-tight text-primary">
                Book
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground">
              Fasilitas padel premium dengan standar kelas dunia. Temukan
              lapangan, book instan, dan mulai bermain hari ini.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-3">
              {CONTACT.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-2.5 text-xs text-primary-foreground"
                >
                  <Icon className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns — 3 of 5 cols */}
          {NAV.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-primary-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-primary-foreground">
            © {new Date().getFullYear()} CourtBook. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-xs text-primary-foreground">
              Buka setiap hari · 06.00 – 23.00 WIB
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
