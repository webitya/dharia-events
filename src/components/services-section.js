import ServiceCard from "./service-card"
import { Heart, Camera, Utensils, Palette, Music, Gift } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: Heart,
      title: "Wedding Planning",
      description: "Complete wedding planning services from engagement to reception",
      features: ["Venue Selection", "Decoration", "Catering", "Photography", "Entertainment"],
      image: "/placeholder-8ddf5.png",
    },
    {
      icon: Gift,
      title: "Birthday Celebrations",
      description: "Memorable birthday parties for all ages with custom themes",
      features: ["Theme Planning", "Cake & Catering", "Entertainment", "Photography", "Party Favors"],
      image: "/placeholder-u6la8.png",
    },
    {
      icon: Camera,
      title: "Photography & Videography",
      description: "Professional photography and videography services",
      features: ["Event Photography", "Videography", "Drone Shots", "Photo Albums", "Digital Gallery"],
      image: "/placeholder-vvxgi.png",
    },
    {
      icon: Utensils,
      title: "Catering Services",
      description: "Delicious catering with diverse menu options",
      features: ["Multi-Cuisine Menu", "Live Counters", "Professional Staff", "Custom Menus", "Dietary Options"],
      image: "/placeholder-pgu17.png",
    },
    {
      icon: Palette,
      title: "Decoration Services",
      description: "Creative decoration and styling for all events",
      features: ["Floral Arrangements", "Lighting Design", "Stage Setup", "Themed Decor", "Backdrop Design"],
      image: "/placeholder-jlz4b.png",
    },
    {
      icon: Music,
      title: "Entertainment",
      description: "Live entertainment and music for your special day",
      features: ["Live Music", "DJ Services", "Dance Performances", "Sound System", "Stage Management"],
      image: "/placeholder-kylzd.png",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Premium Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From intimate gatherings to grand celebrations, we offer comprehensive event management services tailored to
            your unique vision and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
