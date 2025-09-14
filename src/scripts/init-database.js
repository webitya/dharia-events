// Database initialization script for Dharia Events
import clientPromise from "../lib/mongodb.js"

async function initializeDatabase() {
  try {
    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    const db = client.db("dharia_events")

    // Create collections with indexes
    console.log("Creating collections and indexes...")

    // Bookings collection
    const bookingsCollection = db.collection("bookings")
    await bookingsCollection.createIndex({ bookingId: 1 }, { unique: true })
    await bookingsCollection.createIndex({ email: 1 })
    await bookingsCollection.createIndex({ status: 1 })
    await bookingsCollection.createIndex({ createdAt: -1 })
    await bookingsCollection.createIndex({ eventDate: 1 })

    // Inquiries collection
    const inquiriesCollection = db.collection("inquiries")
    await inquiriesCollection.createIndex({ inquiryId: 1 }, { unique: true })
    await inquiriesCollection.createIndex({ email: 1 })
    await inquiriesCollection.createIndex({ status: 1 })
    await inquiriesCollection.createIndex({ createdAt: -1 })

    // Reviews collection
    const reviewsCollection = db.collection("reviews")
    await reviewsCollection.createIndex({ reviewId: 1 }, { unique: true })
    await reviewsCollection.createIndex({ email: 1 })
    await reviewsCollection.createIndex({ eventType: 1 })
    await reviewsCollection.createIndex({ isApproved: 1 })
    await reviewsCollection.createIndex({ createdAt: -1 })
    await reviewsCollection.createIndex({ rating: -1 })

    // Insert sample data if collections are empty
    const bookingCount = await bookingsCollection.countDocuments()
    if (bookingCount === 0) {
      console.log("Inserting sample bookings...")
      await bookingsCollection.insertMany([
        {
          bookingId: "DHE1704067200000",
          fullName: "Priya Sharma",
          email: "priya@example.com",
          phone: "9876543210",
          alternatePhone: null,
          eventType: "wedding",
          eventDate: "2024-03-15",
          eventTime: "18:00",
          venue: "Grand Palace, Ranchi",
          guestCount: 500,
          specialRequests: "Traditional decorations with marigold flowers",
          packageId: "premium",
          packageName: "Premium Wedding Package",
          packagePrice: 200000,
          services: {
            photography: true,
            videography: true,
            decoration: true,
            catering: false,
            lighting: true,
            tentHouse: false,
            entertainment: true,
            editing: true,
          },
          totalAmount: 295000,
          status: "confirmed",
          createdAt: new Date("2024-01-01T10:00:00Z"),
          updatedAt: new Date("2024-01-01T10:00:00Z"),
          paymentId: "pay_sample123",
          orderId: "order_sample123",
          paidAt: new Date("2024-01-01T11:00:00Z"),
          adminNotes: "",
        },
      ])
    }

    const reviewCount = await reviewsCollection.countDocuments()
    if (reviewCount === 0) {
      console.log("Inserting sample reviews...")
      await reviewsCollection.insertMany([
        {
          reviewId: "REV1704067200001",
          name: "Priya Sharma",
          email: "priya@example.com",
          eventType: "wedding",
          rating: 5,
          comment:
            "Dharia Events made our wedding absolutely perfect! The attention to detail was incredible and the team was so professional.",
          eventId: null,
          helpful: 12,
          isApproved: true,
          createdAt: new Date("2024-01-15T10:30:00Z"),
          updatedAt: new Date("2024-01-15T10:30:00Z"),
        },
        {
          reviewId: "REV1704067200002",
          name: "Rajesh Kumar",
          email: "rajesh@example.com",
          eventType: "birthday",
          rating: 5,
          comment: "Amazing service for my daughter's birthday party! The theme decoration was exactly what we wanted.",
          eventId: null,
          helpful: 8,
          isApproved: true,
          createdAt: new Date("2024-01-10T14:20:00Z"),
          updatedAt: new Date("2024-01-10T14:20:00Z"),
        },
      ])
    }

    console.log("Database initialization completed successfully!")
    console.log("Collections created:")
    console.log("- bookings (with indexes on bookingId, email, status, createdAt, eventDate)")
    console.log("- inquiries (with indexes on inquiryId, email, status, createdAt)")
    console.log("- reviews (with indexes on reviewId, email, eventType, isApproved, createdAt, rating)")
  } catch (error) {
    console.error("Database initialization failed:", error)
    process.exit(1)
  }
}

// Run initialization
initializeDatabase()
