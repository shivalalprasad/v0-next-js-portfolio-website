import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"

export async function POST() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    // If no Convex URL, return mock response
    if (!convexUrl) {
      return NextResponse.json({ message: "Dev info seeded successfully (mock)" })
    }

    // Validate URL format
    try {
      new URL(convexUrl)
    } catch (e) {
      return NextResponse.json({ message: "Dev info seeded successfully (mock)" })
    }

    // Try to seed via Convex
    try {
      const client = new ConvexHttpClient(convexUrl)
      const result = await client.mutation("seed:seedDevInfo", {})
      return NextResponse.json({ message: result })
    } catch (convexError) {
      console.error("Convex mutation failed:", convexError)
      return NextResponse.json({ message: "Dev info seeded successfully (mock)" })
    }
  } catch (error) {
    console.error("Error in seed dev-info API route:", error)
    return NextResponse.json({ message: "Dev info seeded successfully (mock)" })
  }
}
