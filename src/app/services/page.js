import Header from "../../components/header"
import Footer from "../../components/footer"
import ServiceCard from "../../components/service-card"
import ReviewForm from "../../components/review-form"
import { Heart, Camera, Utensils, Palette, Music, Gift, Users, Sparkles } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Heart,
      title: "Wedding Planning",
      description:
        "Complete wedding planning services from engagement to reception with personalized attention to every detail.",
      features: [
        "Venue Selection & Booking",
        "Bridal & Groom Styling",
        "Catering & Menu Planning",
        "Photography & Videography",
        "Entertainment & Music",
        "Floral & Decoration",
      ],
      image: "/placeholder.svg?key=wedding1",
    },
    {
      icon: Gift,
      title: "Birthday Celebrations",
      description: "Memorable birthday parties for all ages with custom themes and entertainment packages.",
      features: [
        "Theme Planning & Setup",
        "Cake & Dessert Arrangements",
        "Entertainment & Games",
        "Photography Services",
        "Party Favors & Gifts",
        "Venue Decoration",
      ],
      image: "/placeholder.svg?key=birthday1",
    },
    {
      icon: Users,
      title: "Corporate Events",
      description: "Professional corporate event management for conferences, seminars, and business celebrations.",
      features: [
        "Conference Planning",
        "Audio-Visual Setup",
        "Catering Services",
        "Registration Management",
        "Networking Events",
        "Award Ceremonies",
      ],
      image: "/placeholder.svg?key=corporate1",
    },
    {
      icon: Sparkles,
      title: "Engagement Ceremonies",
      description: "Beautiful engagement ceremonies with traditional and modern elements perfectly blended.",
      features: [
        "Venue Decoration",
        "Ring Ceremony Setup",
        "Photography & Videography",
        "Catering Services",
        "Entertainment",
        "Guest Management",
      ],
      image: "/placeholder.svg?key=engagement1",
    },
    {
      icon: Camera,
      title: "Photography & Videography",
      description: "Professional photography and videography services to capture your precious moments forever.",
      features: [
        "Event Photography",
        "Cinematic Videography",
        "Drone Photography",
        "Photo Albums & Prints",
        "Digital Gallery",
        "Live Streaming",
      ],
      image: "/placeholder.svg?key=photo1",
    },
    {
      icon: Utensils,
      title: "Catering Services",
      description: "Delicious catering with diverse menu options and professional service staff.",
      features: [
        "Multi-Cuisine Menus",
        "Live Food Counters",
        "Professional Waiters",
        "Custom Menu Planning",
        "Dietary Accommodations",
        "Beverage Services",
      ],
      image: "/placeholder.svg?key=catering1",
    },
    {
      icon: Palette,
      title: "Decoration Services",
      description: "Creative decoration and styling services to transform any venue into a magical space.",
      features: [
        "Floral Arrangements",
        "Lighting Design",
        "Stage & Backdrop Setup",
        "Themed Decorations",
        "Entrance Decor",
        "Table Settings",
      ],
      image: "/placeholder.svg?key=decoration1",
    },
    {
      icon: Music,
      title: "Entertainment Services",
      description: "Live entertainment and music services to keep your guests engaged and entertained.",
      features: [
        "Live Music Bands",
        "DJ & Sound System",
        "Dance Performances",
        "Cultural Programs",
        "Anchor Services",
        "Special Effects",
      ],
      image: "/placeholder.svg?key=entertainment1",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Our Premium Services</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-pretty">
              From intimate celebrations to grand events, we offer comprehensive services to make your special moments
              unforgettable
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Review Form Section */}
        <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Share Your Experience</h2>
              <p className="text-xl text-gray-600">We had love to hear about your experience with our services</p>
            </div>
            <ReviewForm />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Need a Custom Package?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We can create a personalized service package tailored to your specific requirements and budget.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
              Get Custom Quote
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
