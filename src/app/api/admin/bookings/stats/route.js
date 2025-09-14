import { NextResponse } from "next/server"
import clientPromise from "../../../../lib/mongodb"
import { BookingStatus } from "../../../../lib/models/booking"

export async function GET(request) {
  try {
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("dharia_events")
    const bookingsCollection = db.collection("bookings")

    // Get booking statistics
    const stats = await bookingsCollection
      .aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ])
      .toArray()

    // Get monthly bookings
    const monthlyStats = await bookingsCollection
      .aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
            revenue: { $sum: "$totalAmount" },
          },
        },
        {
          $sort: { "_id.year": -1, "_id.month": -1 },
        },
        {
          $limit: 12,
        },
      ])
      .toArray()

    // Format stats
    const formattedStats = {
      total: 0,
      pending: 0,
      confirmed: 0,
      rejected: 0,
      completed: 0,
      cancelled: 0,
      totalRevenue: 0,
    }

    stats.forEach((stat) => {
      formattedStats[stat._id] = stat.count
      formattedStats.total += stat.count
      if (stat._id === BookingStatus.CONFIRMED || stat._id === BookingStatus.COMPLETED) {
        formattedStats.totalRevenue += stat.totalRevenue
      }
    })

    return NextResponse.json({
      success: true,
      stats: formattedStats,
      monthlyStats: monthlyStats,
    })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch statistics" }, { status: 500 })
  }
}
