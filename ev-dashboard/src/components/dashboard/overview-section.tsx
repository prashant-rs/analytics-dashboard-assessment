import { MetricsCard } from "./metrics-card"
import type { EVStats } from "../../types/ev-data"
import { Car, Battery, DollarSign, MapPin, Calendar, Zap } from "lucide-react"
import { formatNumber, formatCurrency } from "../../lib/utils"

interface OverviewSectionProps {
  stats: EVStats
}

export function OverviewSection({ stats }: OverviewSectionProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-balance hover:text-primary transition-colors duration-200 cursor-default">
          Electric Vehicle Population Overview
        </h2>
        <p className="text-muted-foreground mt-2">Comprehensive analysis of electric vehicle adoption and trends</p>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Vehicles"
          value={formatNumber(stats.totalVehicles)}
          subtitle="registered electric vehicles"
          icon={Car}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricsCard
          title="Average Range"
          value={`${stats.averageRange} mi`}
          subtitle="electric driving range"
          icon={Battery}
          trend={{ value: 8.3, isPositive: true }}
        />
        <MetricsCard
          title="Average MSRP"
          value={formatCurrency(stats.averageMSRP)}
          subtitle="manufacturer suggested retail price"
          icon={DollarSign}
          trend={{ value: 2.1, isPositive: false }}
        />
        <MetricsCard
          title="BEV Adoption"
          value={`${Math.round((stats.bevCount / stats.totalVehicles) * 100)}%`}
          subtitle={`${formatNumber(stats.bevCount)} battery electric vehicles`}
          icon={Zap}
          trend={{ value: 15.7, isPositive: true }}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricsCard
          title="PHEV Count"
          value={formatNumber(stats.phevCount)}
          subtitle="plug-in hybrid electric vehicles"
          icon={Battery}
        />
        <MetricsCard
          title="Top County"
          value={stats.geographicDistribution[0]?.location || "N/A"}
          subtitle={`${formatNumber(stats.geographicDistribution[0]?.count || 0)} vehicles`}
          icon={MapPin}
        />
        <MetricsCard
          title="Latest Model Year"
          value={Math.max(...stats.yearlyDistribution.map((d) => d.year))}
          subtitle="most recent vehicles in dataset"
          icon={Calendar}
        />
      </div>

      {/* Top Makes Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 hover:text-primary transition-colors duration-200 cursor-default">
          Top Electric Vehicle Manufacturers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.topMakes.slice(0, 5).map((make, index) => (
            <div
              key={make.make}
              className="group bg-card rounded-lg border p-4 hover:bg-green-50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((make.count / stats.totalVehicles) * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-5 w-5 text-primary group-hover:scale-125 transition-transform duration-200" />
                <h4 className="font-semibold text-lg hover:text-primary transition-colors duration-200 cursor-default">
                  {make.make}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">{formatNumber(make.count)} vehicles</p>
            </div>
          ))}
        </div>
      </div>

      {/* EV Type Distribution */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 hover:text-primary transition-colors duration-200 cursor-default">
          Vehicle Type Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.evTypeDistribution.map((type) => (
            <div
              key={type.type}
              className="group bg-card rounded-lg border p-6 hover:bg-green-50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Battery className="h-5 w-5 text-primary group-hover:scale-125 transition-transform duration-200" />
                  <h4 className="font-semibold text-lg hover:text-primary transition-colors duration-200 cursor-default">
                    {type.type === "BEV" ? "Battery Electric Vehicle" : "Plug-in Hybrid Electric Vehicle"}
                  </h4>
                </div>
                <span className="text-2xl font-bold text-primary">{type.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${type.percentage}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{formatNumber(type.count)} vehicles</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
