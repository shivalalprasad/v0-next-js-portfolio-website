import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"
import { getMockDevInfo } from "@/lib/use-mock-data"

export async function GET() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    // If no Convex URL, return mock data
    if (!convexUrl) {
      console.log("No Convex URL, returning mock data")
      const mockData = getMockDevInfo()
      return NextResponse.json(mockData)
    }

    // Validate URL format
    try {
      new URL(convexUrl)
    } catch (e) {
      console.log("Invalid Convex URL, returning mock data")
      const mockData = getMockDevInfo()
      return NextResponse.json(mockData)
    }

    // Try to fetch from Convex
    try {
      const client = new ConvexHttpClient(convexUrl)
      const devInfo = await client.query("devInfo:get")
      return NextResponse.json(devInfo)
    } catch (convexError) {
      console.error("Convex query failed:", convexError)
      const mockData = getMockDevInfo()
      return NextResponse.json(mockData)
    }
  } catch (error) {
    console.error("Error in dev-info API route:", error)
    // Return mock data as fallback
    const mockData = getMockDevInfo()
    return NextResponse.json(mockData)
  }
}
