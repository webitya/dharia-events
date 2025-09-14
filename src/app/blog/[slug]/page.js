import { notFound } from "next/navigation"
import { CalendarIcon, EyeIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

async function getBlog(slug) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blogs/${slug}`, {
      cache: "no-store",
    })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}

async function incrementViews(slug) {
  try {
    await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blogs/${slug}/views`, {
      method: "POST",
      cache: "no-store",
    })
  } catch (error) {
    console.error("Error incrementing views:", error)
  }
}

function formatContent(content) {
  // Convert line breaks to paragraphs and handle subheadings
  const lines = content.split("\n")
  let formattedContent = ""

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    if (trimmedLine === "") {
      // Skip empty lines
      return
    }

    // Check for subheadings (lines starting with ##)
    if (trimmedLine.startsWith("## ")) {
      formattedContent += `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${trimmedLine.substring(3)}</h2>`
    }
    // Check for subheadings (lines starting with ###)
    else if (trimmedLine.startsWith("### ")) {
      formattedContent += `<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">${trimmedLine.substring(4)}</h3>`
    }
    // Regular paragraphs
    else {
      formattedContent += `<p class="text-gray-700 leading-relaxed mb-4">${trimmedLine}</p>`
    }
  })

  return formattedContent
}

function extractYouTubeId(url) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    return {
      title: "Blog Not Found - Dharia Events",
    }
  }

  return {
    title: blog.metaTitle || `${blog.title} - Dharia Events Blog`,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  }
}

export default async function BlogPost({ params }) {
  const blog = await getBlog(params.slug)

  if (!blog || !blog.published) {
    notFound()
  }

  // Increment views (fire and forget)
  incrementViews(params.slug)

  const youtubeId = extractYouTubeId(blog.youtubeUrl)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-4">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">{blog.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{blog.title}</h1>
            <p className="text-xl text-rose-100 mb-8 text-pretty">{blog.excerpt}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-rose-100">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 mr-2" />
                {blog.author}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <EyeIcon className="h-5 w-5 mr-2" />
                {blog.views + 1} views
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-12">
            <img
              src={blog.featuredImage || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* YouTube Video */}
        {youtubeId && (
          <div className="mb-12">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: formatContent(blog.content),
            }}
          />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center flex-wrap gap-2">
              <TagIcon className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium mr-2">Tags:</span>
              {blog.tags.map((tag, index) => (
                <span key={index} className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
