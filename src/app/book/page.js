"use client"
import { useState } from "react"
import Header from "../../components/header"
import Footer from "../../components/footer"
import BookingForm from "../../components/booking-form"
import { Calendar, Users, CheckCircle } from "lucide-react"

export default function BookPage() {
  const [selectedPackage, setSelectedPackage] = useState(null)

  const packages = [
    {
      id: 1,
      name: "Royal Wedding Package",
      price: 250000,
      description: "Complete luxury wedding planning with premium amenities",
      features: [
        "Venue decoration and setup",
        "Professional photography & videography",
        "Catering for 500 guests",
        "Bridal makeup and styling",
        "Entertainment and music",
        "Wedding planning coordination",
      ],
      duration: "Full day event",
      capacity: "Up to 500 guests",
    },
    {
      id: 2,
      name: "Intimate Wedding Package",
      price: 125000,
      description: "Perfect for small, intimate wedding celebrations",
      features: [
        "Venue decoration",
        "Photography services",
        "Catering for 100 guests",
        "Basic entertainment",
        "Event coordination",
        "Floral arrangements",
      ],
      duration: "Half day event",
      capacity: "Up to 100 guests",
    },
    {
      id: 3,
      name: "Birthday Celebration",
      price: 35000,
      description: "Fun-filled birthday parties with themes and entertainment",
      features: [
        "Theme-based decoration",
        "Birthday cake arrangement",
        "Entertainment and games",
        "Photography",
        "Party favors",
        "Catering services",
      ],
      duration: "4-6 hours",
      capacity: "Up to 100 guests",
    },
    {
      id: 4,
      name: "Corporate Event",
      price: 125000,
      description: "Professional corporate events and conferences",
      features: [
        "Venue setup and decoration",
        "Audio-visual equipment",
        "Catering services",
        "Registration management",
        "Photography coverage",
        "Event coordination",
      ],
      duration: "Full day",
      capacity: "Up to 200 guests",
    },
    {
      id: 5,
      name: "Engagement Ceremony",
      price: 65000,
      description: "Beautiful engagement ceremonies with traditional elements",
      features: [
        "Traditional decoration",
        "Ring ceremony setup",
        "Photography & videography",
        "Catering services",
        "Entertainment",
        "Guest coordination",
      ],
      duration: "Half day",
      capacity: "Up to 150 guests",
    },
    {
      id: 6,
      name: "Custom Package",
      price: 0,
      description: "Tailored package based on your specific requirements",
      features: [
        "Personalized planning",
        "Custom decoration themes",
        "Flexible catering options",
        "Photography as needed",
        "Entertainment selection",
        "Budget-friendly options",
      ],
      duration: "As per requirement",
      capacity: "Flexible",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Book Your Event</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-pretty">
              Choose from our premium packages or create a custom solution for your special celebration
            </p>
          </div>
        </section>

        {/* Package Selection */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Choose Your Package</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Select from our carefully crafted packages or let us create something unique for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-card rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedPackage?.id === pkg.id ? "ring-2 ring-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {pkg.price === 0 ? "Custom Quote" : `₹${pkg.price.toLocaleString()}`}
                    </div>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{pkg.capacity}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      selectedPackage?.id === pkg.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedPackage?.id === pkg.id ? "Selected" : "Select Package"}
                  </button>
                </div>
              ))}
            </div>

            {/* Booking Form */}
            {selectedPackage && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-card rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Complete Your Booking</h3>
                  <BookingForm selectedPackage={selectedPackage} />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
