import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/lib/models/blog"

export async function POST(request, { params }) {
  try {
    await connectDB()

    const blog = await Blog.findOneAndUpdate({ slug: params.slug }, { $inc: { views: 1 } }, { new: true })

    if (!blog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ views: blog.views })
  } catch (error) {
    console.error("Error incrementing views:", error)
    return NextResponse.json({ message: "Error updating views" }, { status: 500 })
  }
}
