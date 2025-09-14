"use client"
import { useState } from "react"
import { Calendar, Users, MapPin, Phone, Mail, User, CreditCard } from "lucide-react"

export default function BookingForm({ selectedPackage }) {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    alternatePhone: "",

    // Event Details
    eventType: "wedding",
    eventDate: "",
    eventTime: "",
    venue: "",
    guestCount: "",
    specialRequests: "",

    // Additional Services
    photography: false,
    videography: false,
    decoration: false,
    catering: false,
    lighting: false,
    tentHouse: false,
    entertainment: false,
    editing: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const bookingData = {
        ...formData,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
      }

      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (response.ok) {
        // Redirect to payment
        window.location.href = `/payment?bookingId=${result.bookingId}`
      } else {
        alert("Booking failed. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    let total = selectedPackage.price

    if (formData.photography) total += 15000
    if (formData.videography) total += 20000
    if (formData.decoration) total += 25000
    if (formData.catering) total += Number.parseInt(formData.guestCount || 0) * 500
    if (formData.lighting) total += 18000
    if (formData.tentHouse) total += 35000
    if (formData.entertainment) total += 30000
    if (formData.editing) total += 12000

    return total
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-primary" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h4 className="text-xl font-bold mb-4">Personal Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Alternate Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Alternate phone number"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Event Details */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h4 className="text-xl font-bold mb-4">Event Details</h4>

          <div>
            <label className="block text-sm font-semibold mb-2">Event Type *</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="engagement">Engagement</option>
              <option value="corporate">Corporate Event</option>
              <option value="anniversary">Anniversary</option>
              <option value="party">Party</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Event Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Event Time *</label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Venue/Location *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Event venue or location"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Expected Number of Guests *</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Number of guests"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Any special requirements or requests..."
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Additional Services & Payment */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h4 className="text-xl font-bold mb-4">Additional Services & Payment</h4>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold mb-4">Add Extra Services (Optional)</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="photography"
                  checked={formData.photography}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary"
                />
                <span>Professional Photography (+₹15,000)</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="videography"
                  checked={formData.videography}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary"
                />
                <span>Videography Services (+₹20,000)</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="decoration"
                  checked={formData.decoration}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary"
                />
                <span>Premium Decoration (+₹25,000)</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="catering"
                  checked={formData.catering}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary"
                />
                <span>Extended Catering (+₹500/guest)</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="lighting"
                  checked={formData.lighting}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary"
                />
                <span>Professional Lighting (+₹18,000)</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="tentHouse"
                  checked={formData.tentHouse}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary"
                />
                <span>Tent House Setup (+₹35,000)</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="entertainment"
                  checked={formData.entertainment}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary"
                />
                <span>Live Entertainment (+₹30,000)</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="editing"
                  checked={formData.editing}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary"
                />
                <span>Photo/Video Editing (+₹12,000)</span>
              </label>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h5 className="font-semibold mb-4">Booking Summary</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{selectedPackage.name}</span>
                <span>₹{selectedPackage.price.toLocaleString()}</span>
              </div>

              {formData.photography && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Professional Photography</span>
                  <span>₹15,000</span>
                </div>
              )}

              {formData.videography && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Videography Services</span>
                  <span>₹20,000</span>
                </div>
              )}

              {formData.decoration && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Premium Decoration</span>
                  <span>₹25,000</span>
                </div>
              )}

              {formData.catering && formData.guestCount && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Extended Catering ({formData.guestCount} guests)</span>
                  <span>₹{(Number.parseInt(formData.guestCount) * 500).toLocaleString()}</span>
                </div>
              )}

              {formData.lighting && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Professional Lighting</span>
                  <span>₹18,000</span>
                </div>
              )}

              {formData.tentHouse && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tent House Setup</span>
                  <span>₹35,000</span>
                </div>
              )}

              {formData.entertainment && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Live Entertainment</span>
                  <span>₹30,000</span>
                </div>
              )}

              {formData.editing && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Photo/Video Editing</span>
                  <span>₹12,000</span>
                </div>
              )}

              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
