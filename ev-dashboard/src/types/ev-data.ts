export interface EVRecord {
  id: string
  vin: string
  county: string
  city: string
  state: string
  postalCode: string
  modelYear: number
  make: string
  model: string
  evType: "Battery Electric Vehicle (BEV)" | "Plug-in Hybrid Electric Vehicle (PHEV)"
  cafvEligibility:
    | "Clean Alternative Fuel Vehicle Eligible"
    | "Eligibility unknown as battery range has not been researched"
    | "Not eligible due to low battery range"
  electricRange: number
  baseMSRP: number
  legislativeDistrict: string
  dolVehicleId: string
  vehicleLocation: string
  electricUtility: string
  censusTrack: string
}

export interface EVStats {
  totalVehicles: number
  bevCount: number
  phevCount: number
  averageRange: number
  averageMSRP: number
  topMakes: Array<{ make: string; count: number }>
  topModels: Array<{ model: string; make: string; count: number }>
  yearlyDistribution: Array<{ year: number; count: number }>
  rangeDistribution: Array<{ range: string; count: number }>
  priceDistribution: Array<{ price: string; count: number }>
  geographicDistribution: Array<{ location: string; count: number }>
  evTypeDistribution: Array<{ type: string; count: number; percentage: number }>
}
