import { NextResponse } from "next/server"
import clientPromise from "../../../../lib/mongodb"
import { ObjectId } from "mongodb"

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    const client = await clientPromise
    const db = client.db("dharia_events")
    const reviewsCollection = db.collection("reviews")

    // Try to delete by reviewId first, then by ObjectId
    let result = await reviewsCollection.deleteOne({ reviewId: id })

    if (result.deletedCount === 0) {
      // Try with ObjectId if reviewId didn't work
      if (ObjectId.isValid(id)) {
        result = await reviewsCollection.deleteOne({ _id: new ObjectId(id) })
      }
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting review:", error)
    return NextResponse.json({ success: false, error: "Failed to delete review" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const updateData = await request.json()

    const client = await clientPromise
    const db = client.db("dharia_events")
    const reviewsCollection = db.collection("reviews")

    // Update review (useful for admin approval)
    let result = await reviewsCollection.updateOne(
      { reviewId: id },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0 && ObjectId.isValid(id)) {
      result = await reviewsCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...updateData,
            updatedAt: new Date(),
          },
        },
      )
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Review updated successfully",
    })
  } catch (error) {
    console.error("Error updating review:", error)
    return NextResponse.json({ success: false, error: "Failed to update review" }, { status: 500 })
  }
}
