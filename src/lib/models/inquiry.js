// Inquiry model schema and operations
export const InquiryStatus = {
  NEW: "new",
  CONTACTED: "contacted",
  QUOTED: "quoted",
  CONVERTED: "converted",
  CLOSED: "closed",
}

export function createInquirySchema(inquiryData) {
  return {
    inquiryId: `INQ${Date.now()}`,
    name: inquiryData.name,
    email: inquiryData.email,
    phone: inquiryData.phone,
    eventType: inquiryData.eventType || "other",
    eventDate: inquiryData.eventDate || null,
    guestCount: inquiryData.guestCount ? Number.parseInt(inquiryData.guestCount) : null,
    budget: inquiryData.budget || null,
    message: inquiryData.message || "",
    status: InquiryStatus.NEW,
    createdAt: new Date(),
    updatedAt: new Date(),
    adminNotes: "",
  }
}
