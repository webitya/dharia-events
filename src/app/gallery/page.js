"use client"
import { useState } from "react"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const galleryImages = [
    {
      id: 1,
      src: "/placeholder.svg?key=gallery1",
      category: "wedding",
      title: "Royal Wedding Ceremony",
      description: "Elegant wedding setup with traditional decorations",
    },
    {
      id: 2,
      src: "/placeholder.svg?key=gallery2",
      category: "wedding",
      title: "Bridal Photography",
      description: "Beautiful bridal portrait session",
    },
    {
      id: 3,
      src: "/placeholder.svg?key=gallery3",
      category: "birthday",
      title: "Kids Birthday Party",
      description: "Colorful themed birthday celebration",
    },
    {
      id: 4,
      src: "/placeholder.svg?key=gallery4",
      category: "corporate",
      title: "Corporate Event",
      description: "Professional business conference setup",
    },
    {
      id: 5,
      src: "/placeholder.svg?key=gallery5",
      category: "engagement",
      title: "Engagement Ceremony",
      description: "Traditional engagement celebration",
    },
    {
      id: 6,
      src: "/placeholder.svg?key=gallery6",
      category: "wedding",
      title: "Wedding Reception",
      description: "Grand wedding reception hall",
    },
    {
      id: 7,
      src: "/placeholder.svg?key=gallery7",
      category: "birthday",
      title: "Adult Birthday",
      description: "Sophisticated adult birthday party",
    },
    {
      id: 8,
      src: "/placeholder.svg?key=gallery8",
      category: "corporate",
      title: "Product Launch",
      description: "Modern product launch event",
    },
    {
      id: 9,
      src: "/placeholder.svg?key=gallery9",
      category: "decoration",
      title: "Floral Arrangements",
      description: "Beautiful floral decoration setup",
    },
    {
      id: 10,
      src: "/placeholder.svg?key=gallery10",
      category: "decoration",
      title: "Stage Decoration",
      description: "Elegant stage backdrop design",
    },
    {
      id: 11,
      src: "/placeholder.svg?key=gallery11",
      category: "catering",
      title: "Food Display",
      description: "Delicious catering spread",
    },
    {
      id: 12,
      src: "/placeholder.svg?key=gallery12",
      category: "catering",
      title: "Live Counter",
      description: "Interactive live food counter",
    },
  ]

  const categories = [
    { id: "all", name: "All" },
    { id: "wedding", name: "Weddings" },
    { id: "birthday", name: "Birthdays" },
    { id: "corporate", name: "Corporate" },
    { id: "engagement", name: "Engagements" },
    { id: "decoration", name: "Decorations" },
    { id: "catering", name: "Catering" },
  ]

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[nextIndex])
  }

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[prevIndex])
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Our Gallery</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-pretty">
              Explore our portfolio of beautifully executed events and celebrations that showcase our expertise and
              creativity
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-white text-foreground hover:bg-primary/10"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
                <X className="w-8 h-8" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />

              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-lg opacity-90">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
