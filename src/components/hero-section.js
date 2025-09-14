import Link from "next/link"
import { Play, Star, Users, Calendar } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/placeholder-6e7kk.png" alt="Elegant Event Setup" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Creating <span className="text-primary">Unforgettable</span> Moments
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 text-pretty">
            Premier event management services in Jharkhand. From intimate celebrations to grand weddings, we bring your
            vision to life with elegance and perfection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/book"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Book Your Event
              <Calendar className="w-5 h-5" />
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              View Our Work
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-3xl font-bold">4.9</span>
              </div>
              <p className="text-gray-300">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold">500+</span>
              </div>
              <p className="text-gray-300">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Calendar className="w-5 h-5 text-secondary" />
                <span className="text-3xl font-bold">1000+</span>
              </div>
              <p className="text-gray-300">Events Organized</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
