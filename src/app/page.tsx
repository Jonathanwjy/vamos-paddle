import HeroCarousel from "../components/common/hero-page";
import AboutPage from "../components/common/about-us";
import CourtsPage from "../components/common/about-court";
import ReviewsPage from "../components/common/review";
import ContactPage from "../components/common/contact-page";
import Footer from "../components/common/footer";

// app/page.tsx
export default function Home() {
  return (
    <main className="flex-1 w-full mx-auto">
      <section id="home">
        {" "}
        <HeroCarousel />{" "}
      </section>
      <section id="about">
        {" "}
        <AboutPage />{" "}
      </section>
      <section id="courts">
        {" "}
        <CourtsPage />{" "}
      </section>
      <section id="review">
        {" "}
        <ReviewsPage />{" "}
      </section>
      <section id="contact">
        {" "}
        <ContactPage />{" "}
      </section>
      <Footer />
    </main>
  );
}
