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

}

const banners: BannerSlide[] = [
  {
    id: 1,
    image: "/images/carousel-1.png",
   
  },
  {
    id: 2,
    image: "/images/carousel-2.png",
   
  },
  {
    id: 3,
    image: "/images/carousel-3.png",
    
  },
];

function BannerCard({ slide }: { slide: BannerSlide }) {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden select-none">
      <img
        src={slide.image}

        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}

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
    <div className="w-full space-y-3 min-h-[200px]">
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
        <CarouselPrevious />
        <CarouselNext />
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
