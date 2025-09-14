"use client"
import { useState } from "react"
import AdminLayout from "../../../components/admin-layout"
import { Users, Calendar, Star, TrendingUp, DollarSign, MapPin, Clock } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 1247,
    upcomingEvents: 23,
    totalClients: 567,
    averageRating: 4.9,
    monthlyRevenue: 850000,
    pendingBookings: 12,
  })

  const [recentBookings, setRecentBookings] = useState([
    {
      id: 1,
      clientName: "Priya & Rahul",
      eventType: "Wedding",
      date: "2024-02-15",
      status: "confirmed",
      amount: 250000,
    },
    {
      id: 2,
      clientName: "Anjali Sharma",
      eventType: "Birthday",
      date: "2024-02-10",
      status: "pending",
      amount: 35000,
    },
    {
      id: 3,
      clientName: "Tech Corp",
      eventType: "Corporate",
      date: "2024-02-20",
      status: "confirmed",
      amount: 125000,
    },
  ])

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Sharma Wedding",
      date: "2024-02-08",
      time: "6:00 PM",
      venue: "Grand Palace Hotel",
      status: "ongoing",
    },
    {
      id: 2,
      title: "Birthday Celebration",
      date: "2024-02-10",
      time: "4:00 PM",
      venue: "Garden Resort",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Corporate Meeting",
      date: "2024-02-12",
      time: "10:00 AM",
      venue: "Business Center",
      status: "upcoming",
    },
  ])

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Average Rating",
      value: stats.averageRating,
      icon: Star,
      color: "bg-yellow-500",
      change: "+0.2",
    },
    {
      title: "Monthly Revenue",
      value: `₹${(stats.monthlyRevenue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: "bg-purple-500",
      change: "+15%",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your events.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{booking.clientName}</h3>
                    <p className="text-sm text-gray-600">
                      {booking.eventType} • {booking.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${event.status === "ongoing" ? "bg-green-500" : "bg-blue-500"}`}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="font-medium">Add New Event</span>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-primary" />
              <span className="font-medium">Manage Clients</span>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span className="font-medium">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
