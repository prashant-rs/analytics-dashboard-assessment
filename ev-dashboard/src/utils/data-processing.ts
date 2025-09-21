import type { EVRecord, EVStats } from "../types/ev-data"

export const processEVData = (data: EVRecord[]): EVStats => {
  const totalVehicles = data.length
  const bevCount = data.filter((record) => record.evType === "Battery Electric Vehicle (BEV)").length
  const phevCount = data.filter((record) => record.evType === "Plug-in Hybrid Electric Vehicle (PHEV)").length

  const averageRange = Math.round(data.reduce((sum, record) => sum + record.electricRange, 0) / totalVehicles)

  const averageMSRP = Math.round(data.reduce((sum, record) => sum + record.baseMSRP, 0) / totalVehicles)

  // Top makes
  const makeCount = data.reduce(
    (acc, record) => {
      acc[record.make] = (acc[record.make] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topMakes = Object.entries(makeCount)
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Top models
  const modelCount = data.reduce(
    (acc, record) => {
      const key = `${record.make} ${record.model}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topModels = Object.entries(modelCount)
    .map(([modelKey, count]) => {
      const [make, ...modelParts] = modelKey.split(" ")
      return { model: modelParts.join(" "), make, count }
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Yearly distribution
  const yearCount = data.reduce(
    (acc, record) => {
      acc[record.modelYear] = (acc[record.modelYear] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  const yearlyDistribution = Object.entries(yearCount)
    .map(([year, count]) => ({ year: Number.parseInt(year), count }))
    .sort((a, b) => a.year - b.year)

  // Range distribution
  const rangeDistribution = [
    { range: "0-50", count: data.filter((r) => r.electricRange <= 50).length },
    { range: "51-100", count: data.filter((r) => r.electricRange > 50 && r.electricRange <= 100).length },
    { range: "101-200", count: data.filter((r) => r.electricRange > 100 && r.electricRange <= 200).length },
    { range: "201-300", count: data.filter((r) => r.electricRange > 200 && r.electricRange <= 300).length },
    { range: "300+", count: data.filter((r) => r.electricRange > 300).length },
  ]

  // Price distribution
  const priceDistribution = [
    { price: "Under $30k", count: data.filter((r) => r.baseMSRP < 30000).length },
    { price: "$30k-$50k", count: data.filter((r) => r.baseMSRP >= 30000 && r.baseMSRP < 50000).length },
    { price: "$50k-$70k", count: data.filter((r) => r.baseMSRP >= 50000 && r.baseMSRP < 70000).length },
    { price: "$70k-$100k", count: data.filter((r) => r.baseMSRP >= 70000 && r.baseMSRP < 100000).length },
    { price: "$100k+", count: data.filter((r) => r.baseMSRP >= 100000).length },
  ]

  // Geographic distribution
  const countyCount = data.reduce(
    (acc, record) => {
      acc[record.county] = (acc[record.county] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const geographicDistribution = Object.entries(countyCount)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // EV type distribution
  const evTypeDistribution = [
    {
      type: "BEV",
      count: bevCount,
      percentage: Math.round((bevCount / totalVehicles) * 100),
    },
    {
      type: "PHEV",
      count: phevCount,
      percentage: Math.round((phevCount / totalVehicles) * 100),
    },
  ]

  return {
    totalVehicles,
    bevCount,
    phevCount,
    averageRange,
    averageMSRP,
    topMakes,
    topModels,
    yearlyDistribution,
    rangeDistribution,
    priceDistribution,
    geographicDistribution,
    evTypeDistribution,
  }
}

export const filterEVData = (
  data: EVRecord[],
  filters: {
    make?: string
    evType?: string
    yearRange?: [number, number]
    priceRange?: [number, number]
    rangeMin?: number
    county?: string
  },
): EVRecord[] => {
  return data.filter((record) => {
    if (filters.make && record.make !== filters.make) return false
    if (filters.evType && record.evType !== filters.evType) return false
    if (filters.yearRange && (record.modelYear < filters.yearRange[0] || record.modelYear > filters.yearRange[1]))
      return false
    if (filters.priceRange && (record.baseMSRP < filters.priceRange[0] || record.baseMSRP > filters.priceRange[1]))
      return false
    if (filters.rangeMin && record.electricRange < filters.rangeMin) return false
    if (filters.county && record.county !== filters.county) return false
    return true
  })
}
