import type React from "react"
import type { Metadata } from "next"
import { Chivo } from "next/font/google";
import "./globals.css"

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EmptyCup",
  description: "Find the best designers for your projects",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={chivo.className}>{children}</body>
    </html>
  )
}
