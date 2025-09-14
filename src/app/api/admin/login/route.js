import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    // Get credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME || "dhariaadmin"
    const adminPassword = process.env.ADMIN_PASSWORD || "DhariaEvents@2024"

    if (username === adminUsername && password === adminPassword) {
      // Generate a simple token (in production, use proper JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")

      return NextResponse.json({
        success: true,
        message: "Login successful",
        token: token,
      })
    } else {
      return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
