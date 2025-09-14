"use client"
import { useEffect } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, X } from "lucide-react"

export default function HeaderDrawer({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest(".mobile-drawer") && !e.target.closest(".menu-button")) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="mobile-drawer fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        {/* Drawer header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">Dharia Events</h2>
          <button onClick={onClose} className="p-2 text-foreground hover:text-primary rounded-lg hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex flex-col p-6 space-y-6 h-full overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Services
            </Link>
            <Link
              href="/events"
              className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Events
            </Link>
            <Link
              href="/gallery"
              className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Blog
            </Link>
            <Link
              href="/reviews"
              className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Reviews
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Contact
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-border">
            <Link
              href="/book"
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-block text-center font-medium"
              onClick={onClose}
            >
              Book Event
            </Link>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>9122447574</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>dhariaevents@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Hazaribagh, Ranchi, Jharkhand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
