import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"

export async function POST() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    if (!convexUrl) {
      return NextResponse.json({ error: "Convex URL not configured" }, { status: 500 })
    }

    const client = new ConvexHttpClient(convexUrl)
    const result = await client.mutation("seed:seedDevInfo", {})

    return NextResponse.json({ message: result })
  } catch (error) {
    console.error("Error seeding dev info:", error)
    return NextResponse.json({ error: "Failed to seed dev info" }, { status: 500 })
  }
}
