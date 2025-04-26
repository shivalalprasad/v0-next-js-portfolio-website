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
    // Simulate loading delay for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
