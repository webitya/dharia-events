import { DM_Sans } from "next/font/google"
import { Suspense } from "react"  // Correct import
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "Dharia Events - Premier Event Management Services",
  description:
    "Professional event management services in Hazaribagh, Ranchi, Jharkhand. Specializing in weddings, birthdays, photography, videography, catering and decoration.",
  generator: "Dharia Events",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans ${dmSans.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
