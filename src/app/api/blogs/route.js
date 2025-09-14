import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/lib/models/blog"

export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find({}).sort({ createdAt: -1 })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ message: "Error fetching blogs" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: data.slug })
    if (existingBlog) {
      return NextResponse.json({ message: "A blog post with this slug already exists" }, { status: 400 })
    }

    const blog = new Blog(data)
    await blog.save()

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ message: "Error creating blog post" }, { status: 500 })
  }
}
