import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { bookingData, paymentData } = await request.json()

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    // Email to client with booking confirmation
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingData.email,
      subject: `Booking Confirmed - ${bookingData.packageName} | Dharia Events`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #be123c, #ec4899); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎉 Booking Confirmed!</h1>
          </div>
          
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.6;">Dear ${bookingData.fullName},</p>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Congratulations! Your booking has been confirmed. We're thrilled to be part of your special celebration!
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h3 style="color: #28a745; margin-top: 0;">✅ Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 40%;">Booking ID:</td>
                  <td style="padding: 8px 0; font-family: monospace; background: #e9ecef; padding: 4px 8px; border-radius: 4px;">${bookingData.id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Package:</td>
                  <td style="padding: 8px 0;">${bookingData.packageName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Event Date:</td>
                  <td style="padding: 8px 0;">${bookingData.eventDate} at ${bookingData.eventTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Venue:</td>
                  <td style="padding: 8px 0;">${bookingData.venue}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Guests:</td>
                  <td style="padding: 8px 0;">${bookingData.guestCount} people</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 8px 0; font-size: 18px; font-weight: bold; color: #be123c;">₹${bookingData.totalAmount?.toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            ${
              paymentData
                ? `
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #2e7d32; margin-top: 0;">💳 Payment Information</h4>
              <p style="margin: 5px 0;"><strong>Payment ID:</strong> ${paymentData.paymentId}</p>
              <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${paymentData.amount?.toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">✅ Confirmed</span></p>
            </div>
            `
                : ""
            }
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #856404; margin-top: 0;">📋 What's Next?</h3>
              <ol style="line-height: 1.8; color: #856404;">
                <li><strong>Confirmation Call:</strong> Our team will call you within 24 hours to confirm all details</li>
                <li><strong>Planning Meeting:</strong> We'll schedule a detailed planning session 2-3 weeks before your event</li>
                <li><strong>Final Coordination:</strong> Final venue setup and coordination 1 week before the event</li>
                <li><strong>Event Day:</strong> Our team will be on-site to ensure everything runs smoothly</li>
              </ol>
            </div>
            
            <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #0c5460; margin-top: 0;">📞 Need to make changes or have questions?</h4>
              <p style="margin: 5px 0; color: #0c5460;">
                <strong>Call us:</strong> <a href="tel:9122447574" style="color: #be123c;">9122447574</a><br>
                <strong>Email us:</strong> <a href="mailto:dhariaevents@gmail.com" style="color: #be123c;">dhariaevents@gmail.com</a><br>
                <strong>Reference your Booking ID:</strong> ${bookingData.id}
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">
              We're committed to making your event absolutely perfect. Thank you for trusting Dharia Events with your special celebration!
            </p>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Warm regards,<br>
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

    // Email to admin about new booking
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🎉 New Booking Confirmed - ${bookingData.packageName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #be123c, #ec4899); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Booking Confirmed!</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #be123c; margin-top: 0;">Booking Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">Booking ID:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-family: monospace; background: #f8f9fa;">${bookingData.id}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Client Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingData.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Package:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingData.packageName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Event Date:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingData.eventDate} at ${bookingData.eventTime}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Venue:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingData.venue}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Guests:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingData.guestCount}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-size: 18px; font-weight: bold; color: #be123c;">₹${bookingData.totalAmount?.toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            ${
              bookingData.specialRequests
                ? `
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #be123c; margin-top: 0;">Special Requests:</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #be123c;">
                ${bookingData.specialRequests}
              </p>
            </div>
            `
                : ""
            }
            
            <div style="background: #d4edda; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
              <h3 style="color: #155724; margin-top: 0;">Action Required:</h3>
              <ul style="color: #155724; line-height: 1.6;">
                <li>Call the client within 24 hours to confirm details</li>
                <li>Schedule a planning meeting</li>
                <li>Add to event calendar and assign team members</li>
                <li>Prepare detailed event proposal</li>
              </ul>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 15px; text-align: center;">
            <p style="margin: 0;">Dharia Events Admin Panel</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(clientMailOptions)
    await transporter.sendMail(adminMailOptions)

    return NextResponse.json({
      success: true,
      message: "Booking confirmation emails sent successfully",
    })
  } catch (error) {
    console.error("Booking confirmation email failed:", error)
    return NextResponse.json({ success: false, message: "Failed to send booking confirmation emails" }, { status: 500 })
  }
}
