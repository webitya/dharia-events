import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/lib/models/blog"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const blog = await Blog.findOne({ slug: params.slug })

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
    const data = await request.json()

    const blog = await Blog.findOneAndUpdate({ slug: params.slug }, data, { new: true })

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
    const blog = await Blog.findOneAndDelete({ slug: params.slug })

    if (!blog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ message: "Error deleting blog post" }, { status: 500 })
  }
}
