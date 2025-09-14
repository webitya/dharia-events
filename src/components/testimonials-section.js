"use client"
import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya & Rahul",
      event: "Wedding",
      rating: 5,
      text: "Dharia Events made our dream wedding come true! Every detail was perfect, from the decoration to the catering. The team was professional and attentive throughout the entire process.",
      image: "/happy-couple-at-wedding.jpg",
    },
    {
      id: 2,
      name: "Anjali Sharma",
      event: "Birthday Party",
      rating: 5,
      text: "Amazing service for my daughter's 10th birthday! The themed decoration and entertainment kept all the kids engaged. Highly recommend Dharia Events for family celebrations.",
      image: "/happy-mother-with-daughter-at-birthday-party.jpg",
    },
    {
      id: 3,
      name: "Vikash Kumar",
      event: "Corporate Event",
      rating: 5,
      text: "Professional and efficient service for our company's annual meet. The team handled everything seamlessly, allowing us to focus on our guests. Excellent coordination!",
      image: "/professional-businessman-at-corporate-event.jpg",
    },
    {
      id: 4,
      name: "Sunita & Manoj",
      event: "Engagement",
      rating: 5,
      text: "Beautiful engagement ceremony organized by Dharia Events. The floral arrangements and lighting were stunning. Our families were impressed with the attention to detail.",
      image: "/happy-engaged-couple-with-rings.jpg",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Read testimonials from our satisfied clients who trusted us with their special moments
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-center mb-8 text-pretty">
              {testimonials[currentIndex].text}
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-center">
                <div className="font-semibold text-lg">{testimonials[currentIndex].name}</div>
                <div className="text-muted-foreground">{testimonials[currentIndex].event}</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
