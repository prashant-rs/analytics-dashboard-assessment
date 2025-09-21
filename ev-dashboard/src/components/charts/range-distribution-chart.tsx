import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface RangeDistributionChartProps {
  data: Array<{ range: string; count: number }>
}

const COLORS = ["hsl(var(--primary))", "hsl(142 76% 45%)", "hsl(142 76% 55%)", "hsl(142 76% 65%)", "hsl(142 76% 75%)"]

export function RangeDistributionChart({ data }: RangeDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Electric Range Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, "Vehicles"]} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
