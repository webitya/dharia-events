import { NextResponse } from "next/server"
import crypto from "crypto"
import clientPromise from "../../../../lib/mongodb"

export async function POST(request) {
  try {
    const { bookingId, paymentId, orderId, signature } = await request.json()

    // Verify signature
    const body = orderId + "|" + paymentId
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== signature) {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("dharia_events")
    const bookingsCollection = db.collection("bookings")

    // Update booking status in MongoDB
    const updateResult = await bookingsCollection.updateOne(
      { bookingId: bookingId },
      {
        $set: {
          status: "confirmed",
          paymentId: paymentId,
          orderId: orderId,
          paidAt: new Date(),
          updatedAt: new Date(),
        },
      },
    )

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 })
    }

    // Get updated booking data for email
    const booking = await bookingsCollection.findOne({ bookingId: bookingId })

    if (booking) {
      try {
        await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/email/booking-confirmation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingData: booking,
            paymentData: {
              paymentId: paymentId,
              orderId: orderId,
              amount: booking.totalAmount,
            },
          }),
        })
      } catch (emailError) {
        console.error("Failed to send booking confirmation email:", emailError)
        // Don't fail the payment verification if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    })
  } catch (error) {
    console.error("Payment verification failed:", error)
    return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 500 })
  }
}
