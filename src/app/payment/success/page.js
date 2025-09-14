"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import { CheckCircle, Download, Phone, Mail } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails()
    }
  }, [bookingId])

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/booking/${bookingId}`)
      const data = await response.json()
      if (response.ok) {
        setBookingDetails(data.booking)
      }
    } catch (error) {
      console.error("Error fetching booking details:", error)
    } finally {
      setLoading(false)
    }
  }

  const downloadReceipt = () => {
    // Generate and download receipt
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-lg">Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-green-600">Payment Successful!</h1>
            <p className="text-xl text-muted-foreground">
              Your booking has been confirmed. We will contact you soon with further details.
            </p>
          </div>

          {bookingDetails && (
            <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Booking Confirmation</h2>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="font-mono font-bold">{bookingId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Package</p>
                      <p className="text-muted-foreground">{bookingDetails.packageName}</p>
                    </div>
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-muted-foreground">
                        {bookingDetails.eventDate} at {bookingDetails.eventTime}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-muted-foreground">{bookingDetails.venue}</p>
                    </div>
                    <div>
                      <p className="font-medium">Guests</p>
                      <p className="text-muted-foreground">{bookingDetails.guestCount} people</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Client Name</p>
                      <p className="text-muted-foreground">{bookingDetails.fullName}</p>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{bookingDetails.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{bookingDetails.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total Amount</p>
                      <p className="text-2xl font-bold text-primary">₹{bookingDetails.totalAmount?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Next Steps */}
            <div className="bg-card rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">What s Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Confirmation Call</p>
                    <p className="text-sm text-muted-foreground">
                      Our team will call you within 24 hours to confirm details
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Planning Meeting</p>
                    <p className="text-sm text-muted-foreground">Schedule a detailed planning session for your event</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Event Execution</p>
                    <p className="text-sm text-muted-foreground">Sit back and enjoy your perfectly organized event</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Actions */}
            <div className="bg-card rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm text-muted-foreground">9122447574</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-sm text-muted-foreground">dhariaevents@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={downloadReceipt}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Receipt
                </button>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
