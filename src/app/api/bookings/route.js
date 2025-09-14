import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const skip = (page - 1) * limit

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("dharia_events")
    const bookingsCollection = db.collection("bookings")

    // Build query
    const query = {}

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { bookingId: { $regex: search, $options: "i" } },
      ]
    }

    // Get bookings with pagination
    const bookings = await bookingsCollection.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    // Get total count
    const totalCount = await bookingsCollection.countDocuments(query)

    return NextResponse.json({
      success: true,
      bookings: bookings,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Bookings fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch bookings" }, { status: 500 })
  }
}
