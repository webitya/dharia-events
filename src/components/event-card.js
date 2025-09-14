import { Calendar, MapPin, Users, Star } from "lucide-react"

export default function EventCard({ event }) {
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
          {event.status}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-muted-foreground mb-4">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span>{event.capacity} guests</span>
          </div>
          {event.rating && (
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>
                {event.rating}/5 ({event.reviews} reviews)
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">₹{event.price}</span>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
