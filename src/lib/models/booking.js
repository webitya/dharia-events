// Booking model schema and operations
export const BookingStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  REJECTED: "rejected",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
}

export const EventTypes = {
  WEDDING: "wedding",
  BIRTHDAY: "birthday",
  ENGAGEMENT: "engagement",
  CORPORATE: "corporate",
  ANNIVERSARY: "anniversary",
  PARTY: "party",
  OTHER: "other",
}

export const ServiceTypes = {
  PHOTOGRAPHY: "photography",
  VIDEOGRAPHY: "videography",
  DECORATION: "decoration",
  CATERING: "catering",
  LIGHTING: "lighting",
  TENT_HOUSE: "tent_house",
  ENTERTAINMENT: "entertainment",
  EDITING: "editing",
}

// Service pricing configuration
export const ServicePricing = {
  [ServiceTypes.PHOTOGRAPHY]: 15000,
  [ServiceTypes.VIDEOGRAPHY]: 20000,
  [ServiceTypes.DECORATION]: 25000,
  [ServiceTypes.CATERING]: 500, // per guest
  [ServiceTypes.LIGHTING]: 18000,
  [ServiceTypes.TENT_HOUSE]: 35000,
  [ServiceTypes.ENTERTAINMENT]: 30000,
  [ServiceTypes.EDITING]: 12000,
}

export function createBookingSchema(bookingData) {
  return {
    bookingId: `DHE${Date.now()}`,
    // Personal Information
    fullName: bookingData.fullName,
    email: bookingData.email,
    phone: bookingData.phone,
    alternatePhone: bookingData.alternatePhone || null,

    // Event Details
    eventType: bookingData.eventType || EventTypes.OTHER,
    eventDate: bookingData.eventDate,
    eventTime: bookingData.eventTime,
    venue: bookingData.venue,
    guestCount: Number.parseInt(bookingData.guestCount) || 0,
    specialRequests: bookingData.specialRequests || "",

    // Package Information
    packageId: bookingData.packageId,
    packageName: bookingData.packageName,
    packagePrice: bookingData.packagePrice,

    // Additional Services
    services: {
      photography: bookingData.photography || false,
      videography: bookingData.videography || false,
      decoration: bookingData.decoration || false,
      catering: bookingData.catering || false,
      lighting: bookingData.lighting || false,
      tentHouse: bookingData.tentHouse || false,
      entertainment: bookingData.entertainment || false,
      editing: bookingData.editing || false,
    },

    // Pricing
    totalAmount: 0, // Will be calculated

    // Status and Timestamps
    status: BookingStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),

    // Payment Information
    paymentId: null,
    orderId: null,
    paidAt: null,

    // Admin Notes
    adminNotes: "",
  }
}

export function calculateTotalAmount(booking) {
  let total = booking.packagePrice || 0

  // Add service costs
  if (booking.services.photography) total += ServicePricing.photography
  if (booking.services.videography) total += ServicePricing.videography
  if (booking.services.decoration) total += ServicePricing.decoration
  if (booking.services.catering) total += booking.guestCount * ServicePricing.catering
  if (booking.services.lighting) total += ServicePricing.lighting
  if (booking.services.tentHouse) total += ServicePricing.tentHouse
  if (booking.services.entertainment) total += ServicePricing.entertainment
  if (booking.services.editing) total += ServicePricing.editing

  return total
}
