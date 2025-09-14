import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const review = await request.json()

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f43f5e, #ec4899); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .review-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f43f5e; }
          .stars { color: #fbbf24; font-size: 18px; }
          .footer { text-align: center; margin-top: 30px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Review Received!</h1>
            <p>Dharia Events - Admin Notification</p>
          </div>
          <div class="content">
            <div class="review-card">
              <h3>Review Details:</h3>
              <p><strong>Customer:</strong> ${review.name}</p>
              <p><strong>Email:</strong> ${review.email}</p>
              <p><strong>Event Type:</strong> ${review.eventType}</p>
              <p><strong>Rating:</strong> <span class="stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span> (${review.rating}/5)</p>
              <p><strong>Review:</strong></p>
              <blockquote style="background: #f0f0f0; padding: 15px; border-left: 3px solid #f43f5e; margin: 10px 0;">
                ${review.comment}
              </blockquote>
              <p><strong>Submitted:</strong> ${new Date(review.createdAt).toLocaleString()}</p>
            </div>
            <div class="footer">
              <p>This is an automated notification from your Dharia Events website.</p>
              <p>Login to your admin panel to manage reviews.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "dhariaevents@gmail.com",
      subject: `New ${review.rating}-Star Review from ${review.name}`,
      html: htmlContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending review notification:", error)
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}
