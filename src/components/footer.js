import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">Dharia Events</h3>
            <p className="text-gray-300 mb-4">
              Premier event management services in Jharkhand. We specialize in creating unforgettable experiences for
              weddings, birthdays, corporate events, and special celebrations.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/services" className="block text-gray-300 hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="/events" className="block text-gray-300 hover:text-primary transition-colors">
                Events
              </Link>
              <Link href="/gallery" className="block text-gray-300 hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-300">9122447574</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-gray-300">dhariaevents@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span className="text-gray-300">
                  Hazaribagh, Ranchi
                  <br />
                  Jharkhand, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Dharia Events. All rights reserved. | Designed with ❤️ for unforgettable celebrations
          </p>
        </div>
      </div>
    </footer>
  )
}
