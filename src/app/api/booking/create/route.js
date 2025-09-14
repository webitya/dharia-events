import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"
import { createBookingSchema, calculateTotalAmount } from "../../../lib/models/booking"

export async function POST(request) {
  try {
    const bookingData = await request.json()

    // Create booking document
    const booking = createBookingSchema(bookingData)

    // Calculate total amount
    booking.totalAmount = calculateTotalAmount(booking)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("dharia_events")
    const bookingsCollection = db.collection("bookings")

    // Insert booking into database
    const result = await bookingsCollection.insertOne(booking)

    if (result.insertedId) {
      return NextResponse.json({
        success: true,
        bookingId: booking.bookingId,
        message: "Booking created successfully",
        totalAmount: booking.totalAmount,
      })
    } else {
      throw new Error("Failed to create booking")
    }
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 })
  }
}
