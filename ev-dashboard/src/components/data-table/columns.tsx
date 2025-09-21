import type { ColumnDef } from "@tanstack/react-table"
import type { EVRecord } from "../../types/ev-data"
import { Badge } from "../ui/badge"
import { formatCurrency } from "../../lib/utils"

export const columns: ColumnDef<EVRecord>[] = [
  {
    accessorKey: "make",
    header: "Make",
    cell: ({ row }) => <div className="font-medium">{row.getValue("make")}</div>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("model")}</div>,
  },
  {
    accessorKey: "modelYear",
    header: "Year",
    cell: ({ row }) => <div className="text-center">{row.getValue("modelYear")}</div>,
  },
  {
    accessorKey: "evType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("evType") as string
      const isBEV = type === "Battery Electric Vehicle (BEV)"
      return <Badge variant={isBEV ? "default" : "secondary"}>{isBEV ? "BEV" : "PHEV"}</Badge>
    },
  },
  {
    accessorKey: "electricRange",
    header: "Range (mi)",
    cell: ({ row }) => {
      const range = row.getValue("electricRange") as number
      return <div className="text-center">{range > 0 ? range : "N/A"}</div>
    },
  },
  {
    accessorKey: "baseMSRP",
    header: "MSRP",
    cell: ({ row }) => {
      const price = row.getValue("baseMSRP") as number
      return <div className="text-right font-medium">{price > 0 ? formatCurrency(price) : "N/A"}</div>
    },
  },
  {
    accessorKey: "county",
    header: "County",
    cell: ({ row }) => <div>{row.getValue("county")}</div>,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <div className="max-w-[150px] truncate">{row.getValue("city")}</div>,
  },
  {
    accessorKey: "cafvEligibility",
    header: "CAFV Eligible",
    cell: ({ row }) => {
      const eligibility = row.getValue("cafvEligibility") as string
      const isEligible = eligibility === "Clean Alternative Fuel Vehicle Eligible"
      const isUnknown = eligibility.includes("unknown")

      return (
        <Badge variant={isEligible ? "default" : isUnknown ? "secondary" : "destructive"}>
          {isEligible ? "Yes" : isUnknown ? "Unknown" : "No"}
        </Badge>
      )
    },
  },
]
