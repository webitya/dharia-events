import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/lib/models/blog"
import mongoose from "mongoose"

export async function GET(request, { params }) {
  try {
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 })
    }

    const blog = await Blog.findById(params.id)

    if (!blog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ message: "Error fetching blog post" }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 })
    }

    const data = await request.json()

    // If slug is being updated, check if it already exists (excluding current blog)
    if (data.slug) {
      const existingBlog = await Blog.findOne({
        slug: data.slug,
        _id: { $ne: params.id },
      })
      if (existingBlog) {
        return NextResponse.json({ message: "A blog post with this slug already exists" }, { status: 400 })
      }
    }

    const blog = await Blog.findByIdAndUpdate(params.id, data, { new: true })

    if (!blog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ message: "Error updating blog post" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 })
    }

    const blog = await Blog.findByIdAndDelete(params.id)

    if (!blog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ message: "Error deleting blog post" }, { status: 500 })
  }
}
