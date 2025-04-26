import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"

export async function GET() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    if (!convexUrl) {
      return NextResponse.json({ error: "Convex URL not configured" }, { status: 500 })
    }

    const client = new ConvexHttpClient(convexUrl)
    const aboutData = await client.query("aboutData:get")

    return NextResponse.json(aboutData)
  } catch (error) {
    console.error("Error fetching about data:", error)
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 })
  }
}
