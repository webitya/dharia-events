import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"
import { createReviewSchema } from "../../../lib/models/review"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get("filter") || "all"
    const sort = searchParams.get("sort") || "newest"
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const skip = (page - 1) * limit

    const client = await clientPromise
    const db = client.db("dharia_events")
    const reviewsCollection = db.collection("reviews")

    // Build query - only show approved reviews
    const query = { isApproved: true }

    if (filter !== "all") {
      query.eventType = filter
    }

    // Build sort criteria
    let sortCriteria = {}
    switch (sort) {
      case "oldest":
        sortCriteria = { createdAt: 1 }
        break
      case "highest":
        sortCriteria = { rating: -1 }
        break
      case "lowest":
        sortCriteria = { rating: 1 }
        break
      default: // newest
        sortCriteria = { createdAt: -1 }
    }

    // Get reviews with pagination
    const reviews = await reviewsCollection.find(query).sort(sortCriteria).skip(skip).limit(limit).toArray()

    // Get total count
    const totalCount = await reviewsCollection.countDocuments(query)

    return NextResponse.json({
      success: true,
      reviews: reviews,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, eventType, rating, comment, eventId } = body

    // Validate required fields
    if (!name || !email || !eventType || !rating || !comment) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("dharia_events")
    const reviewsCollection = db.collection("reviews")

    const review = createReviewSchema({ name, email, eventType, rating, comment, eventId })
    const result = await reviewsCollection.insertOne(review)

    // Send notification email to admin
    try {
      await fetch(`${process.env.NEXTAUTH_URL}/api/email/new-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      })
    } catch (emailError) {
      console.error("Failed to send review notification email:", emailError)
    }

    return NextResponse.json({
      success: true,
      review: review,
      message: "Review submitted successfully! It will be published after admin approval.",
    })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ success: false, error: "Failed to create review" }, { status: 500 })
  }
}
