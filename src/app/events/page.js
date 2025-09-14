import Header from "../../components/header"
import Footer from "../../components/footer"
import EventCard from "../../components/event-card"
import { Search, Calendar } from "lucide-react"

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Royal Wedding Package",
      description: "Complete luxury wedding planning with premium amenities and services",
      date: "Available Year Round",
      location: "Multiple Premium Venues",
      capacity: 500,
      price: "2,50,000",
      status: "Popular",
      rating: 4.9,
      reviews: 45,
      image: "/placeholder.svg?key=wedding2",
      category: "wedding",
    },
    {
      id: 2,
      title: "Intimate Wedding Package",
      description: "Perfect for small, intimate wedding celebrations with close family",
      date: "Flexible Dates",
      location: "Garden Venues",
      capacity: 100,
      price: "1,25,000",
      status: "Trending",
      rating: 4.8,
      reviews: 32,
      image: "/placeholder.svg?key=wedding3",
      category: "wedding",
    },
    {
      id: 3,
      title: "Kids Birthday Celebration",
      description: "Fun-filled birthday parties with themes, games, and entertainment",
      date: "Weekends Available",
      location: "Indoor/Outdoor Venues",
      capacity: 50,
      price: "25,000",
      status: "New",
      rating: 4.7,
      reviews: 28,
      image: "/placeholder.svg?key=birthday2",
      category: "birthday",
    },
    {
      id: 4,
      title: "Adult Birthday Party",
      description: "Elegant birthday celebrations for adults with sophisticated themes",
      date: "Flexible Timing",
      location: "Banquet Halls",
      capacity: 100,
      price: "45,000",
      status: "Popular",
      rating: 4.6,
      reviews: 22,
      image: "/placeholder.svg?key=birthday3",
      category: "birthday",
    },
    {
      id: 5,
      title: "Corporate Conference",
      description: "Professional corporate events with full technical support",
      date: "Weekdays Preferred",
      location: "Conference Centers",
      capacity: 200,
      price: "75,000",
      status: "Available",
      rating: 4.8,
      reviews: 18,
      image: "/placeholder.svg?key=corporate2",
      category: "corporate",
    },
    {
      id: 6,
      title: "Product Launch Event",
      description: "Grand product launch events with media coverage and networking",
      date: "Custom Scheduling",
      location: "Premium Venues",
      capacity: 300,
      price: "1,50,000",
      status: "Premium",
      rating: 4.9,
      reviews: 15,
      image: "/placeholder.svg?key=corporate3",
      category: "corporate",
    },
    {
      id: 7,
      title: "Traditional Engagement",
      description: "Beautiful traditional engagement ceremonies with cultural elements",
      date: "Auspicious Dates",
      location: "Traditional Venues",
      capacity: 150,
      price: "65,000",
      status: "Popular",
      rating: 4.7,
      reviews: 35,
      image: "/placeholder.svg?key=engagement2",
      category: "engagement",
    },
    {
      id: 8,
      title: "Modern Engagement Party",
      description: "Contemporary engagement celebrations with modern themes and styling",
      date: "Flexible Dates",
      location: "Modern Venues",
      capacity: 120,
      price: "55,000",
      status: "Trending",
      rating: 4.6,
      reviews: 25,
      image: "/placeholder.svg?key=engagement3",
      category: "engagement",
    },
    {
      id: 9,
      title: "Photography Session",
      description: "Professional photography services for events and portraits",
      date: "Daily Available",
      location: "Any Location",
      capacity: 20,
      price: "15,000",
      status: "Available",
      rating: 4.8,
      reviews: 42,
      image: "/placeholder.svg?key=photo2",
      category: "photography",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Our Event Packages</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-pretty">
              Discover our comprehensive event packages designed to make your celebrations memorable and stress-free
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-4">
                <select className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">All Categories</option>
                  <option value="wedding">Weddings</option>
                  <option value="birthday">Birthdays</option>
                  <option value="corporate">Corporate</option>
                  <option value="engagement">Engagements</option>
                  <option value="photography">Photography</option>
                </select>
                <select className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Price Range</option>
                  <option value="0-50000">Under ₹50,000</option>
                  <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                  <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                  <option value="200000+">Above ₹2,00,000</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Do not See What You are Looking For?</h2>
            <p className="text-xl mb-8 opacity-90">
              We create custom event packages tailored to your specific needs and budget. Let s discuss your vision!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Call Now: 9122447574
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
