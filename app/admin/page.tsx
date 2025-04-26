"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"

export default function AdminPage() {
  const [seedStatus, setSeedStatus] = useState<{
    devInfo?: string
    projects?: string
    aboutData?: string
  }>({})
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isConvexAvailable, setIsConvexAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if Convex is available
    const checkConvex = async () => {
      try {
        const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
        if (!convexUrl) {
          setIsConvexAvailable(false)
          return
        }

        try {
          new URL(convexUrl)
          setIsConvexAvailable(true)
        } catch (e) {
          setIsConvexAvailable(false)
        }
      } catch (err) {
        setIsConvexAvailable(false)
      }
    }

    checkConvex()
  }, [])

  const handleSeedDevInfo = async () => {
    setIsLoading(true)
    try {
      // Simulate success for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSeedStatus((prev) => ({ ...prev, devInfo: "Dev info seeded successfully (mock)" }))
      setError(null)
    } catch (err) {
      setError(`Error seeding DevInfo: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeedProjects = async () => {
    setIsLoading(true)
    try {
      // Simulate success for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSeedStatus((prev) => ({ ...prev, projects: "Projects seeded successfully (mock)" }))
      setError(null)
    } catch (err) {
      setError(`Error seeding Projects: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeedAboutData = async () => {
    setIsLoading(true)
    try {
      // Simulate success for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSeedStatus((prev) => ({ ...prev, aboutData: "About data seeded successfully (mock)" }))
      setError(null)
    } catch (err) {
      setError(`Error seeding AboutData: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeedAll = async () => {
    setIsLoading(true)
    try {
      await handleSeedDevInfo()
      await handleSeedProjects()
      await handleSeedAboutData()
      setError(null)
    } catch (err) {
      setError(`Error seeding data: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isConvexAvailable === false) {
    return (
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Convex Not Available</AlertTitle>
          <AlertDescription>
            Convex is not available in this environment. The admin functionality is limited.
            <br />
            <br />
            To use Convex:
            <ol className="list-decimal ml-5 mt-2">
              <li>Make sure you have set up the NEXT_PUBLIC_CONVEX_URL environment variable</li>
              <li>Ensure the URL is a valid absolute URL</li>
              <li>
                Run the Convex development server with{" "}
                <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">npx convex dev</code>
              </li>
            </ol>
          </AlertDescription>
        </Alert>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Mock Data</h2>
          <p className="mb-4">The application is currently using mock data. Database seeding is not available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Seed Database</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleSeedDevInfo} disabled={isLoading}>
              Seed Dev Info
            </Button>
            <Button onClick={handleSeedProjects} disabled={isLoading}>
              Seed Projects
            </Button>
            <Button onClick={handleSeedAboutData} disabled={isLoading}>
              Seed About Data
            </Button>
            <Button onClick={handleSeedAll} variant="default" disabled={isLoading}>
              Seed All Data
            </Button>
          </div>

          {Object.entries(seedStatus).length > 0 && (
            <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                Seed Status:
              </h3>
              <ul className="space-y-1">
                {Object.entries(seedStatus).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
