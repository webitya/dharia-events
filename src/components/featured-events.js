import EventCard from "./event-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function FeaturedEvents() {
  const featuredEvents = [
    {
      id: 1,
      title: "Royal Wedding Package",
      description: "Complete wedding planning with luxury amenities",
      date: "Available Year Round",
      location: "Multiple Venues",
      capacity: 500,
      price: "2,50,000",
      status: "Popular",
      rating: 4.9,
      reviews: 45,
      image: "/placeholder-s2wt2.png",
    },
    {
      id: 2,
      title: "Birthday Celebration",
      description: "Themed birthday parties with entertainment",
      date: "Flexible Dates",
      location: "Indoor/Outdoor",
      capacity: 100,
      price: "25,000",
      status: "Trending",
      rating: 4.8,
      reviews: 32,
      image: "/placeholder-ignpb.png",
    },
    {
      id: 3,
      title: "Corporate Events",
      description: "Professional corporate event management",
      date: "Weekdays Available",
      location: "Conference Halls",
      capacity: 200,
      price: "75,000",
      status: "New",
      rating: 4.7,
      reviews: 18,
      image: "/placeholder-2ei1w.png",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Events</h2>
            <p className="text-xl text-muted-foreground">Discover our most popular event packages and services</p>
          </div>
          <Link
            href="/events"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            View All Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
