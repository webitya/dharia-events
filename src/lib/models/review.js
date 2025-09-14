// Review model schema and operations
export const EventTypes = {
  WEDDING: "wedding",
  BIRTHDAY: "birthday",
  ENGAGEMENT: "engagement",
  CORPORATE: "corporate",
  ANNIVERSARY: "anniversary",
  PARTY: "party",
  OTHER: "other",
}

export function createReviewSchema(reviewData) {
  return {
    reviewId: `REV${Date.now()}`,
    name: reviewData.name,
    email: reviewData.email,
    eventType: reviewData.eventType,
    rating: Number.parseInt(reviewData.rating),
    comment: reviewData.comment,
    eventId: reviewData.eventId || null,
    helpful: 0,
    isApproved: false, // Reviews need admin approval
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
