"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Header } from "../src/components/layout/header"
import { Sidebar } from "../src/components/layout/sidebar"
import { sampleEVData } from "../src/data/sample-ev-data"
import { processEVData, filterEVData } from "../src/utils/data-processing"
import { OverviewSection } from "../src/components/dashboard/overview-section"
import { AnalyticsSection } from "../src/components/dashboard/analytics-section"
import { DataTableSection } from "../src/components/dashboard/data-table-section"
import { FilterResultsSection } from "../src/components/dashboard/filter-results-section"

interface FilterState {
  make?: string
  evType?: string
  yearRange?: [number, number]
  priceRange?: [number, number]
  rangeMin?: number
  county?: string
}

function App() {
  const [activeTab, setActiveTab] = useState("overview")
  const [filters, setFilters] = useState<FilterState>({})
  const [showSidebar, setShowSidebar] = useState(false)

  // Process data with filters
  const filteredData = useMemo(() => {
    return filterEVData(sampleEVData, filters)
  }, [filters])

  const stats = useMemo(() => {
    return processEVData(filteredData)
  }, [filteredData])

  // Get unique values for filter options
  const availableMakes = useMemo(() => {
    return [...new Set(sampleEVData.map((record) => record.make))].sort()
  }, [])

  const availableCounties = useMemo(() => {
    return [...new Set(sampleEVData.map((record) => record.county))].sort()
  }, [])

  useEffect(() => {
    setShowSidebar(activeTab === "filters")
  }, [activeTab])

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="p-6">
            <OverviewSection stats={stats} />
          </div>
        )
      case "analytics":
        return (
          <div className="p-6">
            <AnalyticsSection stats={stats} />
          </div>
        )
      case "data":
        return (
          <div className="p-6">
            <DataTableSection data={filteredData} />
          </div>
        )
      case "filters":
        return (
          <div className="p-6">
            <FilterResultsSection data={filteredData} stats={stats} totalRecords={sampleEVData.length} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex">
        {showSidebar && (
          <Sidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableMakes={availableMakes}
            availableCounties={availableCounties}
          />
        )}

        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  )
}

export default App
