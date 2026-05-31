import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroCarousel from "../components/common/hero-page";

export default function Home() {
  return (
    <div className="">
      <main className="flex-1">
        <HeroCarousel />
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Button size="lg" className="cursor-pointer">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
