import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import clientPromise from "../../lib/mongodb"
import { createInquirySchema } from "../../lib/models/inquiry"

export async function POST(request) {
  try {
    const formData = await request.json()

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission - ${formData.eventType || "General Inquiry"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #be123c, #ec4899); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #be123c; margin-bottom: 20px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Event Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.eventType || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Event Date:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.eventDate || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Expected Guests:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.guestCount || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Budget Range:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formData.budget || "Not specified"}</td>
              </tr>
            </table>
            
            <h3 style="color: #be123c; margin-top: 20px;">Message:</h3>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #be123c;">
              ${formData.message || "No message provided"}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px;">
              <p style="margin: 0; color: #1976d2;">
                <strong>Action Required:</strong> Please respond to this inquiry within 24 hours for best customer service.
              </p>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 15px; text-align: center;">
            <p style="margin: 0;">Dharia Events - Creating Unforgettable Moments</p>
          </div>
        </div>
      `,
    }

    // Confirmation email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: "Thank you for contacting Dharia Events!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #be123c, #ec4899); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You for Contacting Us!</h1>
          </div>
          
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.6;">Dear ${formData.name},</p>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to Dharia Events! We have received your inquiry about 
              ${formData.eventType ? `your ${formData.eventType} event` : "your event"} and we're excited to help you create an unforgettable celebration.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #be123c; margin-top: 0;">What happens next?</h3>
              <ul style="line-height: 1.8;">
                <li>Our team will review your requirements within 24 hours</li>
                <li>We'll call you at ${formData.phone} to discuss your event details</li>
                <li>We'll provide you with a customized quote and proposal</li>
                <li>Schedule a consultation to finalize your event planning</li>
              </ul>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #2e7d32; margin-top: 0;">Your Inquiry Summary:</h4>
              <p style="margin: 5px 0;"><strong>Event Type:</strong> ${formData.eventType || "Not specified"}</p>
              <p style="margin: 5px 0;"><strong>Event Date:</strong> ${formData.eventDate || "Not specified"}</p>
              <p style="margin: 5px 0;"><strong>Expected Guests:</strong> ${formData.guestCount || "Not specified"}</p>
              <p style="margin: 5px 0;"><strong>Budget Range:</strong> ${formData.budget || "Not specified"}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to explore our <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/gallery" style="color: #be123c;">gallery</a> 
              to see our previous work or check out our <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/services" style="color: #be123c;">services</a> 
              for more details about what we offer.
            </p>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;">
                <strong>Need immediate assistance?</strong><br>
                Call us at: <a href="tel:9122447574" style="color: #be123c;">9122447574</a><br>
                Email us at: <a href="mailto:dhariaevents@gmail.com" style="color: #be123c;">dhariaevents@gmail.com</a>
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Thank you for choosing Dharia Events. We look forward to making your special day truly memorable!
            </p>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong>The Dharia Events Team</strong>
            </p>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <h3 style="margin: 0 0 10px 0;">Dharia Events</h3>
            <p style="margin: 5px 0;">📍 Hazaribagh, Ranchi, Jharkhand, India</p>
            <p style="margin: 5px 0;">📞 9122447574</p>
            <p style="margin: 5px 0;">✉️ dhariaevents@gmail.com</p>
            <p style="margin: 15px 0 0 0; font-style: italic;">Creating Unforgettable Moments</p>
          </div>
        </div>
      `,
    }

    // Send emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(clientMailOptions)

    const client = await clientPromise
    const db = client.db("dharia_events")
    const inquiriesCollection = db.collection("inquiries")

    const inquiry = createInquirySchema(formData)
    const result = await inquiriesCollection.insertOne(inquiry)

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
      inquiryId: inquiry.inquiryId,
    })
  } catch (error) {
    console.error("Email sending failed:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again or call us directly." },
      { status: 500 },
    )
  }
}
