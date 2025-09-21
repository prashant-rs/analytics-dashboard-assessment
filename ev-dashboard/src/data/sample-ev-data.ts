import type { EVRecord } from "../types/ev-data"

// Generate realistic sample EV data
export const generateSampleEVData = (): EVRecord[] => {
  const makes = ["TESLA", "NISSAN", "CHEVROLET", "BMW", "FORD", "AUDI", "HYUNDAI", "KIA", "VOLKSWAGEN", "MERCEDES-BENZ"]
  const models = {
    TESLA: ["MODEL 3", "MODEL Y", "MODEL S", "MODEL X"],
    NISSAN: ["LEAF"],
    CHEVROLET: ["BOLT EV", "VOLT"],
    BMW: ["I3", "I4", "IX"],
    FORD: ["MUSTANG MACH-E", "F-150 LIGHTNING"],
    AUDI: ["E-TRON", "E-TRON GT"],
    HYUNDAI: ["IONIQ 5", "KONA ELECTRIC"],
    KIA: ["EV6", "NIRO EV"],
    VOLKSWAGEN: ["ID.4"],
    "MERCEDES-BENZ": ["EQS", "EQC"],
  }

  const counties = ["King", "Pierce", "Snohomish", "Spokane", "Clark", "Thurston", "Whatcom", "Skagit"]
  const cities = ["Seattle", "Bellevue", "Tacoma", "Spokane", "Vancouver", "Kent", "Everett", "Renton"]
  const evTypes: Array<"Battery Electric Vehicle (BEV)" | "Plug-in Hybrid Electric Vehicle (PHEV)"> = [
    "Battery Electric Vehicle (BEV)",
    "Plug-in Hybrid Electric Vehicle (PHEV)",
  ]

  const cafvOptions: Array<
    | "Clean Alternative Fuel Vehicle Eligible"
    | "Eligibility unknown as battery range has not been researched"
    | "Not eligible due to low battery range"
  > = [
    "Clean Alternative Fuel Vehicle Eligible",
    "Eligibility unknown as battery range has not been researched",
    "Not eligible due to low battery range",
  ]

  const data: EVRecord[] = []

  for (let i = 0; i < 5000; i++) {
    const make = makes[Math.floor(Math.random() * makes.length)]
    const modelOptions = models[make as keyof typeof models]
    const model = modelOptions[Math.floor(Math.random() * modelOptions.length)]
    const evType = evTypes[Math.floor(Math.random() * evTypes.length)]
    const modelYear = 2015 + Math.floor(Math.random() * 9) // 2015-2023

    // Realistic ranges based on EV type and make
    let electricRange = 0
    let baseMSRP = 0

    if (evType === "Battery Electric Vehicle (BEV)") {
      if (make === "TESLA") {
        electricRange = 250 + Math.floor(Math.random() * 150) // 250-400
        baseMSRP = 45000 + Math.floor(Math.random() * 55000) // 45k-100k
      } else if (make === "NISSAN") {
        electricRange = 150 + Math.floor(Math.random() * 100) // 150-250
        baseMSRP = 30000 + Math.floor(Math.random() * 15000) // 30k-45k
      } else {
        electricRange = 200 + Math.floor(Math.random() * 150) // 200-350
        baseMSRP = 35000 + Math.floor(Math.random() * 40000) // 35k-75k
      }
    } else {
      electricRange = 20 + Math.floor(Math.random() * 40) // 20-60 for PHEV
      baseMSRP = 30000 + Math.floor(Math.random() * 30000) // 30k-60k
    }

    data.push({
      id: `EV${i.toString().padStart(6, "0")}`,
      vin: `1HGBH41JXMN${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      county: counties[Math.floor(Math.random() * counties.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      state: "WA",
      postalCode: `98${Math.floor(Math.random() * 900) + 100}`,
      modelYear,
      make,
      model,
      evType,
      cafvEligibility: cafvOptions[Math.floor(Math.random() * cafvOptions.length)],
      electricRange,
      baseMSRP,
      legislativeDistrict: `${Math.floor(Math.random() * 49) + 1}`,
      dolVehicleId: Math.floor(Math.random() * 1000000).toString(),
      vehicleLocation: `POINT (-122.${Math.floor(Math.random() * 999999)} 47.${Math.floor(Math.random() * 999999)})`,
      electricUtility: "PUGET SOUND ENERGY INC",
      censusTrack: `53033${Math.floor(Math.random() * 999999)
        .toString()
        .padStart(6, "0")}`,
    })
  }

  return data
}

export const sampleEVData = generateSampleEVData()
