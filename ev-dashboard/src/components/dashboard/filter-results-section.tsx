"use client"

import type { EVRecord, EVStats } from "../../types/ev-data"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { motion } from "framer-motion"
import { formatNumber, formatCurrency } from "../../lib/utils"
import { Car, Battery, DollarSign, MapPin, Zap } from "lucide-react"

interface FilterResultsSectionProps {
  data: EVRecord[]
  stats: EVStats
  totalRecords: number
}

export function FilterResultsSection({ data, stats, totalRecords }: FilterResultsSectionProps) {
  const filteredPercentage = Math.round((data.length / totalRecords) * 100)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-balance hover:text-primary transition-colors duration-200 cursor-default">
          Filtered Results
        </h2>
        <p className="text-muted-foreground mt-2">
          {formatNumber(data.length)} vehicles match your criteria ({filteredPercentage}% of total dataset)
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:bg-green-50 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Filtered Results</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground group-hover:scale-125 transition-transform duration-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatNumber(data.length)}</div>
            <p className="text-xs text-muted-foreground mt-1">{filteredPercentage}% of total dataset</p>
          </CardContent>
        </Card>

        <Card className="group hover:bg-green-50 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Range</CardTitle>
            <Battery className="h-4 w-4 text-muted-foreground group-hover:scale-125 transition-transform duration-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.averageRange} mi</div>
            <p className="text-xs text-muted-foreground mt-1">electric driving range</p>
          </CardContent>
        </Card>

        <Card className="group hover:bg-green-50 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average MSRP</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground group-hover:scale-125 transition-transform duration-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(stats.averageMSRP)}</div>
            <p className="text-xs text-muted-foreground mt-1">manufacturer suggested retail price</p>
          </CardContent>
        </Card>

        <Card className="group hover:bg-green-50 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">BEV Percentage</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground group-hover:scale-125 transition-transform duration-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round((stats.bevCount / stats.totalVehicles) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">battery electric vehicles</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="hover:text-primary transition-colors duration-200 cursor-default">
              Vehicle Type Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.evTypeDistribution.map((type) => (
              <div key={type.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={type.type === "BEV" ? "default" : "secondary"}>{type.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {type.type === "BEV" ? "Battery Electric" : "Plug-in Hybrid"}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatNumber(type.count)}</div>
                  <div className="text-xs text-muted-foreground">{type.percentage}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="hover:text-primary transition-colors duration-200 cursor-default">
              Top Manufacturers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.topMakes.slice(0, 5).map((make, index) => (
              <div key={make.make} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <span className="font-medium">{make.make}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatNumber(make.count)}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((make.count / stats.totalVehicles) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      {stats.geographicDistribution.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="hover:text-primary transition-colors duration-200 cursor-default">
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.geographicDistribution.slice(0, 6).map((location, index) => (
                <div
                  key={location.location}
                  className="group flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground group-hover:scale-125 transition-transform duration-200" />
                    <span className="font-medium">{location.location}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatNumber(location.count)}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((location.count / stats.totalVehicles) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}