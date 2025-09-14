import Header from "../components/header"
import Footer from "../components/footer"
import HeroSection from "../components/hero-section"
import ServicesSection from "../components/services-section"
import FeaturedEvents from "../components/featured-events"
import TestimonialsSection from "../components/testimonials-section"
import StatsSection from "../components/stats-section"
import CTASection from "../components/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedEvents />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
