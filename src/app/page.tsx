import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroCarousel from "../components/common/hero-page";
import AboutPage from "../components/common/about-us";
import CourtsPage from "../components/common/about-court";
import ReviewsPage from "../components/common/review";
import ContactPage from "../components/common/contact-page";
import Footer from "../components/common/footer";

export default function Home() {
  return (
    <main className="flex-1 w-full mx-auto">
      <HeroCarousel />
      <AboutPage />
      <CourtsPage />
      <ReviewsPage />
      <ContactPage />
      <Footer />
    </main>
  );
}
