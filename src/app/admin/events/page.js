"use client"
import { useState } from "react"
import AdminLayout from "../../../components/admin-layout"
import { Plus, Search, Edit, Trash2, Eye, Calendar, MapPin, Users } from "lucide-react"

export default function AdminEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Royal Wedding Package",
      type: "Wedding",
      date: "2024-02-15",
      venue: "Grand Palace Hotel",
      capacity: 500,
      price: 250000,
      status: "upcoming",
      client: "Priya & Rahul",
    },
    {
      id: 2,
      title: "Birthday Celebration",
      type: "Birthday",
      date: "2024-02-10",
      venue: "Garden Resort",
      capacity: 100,
      price: 35000,
      status: "ongoing",
      client: "Anjali Sharma",
    },
    {
      id: 3,
      title: "Corporate Conference",
      type: "Corporate",
      date: "2024-02-20",
      venue: "Business Center",
      capacity: 200,
      price: 125000,
      status: "confirmed",
      client: "Tech Corp",
    },
    {
      id: 4,
      title: "Engagement Ceremony",
      type: "Engagement",
      date: "2024-01-28",
      venue: "Heritage Hall",
      capacity: 150,
      price: 65000,
      status: "completed",
      client: "Sunita & Manoj",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || event.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
            <p className="text-gray-600 mt-2">Manage all your events and bookings</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events or clients..."
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
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Venue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{event.client}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </p>
                        <p className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {event.venue}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {event.capacity} guests
                        </p>
                        <p className="font-semibold text-primary">₹{event.price.toLocaleString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Events</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{events.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600">Upcoming</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {events.filter((e) => e.status === "upcoming").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600">Ongoing</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {events.filter((e) => e.status === "ongoing").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600">Completed</h3>
            <p className="text-3xl font-bold text-gray-600 mt-2">
              {events.filter((e) => e.status === "completed").length}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
