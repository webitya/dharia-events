"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Script from "next/script"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { CreditCard, Shield, Clock } from "lucide-react"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState(false)

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

  const handlePayment = async (paymentType) => {
    setPaymentLoading(true)

    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
          paymentType: paymentType,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Initialize Razorpay
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: "INR",
          name: "Dharia Events",
          description: `Payment for ${bookingDetails?.packageName}`,
          order_id: data.orderId,
          handler: (response) => {
            // Payment successful
            verifyPayment(response)
          },
          prefill: {
            name: bookingDetails?.fullName,
            email: bookingDetails?.email,
            contact: bookingDetails?.phone,
          },
          theme: {
            color: "#be123c",
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        alert("Payment initialization failed. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setPaymentLoading(false)
    }
  }

  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          signature: paymentResponse.razorpay_signature,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to success page
        window.location.href = `/payment/success?bookingId=${bookingId}`
      } else {
        alert("Payment verification failed. Please contact support.")
      }
    } catch (error) {
      alert("Payment verification failed. Please contact support.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-lg">Loading booking details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-lg text-red-600">Booking not found. Please try again.</p>
          </div>
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
            <h1 className="text-4xl font-bold mb-4">Complete Your Payment</h1>
            <p className="text-xl text-muted-foreground">Secure payment processing for your event booking</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="bg-card rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-lg">{bookingDetails.packageName}</h3>
                  <p className="text-muted-foreground">Event Package</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Client Name</p>
                    <p className="text-muted-foreground">{bookingDetails.fullName}</p>
                  </div>
                  <div>
                    <p className="font-medium">Event Date</p>
                    <p className="text-muted-foreground">{bookingDetails.eventDate}</p>
                  </div>
                  <div>
                    <p className="font-medium">Venue</p>
                    <p className="text-muted-foreground">{bookingDetails.venue}</p>
                  </div>
                  <div>
                    <p className="font-medium">Guests</p>
                    <p className="text-muted-foreground">{bookingDetails.guestCount}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{bookingDetails.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-card rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Options</h2>

              <div className="space-y-4">
                {/* Full Payment */}
                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Pay Full Amount</h3>
                      <p className="text-muted-foreground">Complete payment now</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₹{bookingDetails.totalAmount?.toLocaleString()}</p>
                      <p className="text-sm text-green-600">Save 5% on full payment</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePayment("full")}
                    disabled={paymentLoading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    {paymentLoading ? "Processing..." : "Pay Full Amount"}
                  </button>
                </div>

                {/* Advance Payment */}
                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Pay Advance (50%)</h3>
                      <p className="text-muted-foreground">Pay remaining amount later</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ₹{Math.floor(bookingDetails.totalAmount / 2)?.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Remaining: ₹{Math.ceil(bookingDetails.totalAmount / 2)?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePayment("advance")}
                    disabled={paymentLoading}
                    className="w-full border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    {paymentLoading ? "Processing..." : "Pay Advance"}
                  </button>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Secure Payment</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your payment is secured by Razorpay with 256-bit SSL encryption. We accept all major credit cards,
                  debit cards, and UPI payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Razorpay Script */}
       {/* Correct Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
