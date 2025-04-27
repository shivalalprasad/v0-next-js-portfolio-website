"use client"

import { useState, useEffect, type ReactNode } from "react"
import { ConvexProvider, ConvexReactClient } from "convex/react"

// Function to validate URL format
function isValidUrl(string: string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// Helper to check if we're in a preview environment
function isPreviewEnvironment() {
  // Check for common preview environment indicators
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
    !process.env.NEXT_PUBLIC_CONVEX_URL ||
    (typeof window !== "undefined" && window.location.hostname === "localhost")
  )
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ConvexReactClient | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Only run once
    if (isInitialized) return
    setIsInitialized(true)

    // Skip Convex initialization in preview environments
    if (isPreviewEnvironment()) {
      console.log("Skipping Convex initialization in preview environment")
      return
    }

    // Only create the client on the client side
    if (typeof window === "undefined") return

    try {
      const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

      // Log for debugging
      console.log("NEXT_PUBLIC_CONVEX_URL:", convexUrl)

      // Skip if no URL or invalid URL
      if (!convexUrl || !isValidUrl(convexUrl)) {
        console.warn("Invalid or missing Convex URL, skipping Convex initialization")
        return
      }

      // Create client only if URL is valid
      const newClient = new ConvexReactClient(convexUrl)
      setClient(newClient)
    } catch (err) {
      console.error("Failed to initialize Convex client:", err)
    }
  }, [isInitialized])

  // If there's no client, just render children without Convex
  if (!client) {
    return <>{children}</>
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>
}
