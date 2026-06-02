"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface BannerSlide {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
  cta: string;
}

const banners: BannerSlide[] = [
  {
    id: 1,
    image: "/images/carousel-1.png",
    tag: "Promo Perdana",
    title: "Selamat Datang di Arena Padel",
    description:
      "Fasilitas premium dengan lapangan berstandar internasional. Tersedia 6 lapangan indoor & outdoor.",
    cta: "Booking Sekarang",
  },
  {
    id: 2,
    image: "/images/carousel-2.png",
    tag: "Paket Spesial",
    title: "Member Bulanan Hemat 40%",
    description:
      "Daftar member bulan ini dan dapatkan akses jam bebas setiap hari kerja pukul 06.00–09.00.",
    cta: "Lihat Paket",
  },
  {
    id: 3,
    image: "/images/carousel-3.png",
    tag: "Turnamen",
    title: "Padel Cup 2025 — Daftar Sekarang!",
    description:
      "Kompetisi antar klub se-Palembang. Hadiah total Rp 10 juta. Pendaftaran hingga 30 Juni 2025.",
    cta: "Daftar Tim",
  },
];

function BannerCard({ slide }: { slide: BannerSlide }) {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden select-none">
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-7 z-10">
        <span className="inline-block text-[11px] font-semibold tracking-widest uppercase bg-white/20 text-white backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full mb-3 w-fit">
          {slide.tag}
        </span>
        <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-2 drop-shadow">
          {slide.title}
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
          {slide.description}
        </p>
        <button className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-white text-black w-fit hover:bg-white/90 active:scale-95 transition-all">
          {slide.cta} →
        </button>
      </div>
    </div>
  );
}

// PERHATIKAN BARIS INI: Harus pakai "export default function"
export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  console.log("Mencoba merender Carousel...");

  React.useEffect(() => {
    if (!api) {
      console.log("API Carousel belum siap");
      return;
    }

    console.log("API Carousel siap!");
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full space-y-3 bg-red-500 min-h-[200px]">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="p-1">
                <BannerCard slide={banner} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Tombol Next & Prev ditutup sementara untuk tes */}
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>

      <div className="flex justify-center gap-1.5 pb-4">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
