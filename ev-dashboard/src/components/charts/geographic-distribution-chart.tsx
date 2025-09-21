import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { MapPin } from "lucide-react"

interface GeographicDistributionChartProps {
  data: Array<{ location: string; count: number }>
}

export function GeographicDistributionChart({ data }: GeographicDistributionChartProps) {
  return (
    <Card className="group hover:bg-green-50 transition-colors duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 group-hover:scale-125 transition-transform duration-200" />
          EV Distribution by County
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.slice(0, 8)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip formatter={(value) => [value, "Vehicles"]} labelFormatter={(label) => `County: ${label}`} />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
