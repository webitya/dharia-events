import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      default: "",
    },
    youtubeUrl: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: ["Wedding", "Birthday", "Corporate", "Photography", "Decoration", "Tips", "Trends"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      default: "Dharia Events Team",
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    views: {
      type: Number,
      default: 0,
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes
blogSchema.index({ slug: 1 })
blogSchema.index({ category: 1 })
blogSchema.index({ published: 1 })
blogSchema.index({ publishedAt: -1 })

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema)
