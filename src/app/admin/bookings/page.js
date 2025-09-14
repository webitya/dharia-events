"use client"
import { useState, useEffect } from "react"
import AdminLayout from "../../../components/admin-layout"
import { Search, Eye, Check, X, Phone, Mail, Calendar, Users, DollarSign, Loader2 } from "lucide-react"

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    rejected: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    fetchBookings()
    fetchStats()
  }, [searchTerm, filterStatus])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        status: filterStatus,
        limit: "50",
      })

      const response = await fetch(`/api/bookings?${params}`)
      const data = await response.json()

      if (data.success) {
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/bookings/stats")
      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`/api/booking/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        // Update local state
        setBookings(
          bookings.map((booking) => (booking.bookingId === bookingId ? { ...booking, status: newStatus } : booking)),
        )
        // Refresh stats
        fetchStats()
      }
    } catch (error) {
      console.error("Failed to update booking status:", error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN")
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Requests</h1>
          <p className="text-gray-600 mt-2">Manage incoming booking requests and inquiries</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by client name, email, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-600">Loading bookings...</span>
          </div>
        )}

        {/* Bookings Grid */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{booking.fullName}</h3>
                    <p className="text-sm text-gray-600">{booking.eventType} Event</p>
                    <p className="text-xs text-gray-500">ID: {booking.bookingId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{booking.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{booking.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(booking.eventDate)} at {booking.eventTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{booking.guestCount} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>₹{booking.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {booking.specialRequests || "No special requests"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Submitted: {formatDateTime(booking.createdAt)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.bookingId, "confirmed")}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.bookingId, "rejected")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found matching your criteria.</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Requests</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600">Confirmed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.confirmed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            <p className="text-3xl font-bold text-primary mt-2">₹{stats.totalRevenue?.toLocaleString()}</p>
          </div>
        </div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                  <button onClick={() => setSelectedBooking(null)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Client Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p>
                          <span className="font-medium">Name:</span> {selectedBooking.fullName}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {selectedBooking.email}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {selectedBooking.phone}
                        </p>
                        {selectedBooking.alternatePhone && (
                          <p>
                            <span className="font-medium">Alt Phone:</span> {selectedBooking.alternatePhone}
                          </p>
                        )}
                        <p>
                          <span className="font-medium">Booking ID:</span> {selectedBooking.bookingId}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Event Details</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p>
                          <span className="font-medium">Type:</span> {selectedBooking.eventType}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span> {formatDate(selectedBooking.eventDate)}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span> {selectedBooking.eventTime}
                        </p>
                        <p>
                          <span className="font-medium">Venue:</span> {selectedBooking.venue}
                        </p>
                        <p>
                          <span className="font-medium">Guests:</span> {selectedBooking.guestCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Package & Services</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p>
                          <span className="font-medium">Package:</span> {selectedBooking.packageName}
                        </p>
                        <p>
                          <span className="font-medium">Base Price:</span> ₹
                          {selectedBooking.packagePrice?.toLocaleString()}
                        </p>

                        <div className="mt-3">
                          <p className="font-medium mb-1">Additional Services:</p>
                          <div className="text-sm space-y-1">
                            {selectedBooking.services?.photography && <p>• Professional Photography (+₹15,000)</p>}
                            {selectedBooking.services?.videography && <p>• Videography Services (+₹20,000)</p>}
                            {selectedBooking.services?.decoration && <p>• Premium Decoration (+₹25,000)</p>}
                            {selectedBooking.services?.catering && (
                              <p>• Extended Catering (+₹{(selectedBooking.guestCount * 500).toLocaleString()})</p>
                            )}
                            {selectedBooking.services?.lighting && <p>• Professional Lighting (+₹18,000)</p>}
                            {selectedBooking.services?.tentHouse && <p>• Tent House Setup (+₹35,000)</p>}
                            {selectedBooking.services?.entertainment && <p>• Live Entertainment (+₹30,000)</p>}
                            {selectedBooking.services?.editing && <p>• Photo/Video Editing (+₹12,000)</p>}
                          </div>
                        </div>

                        <p className="text-lg font-bold border-t pt-2 mt-3">
                          <span className="font-medium">Total Amount:</span> ₹
                          {selectedBooking.totalAmount?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {selectedBooking.paymentId && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                          <p>
                            <span className="font-medium">Payment ID:</span> {selectedBooking.paymentId}
                          </p>
                          <p>
                            <span className="font-medium">Order ID:</span> {selectedBooking.orderId}
                          </p>
                          <p>
                            <span className="font-medium">Paid At:</span> {formatDateTime(selectedBooking.paidAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Special Requests</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{selectedBooking.specialRequests}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-6 border-t">
                  {selectedBooking.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking.bookingId, "rejected")
                          setSelectedBooking(null)
                        }}
                        className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          updateBookingStatus(selectedBooking.bookingId, "confirmed")
                          setSelectedBooking(null)
                        }}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Confirm Booking
                      </button>
                    </>
                  )}
                  {selectedBooking.status === "confirmed" && (
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.bookingId, "completed")
                        setSelectedBooking(null)
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
