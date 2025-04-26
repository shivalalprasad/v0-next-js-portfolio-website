import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"

export async function GET() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    if (!convexUrl) {
      return NextResponse.json({ error: "Convex URL not configured" }, { status: 500 })
    }

    const client = new ConvexHttpClient(convexUrl)
    const devInfo = await client.query("devInfo:get")

    return NextResponse.json(devInfo)
  } catch (error) {
    console.error("Error fetching dev info:", error)
    return NextResponse.json({ error: "Failed to fetch dev info" }, { status: 500 })
  }
}
