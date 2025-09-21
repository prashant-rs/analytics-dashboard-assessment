"use client"

import type { EVStats } from "../../types/ev-data"
import { YearlyTrendChart } from "../charts/yearly-trend-chart"
import { MakeDistributionChart } from "../charts/make-distribution-chart"
import { RangeDistributionChart } from "../charts/range-distribution-chart"
import { PriceDistributionChart } from "../charts/price-distribution-chart"
import { GeographicDistributionChart } from "../charts/geographic-distribution-chart"
import { EVTypeComparisonChart } from "../charts/ev-type-comparison-chart"
import { motion } from "framer-motion"

interface AnalyticsSectionProps {
  stats: EVStats
}
export function AnalyticsSection({ stats }: AnalyticsSectionProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-balance hover:text-primary transition-colors duration-200 cursor-default">
          Analytics & Insights
        </h2>
        <p className="text-muted-foreground mt-2">
          Interactive visualizations and trend analysis of electric vehicle data
        </p>
      </div>

      {/* First Row - Trend and Type Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <YearlyTrendChart data={stats.yearlyDistribution} />
        <EVTypeComparisonChart data={stats.evTypeDistribution} />
      </div>

      {/* Second Row - Make and Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MakeDistributionChart data={stats.topMakes} />
        <GeographicDistributionChart data={stats.geographicDistribution} />
      </div>

      {/* Third Row - Range and Price Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RangeDistributionChart data={stats.rangeDistribution} />
        <PriceDistributionChart data={stats.priceDistribution} />
      </div>

      {/* Key Insights Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 hover:text-primary transition-colors duration-200 cursor-default">
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg border p-4">
            <h4 className="font-semibold text-primary mb-2 hover:scale-105 transition-transform duration-200 cursor-default">
              Market Leader
            </h4>
            <p className="text-sm text-muted-foreground">
              {stats.topMakes[0]?.make} dominates with {stats.topMakes[0]?.count.toLocaleString()} vehicles (
              {Math.round((stats.topMakes[0]?.count / stats.totalVehicles) * 100)}% market share)
            </p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <h4 className="font-semibold text-primary mb-2 hover:scale-105 transition-transform duration-200 cursor-default">
              Range Trend
            </h4>
            <p className="text-sm text-muted-foreground">
              Average electric range is {stats.averageRange} miles, with most vehicles offering 200+ miles of electric
              driving
            </p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <h4 className="font-semibold text-primary mb-2 hover:scale-105 transition-transform duration-200 cursor-default">
              Geographic Concentration
            </h4>
            <p className="text-sm text-muted-foreground">
              {stats.geographicDistribution[0]?.location} County leads with{" "}
              {stats.geographicDistribution[0]?.count.toLocaleString()} registered EVs
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}