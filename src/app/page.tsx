import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroCarousel from "../components/common/hero-page";
import AboutPage from "../components/common/about-us";

export default function Home() {
  return (
    <main className="flex-1 w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      <HeroCarousel />
      <AboutPage />
      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        <Button size="lg" className="cursor-pointer">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </main>
  );
}
