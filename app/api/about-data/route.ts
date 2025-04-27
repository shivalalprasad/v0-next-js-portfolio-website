import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"
import { getMockAboutData } from "@/lib/use-mock-data"

export async function GET() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    // If no Convex URL, return mock data
    if (!convexUrl) {
      console.log("No Convex URL, returning mock data")
      const mockData = getMockAboutData()
      return NextResponse.json(mockData)
    }

    // Validate URL format
    try {
      new URL(convexUrl)
    } catch (e) {
      console.log("Invalid Convex URL, returning mock data")
      const mockData = getMockAboutData()
      return NextResponse.json(mockData)
    }

    // Try to fetch from Convex
    try {
      const client = new ConvexHttpClient(convexUrl)
      const aboutData = await client.query("aboutData:get")
      return NextResponse.json(aboutData)
    } catch (convexError) {
      console.error("Convex query failed:", convexError)
      const mockData = getMockAboutData()
      return NextResponse.json(mockData)
    }
  } catch (error) {
    console.error("Error in about-data API route:", error)
    // Return mock data as fallback
    const mockData = getMockAboutData()
    return NextResponse.json(mockData)
  }
}
