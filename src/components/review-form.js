"use client"
import { useState } from "react"
import { Star, Send } from "lucide-react"

export default function ReviewForm({ eventId, onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "",
    rating: 0,
    comment: "",
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.rating === 0) {
      alert("Please select a rating")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          eventId,
        }),
      })

      if (response.ok) {
        alert("Thank you for your review!")
        setFormData({
          name: "",
          email: "",
          eventType: "",
          rating: 0,
          comment: "",
        })
        setShowForm(false)
        if (onReviewSubmitted) onReviewSubmitted()
      } else {
        alert("Failed to submit review. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setFormData({ ...formData, rating: i + 1 })}
        onMouseEnter={() => setHoveredRating(i + 1)}
        onMouseLeave={() => setHoveredRating(0)}
        className="focus:outline-none"
      >
        <Star
          className={`w-8 h-8 transition-colors ${
            i < (hoveredRating || formData.rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300 hover:text-yellow-200"
          }`}
        />
      </button>
    ))
  }

  if (!showForm) {
    return (
      <div className="text-center py-8">
        <button
          onClick={() => setShowForm(true)}
          className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
        >
          Write a Review
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
          <select
            required
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="engagement">Engagement</option>
            <option value="corporate">Corporate Event</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
          <div className="flex gap-1">{renderStars()}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review *</label>
          <textarea
            required
            rows={4}
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Tell us about your experience with Dharia Events..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Review
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
