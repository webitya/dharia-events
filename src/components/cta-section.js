import Link from "next/link"
import { Calendar, Phone } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Plan Your Perfect Event?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 text-pretty">
          Let us bring your vision to life with our expert event management services. Contact us today for a free
          consultation and quote.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Book Consultation
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg opacity-80">
            Call us directly: <span className="font-semibold">9122447574</span> | Email:{" "}
            <span className="font-semibold">dhariaevents@gmail.com</span>
          </p>
        </div>
      </div>
    </section>
  )
}
