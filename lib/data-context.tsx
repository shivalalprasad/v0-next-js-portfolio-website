"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { fetchDevInfo, fetchProjects, fetchAboutData } from "./data"
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
  const [data, setData] = useState<{
    devInfo: DevInfo | null
    projects: Project[]
    aboutData: AboutData | null
  }>({
    devInfo: null,
    projects: [],
    aboutData: null,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all data in parallel
        const [devInfoData, projectsData, aboutDataData] = await Promise.all([
          fetchDevInfo(),
          fetchProjects(),
          fetchAboutData(),
        ])

        setData({
          devInfo: devInfoData,
          projects: projectsData,
          aboutData: aboutDataData,
        })
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
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
