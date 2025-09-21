"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricsCard({ title, value, subtitle, icon: Icon, trend, className }: MetricsCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className={`${className} group hover:bg-green-50 transition-colors duration-200 cursor-pointer`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground group-hover:scale-125 transition-transform duration-200" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trend && (
            <div className={`text-xs mt-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
              {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}% from last period
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}