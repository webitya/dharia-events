import { ArrowRight } from "lucide-react"

export default function ServiceCard({ icon: Icon, title, description, features, image }) {
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <Icon className="w-8 h-8 mb-2" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-muted-foreground mb-4">{description}</p>

        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group">
          Learn More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
