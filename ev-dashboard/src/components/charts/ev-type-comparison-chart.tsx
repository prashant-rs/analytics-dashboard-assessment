import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface EVTypeComparisonChartProps {
  data: Array<{ type: string; count: number; percentage: number }>
}

const COLORS = ["hsl(var(--primary))", "hsl(142 76% 55%)"]

export function EVTypeComparisonChart({ data }: EVTypeComparisonChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>BEV vs PHEV Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ type, percentage }) => `${type}: ${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, "Vehicles"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
