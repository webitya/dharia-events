import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import clientPromise from "../../../../lib/mongodb"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request) {
  try {
    const { bookingId, paymentType } = await request.json()

    const client = await clientPromise
    const db = client.db("dharia_events")
    const bookingsCollection = db.collection("bookings")

    const booking = await bookingsCollection.findOne({ bookingId: bookingId })

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 })
    }

    // Calculate amount based on payment type
    let amount = booking.totalAmount
    if (paymentType === "advance") {
      amount = Math.floor(amount / 2)
    } else if (paymentType === "full") {
      // Apply 5% discount for full payment
      amount = Math.floor(amount * 0.95)
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: bookingId,
      notes: {
        bookingId: bookingId,
        paymentType: paymentType,
      },
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: amount * 100,
      currency: "INR",
    })
  } catch (error) {
    console.error("Payment order creation failed:", error)
    return NextResponse.json({ success: false, message: "Failed to create payment order" }, { status: 500 })
  }
}
