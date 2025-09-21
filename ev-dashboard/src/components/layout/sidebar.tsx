"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Select } from "../ui/select"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { X, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { useCallback } from "react"

interface FilterState {
  make?: string
  evType?: string
  yearRange?: [number, number]
  priceRange?: [number, number]
  rangeMin?: number
  county?: string
}

interface SidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableMakes: string[]
  availableCounties: string[]
}

export function Sidebar({ filters, onFiltersChange, availableMakes, availableCounties }: SidebarProps) {
  const safeFilters = filters || {}

  const clearFilters = useCallback(() => {
    onFiltersChange({})
  }, [onFiltersChange])

  const updateFilter = useCallback(
    (key: keyof FilterState, value: any) => {
      onFiltersChange({ ...safeFilters, [key]: value })
    },
    [safeFilters, onFiltersChange],
  )

  const removeFilter = useCallback(
    (key: keyof FilterState) => {
      const newFilters = { ...safeFilters }
      delete newFilters[key]
      onFiltersChange(newFilters)
    },
    [safeFilters, onFiltersChange],
  )

  const activeFiltersCount = Object.keys(safeFilters).filter(
    (key) => safeFilters[key as keyof FilterState] !== undefined && safeFilters[key as keyof FilterState] !== "",
  ).length

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-80 border-r bg-muted/10 p-4 space-y-4"
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <CardTitle className="text-lg hover:text-primary transition-colors duration-200 cursor-default">
                Filters
              </CardTitle>
              {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters} disabled={activeFiltersCount === 0}>
              <X className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {safeFilters.make && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Make: {safeFilters.make}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("make")} />
                  </Badge>
                )}
                {safeFilters.evType && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Type: {safeFilters.evType === "Battery Electric Vehicle (BEV)" ? "BEV" : "PHEV"}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("evType")} />
                  </Badge>
                )}
                {safeFilters.county && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    County: {safeFilters.county}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("county")} />
                  </Badge>
                )}
                {safeFilters.rangeMin && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Range: {safeFilters.rangeMin}+ mi
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("rangeMin")} />
                  </Badge>
                )}
                {safeFilters.yearRange && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Year: {safeFilters.yearRange[0]}-{safeFilters.yearRange[1]}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("yearRange")} />
                  </Badge>
                )}
                {safeFilters.priceRange && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Price: ${safeFilters.priceRange[0].toLocaleString()}-${safeFilters.priceRange[1].toLocaleString()}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("priceRange")} />
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="border-t pt-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Make</label>
              <Select
                value={safeFilters.make || ""}
                onChange={(e) => updateFilter("make", e.target.value || undefined)}
              >
                <option value="">All Makes</option>
                {availableMakes?.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">EV Type</label>
              <Select
                value={safeFilters.evType || ""}
                onChange={(e) => updateFilter("evType", e.target.value || undefined)}
              >
                <option value="">All Types</option>
                <option value="Battery Electric Vehicle (BEV)">Battery Electric Vehicle (BEV)</option>
                <option value="Plug-in Hybrid Electric Vehicle (PHEV)">Plug-in Hybrid Electric Vehicle (PHEV)</option>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">County</label>
              <Select
                value={safeFilters.county || ""}
                onChange={(e) => updateFilter("county", e.target.value || undefined)}
              >
                <option value="">All Counties</option>
                {availableCounties?.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Min Electric Range (miles)</label>
              <Input
                type="number"
                placeholder="e.g., 200"
                value={safeFilters.rangeMin || ""}
                onChange={(e) => updateFilter("rangeMin", e.target.value ? Number.parseInt(e.target.value) : undefined)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Model Year Range</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="From"
                  value={safeFilters.yearRange?.[0] || ""}
                  onChange={(e) => {
                    const from = e.target.value ? Number.parseInt(e.target.value) : undefined
                    const to = safeFilters.yearRange?.[1]
                    updateFilter(
                      "yearRange",
                      from && to ? [from, to] : from ? [from, new Date().getFullYear()] : undefined,
                    )
                  }}
                />
                <Input
                  type="number"
                  placeholder="To"
                  value={safeFilters.yearRange?.[1] || ""}
                  onChange={(e) => {
                    const to = e.target.value ? Number.parseInt(e.target.value) : undefined
                    const from = safeFilters.yearRange?.[0] || 2015
                    updateFilter("yearRange", from && to ? [from, to] : undefined)
                  }}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Price Range (MSRP)</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min $"
                  value={safeFilters.priceRange?.[0] || ""}
                  onChange={(e) => {
                    const min = e.target.value ? Number.parseInt(e.target.value) : undefined
                    const max = safeFilters.priceRange?.[1]
                    updateFilter("priceRange", min && max ? [min, max] : min ? [min, 200000] : undefined)
                  }}
                />
                <Input
                  type="number"
                  placeholder="Max $"
                  value={safeFilters.priceRange?.[1] || ""}
                  onChange={(e) => {
                    const max = e.target.value ? Number.parseInt(e.target.value) : undefined
                    const min = safeFilters.priceRange?.[0] || 0
                    updateFilter("priceRange", min && max ? [min, max] : undefined)
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filter Presets */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg hover:text-primary transition-colors duration-200 cursor-default">
            Quick Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-transparent"
            onClick={() => updateFilter("evType", "Battery Electric Vehicle (BEV)")}
          >
            BEV Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-transparent"
            onClick={() => updateFilter("rangeMin", 200)}
          >
            200+ Mile Range
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-transparent"
            onClick={() => updateFilter("make", "TESLA")}
          >
            Tesla Vehicles
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-transparent"
            onClick={() => updateFilter("yearRange", [2020, new Date().getFullYear()])}
          >
            Recent Models (2020+)
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
