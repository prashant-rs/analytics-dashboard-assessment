"use client"

import type { EVRecord } from "../../types/ev-data"
import { DataTable } from "../data-table/data-table"
import { columns } from "../data-table/columns"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { motion } from "framer-motion"

interface DataTableSectionProps {
  data: EVRecord[]
}

export function DataTableSection({ data }: DataTableSectionProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-balance hover:text-primary transition-colors duration-200 cursor-default">
          Electric Vehicle Data
        </h2>
        <p className="text-muted-foreground mt-2">
          Comprehensive dataset with search, filtering, and sorting capabilities
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="hover:text-primary transition-colors duration-200 cursor-default">
            Vehicle Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </motion.div>
  )
}
