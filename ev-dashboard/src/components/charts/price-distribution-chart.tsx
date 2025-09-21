import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface PriceDistributionChartProps {
  data: Array<{ price: string; count: number }>
}

export function PriceDistributionChart({ data }: PriceDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Range Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="price" />
            <YAxis />
            <Tooltip formatter={(value) => [value, "Vehicles"]} labelFormatter={(label) => `Price Range: ${label}`} />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
