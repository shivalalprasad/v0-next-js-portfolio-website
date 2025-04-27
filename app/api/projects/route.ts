import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"
import { getMockProjects } from "@/lib/use-mock-data"

export async function GET() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    // If no Convex URL, return mock data
    if (!convexUrl) {
      console.log("No Convex URL, returning mock data")
      const mockData = getMockProjects()
      return NextResponse.json(mockData)
    }

    // Validate URL format
    try {
      new URL(convexUrl)
    } catch (e) {
      console.log("Invalid Convex URL, returning mock data")
      const mockData = getMockProjects()
      return NextResponse.json(mockData)
    }

    // Try to fetch from Convex
    try {
      const client = new ConvexHttpClient(convexUrl)
      const projects = await client.query("projects:list")
      return NextResponse.json(projects)
    } catch (convexError) {
      console.error("Convex query failed:", convexError)
      const mockData = getMockProjects()
      return NextResponse.json(mockData)
    }
  } catch (error) {
    console.error("Error in projects API route:", error)
    // Return mock data as fallback
    const mockData = getMockProjects()
    return NextResponse.json(mockData)
  }
}
