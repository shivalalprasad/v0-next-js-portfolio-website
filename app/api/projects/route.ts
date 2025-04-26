import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"

export async function GET() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    if (!convexUrl) {
      return NextResponse.json({ error: "Convex URL not configured" }, { status: 500 })
    }

    const client = new ConvexHttpClient(convexUrl)
    const projects = await client.query("projects:list")

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
