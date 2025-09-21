import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface MakeDistributionChartProps {
  data: Array<{ make: string; count: number }>
}

export function MakeDistributionChart({ data }: MakeDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>EV Manufacturers</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.slice(0, 8)} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="make" type="category" width={80} />
            <Tooltip formatter={(value) => [value, "Vehicles"]} labelFormatter={(label) => `Make: ${label}`} />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
