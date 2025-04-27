"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { useMockDevInfo, useMockProjects, useMockAboutData } from "./use-mock-data"
import type { DevInfo, Project, AboutData } from "./types"

interface DataContextType {
  devInfo: DevInfo | null
  projects: Project[]
  aboutData: AboutData | null
  isLoading: boolean
}

const DataContext = createContext<DataContextType>({
  devInfo: null,
  projects: [],
  aboutData: null,
  isLoading: true,
})

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

export function DataProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  // Get mock data
  const mockDevInfo = useMockDevInfo()
  const mockProjects = useMockProjects()
  const mockAboutData = useMockAboutData()

  // Initialize with mock data
  const [data, setData] = useState({
    devInfo: mockDevInfo,
    projects: mockProjects,
    aboutData: mockAboutData,
  })

  useEffect(() => {
    // Always use mock data in preview environments
    if (isPreviewEnvironment()) {
      console.log("Using mock data in preview environment")
      // Simulate loading delay for a smoother experience
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }

    // In production, try to fetch real data
    const fetchData = async () => {
      try {
        // Simulate loading delay for a smoother experience
        await new Promise((resolve) => setTimeout(resolve, 500))

        // In a real environment, we would fetch data here
        // For now, just use mock data
        setData({
          devInfo: mockDevInfo,
          projects: mockProjects,
          aboutData: mockAboutData,
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        // Fall back to mock data on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [mockDevInfo, mockProjects, mockAboutData])

  return (
    <DataContext.Provider
      value={{
        ...data,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
