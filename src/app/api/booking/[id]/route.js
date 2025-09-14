import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET(request, { params }) {
  try {
    const bookingId = params.id

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("dharia_events")
    const bookingsCollection = db.collection("bookings")

    // Find booking by bookingId
    const booking = await bookingsCollection.findOne({ bookingId: bookingId })

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      booking: booking,
    })
  } catch (error) {
    console.error("Booking fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const bookingId = params.id
    const updateData = await request.json()

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("dharia_events")
    const bookingsCollection = db.collection("bookings")

    // Update booking
    const result = await bookingsCollection.updateOne(
      { bookingId: bookingId },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully",
    })
  } catch (error) {
    console.error("Booking update error:", error)
    return NextResponse.json({ success: false, message: "Failed to update booking" }, { status: 500 })
  }
}
