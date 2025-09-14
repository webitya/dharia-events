import Link from "next/link"
import { CalendarIcon, EyeIcon } from "@heroicons/react/24/outline"

async function getBlogs() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blogs`, {
      cache: "no-store",
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs()
  const publishedBlogs = blogs.filter((blog) => blog.published)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Planning Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest trends, tips, and inspiration for your special events
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {publishedBlogs.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No blog posts yet</h3>
            <p className="text-gray-600">Check back soon for exciting content about event planning!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedBlogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Featured Image */}
                <div className="aspect-video bg-gradient-to-r from-rose-400 to-pink-400 relative overflow-hidden">
                  {blog.featuredImage ? (
                    <img
                      src={blog.featuredImage || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">{blog.category}</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        {blog.views}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Button */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200"
                  >
                    Read More
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
