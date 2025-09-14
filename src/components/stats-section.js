import { Users, Calendar, Star, Award } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Happy Clients",
      description: "Satisfied customers across Jharkhand",
    },
    {
      icon: Calendar,
      number: "1000+",
      label: "Events Organized",
      description: "Successfully managed events",
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Average Rating",
      description: "Based on client reviews",
    },
    {
      icon: Award,
      number: "5+",
      label: "Years Experience",
      description: "In event management industry",
    },
  ]

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Achievements</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Numbers that speak for our commitment to excellence and client satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <p className="opacity-80">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
