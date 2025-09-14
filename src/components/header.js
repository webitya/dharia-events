"use client"
import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Menu } from "lucide-react"
import HeaderDrawer from "./headerDrawer"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="hidden md:block bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-sm font-medium mx-4">
              🎉 Welcome to Dharia Events - Your Premier Event Management Partner in Jharkhand 🎉
            </span>
            <span className="text-sm font-medium mx-4">✨ Creating Unforgettable Moments Since Years ✨</span>
            <span className="text-sm font-medium mx-4">🎊 Professional Event Planning & Management Services 🎊</span>
          </div>
        </div>

        {/* Top contact bar */}
        <div className="bg-primary text-primary-foreground py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>9122447574</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>dhariaevents@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Hazaribagh, Ranchi, Jharkhand</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Dharia Events
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="/events" className="text-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link href="/gallery" className="text-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/reviews" className="text-foreground hover:text-primary transition-colors">
                Reviews
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link
                href="/book"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Book Event
              </Link>
            </div>

            <button onClick={toggleMenu} className="md:hidden p-2 text-foreground hover:text-primary menu-button z-60">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      <HeaderDrawer isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}
