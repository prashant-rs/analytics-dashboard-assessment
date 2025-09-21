"use client"

import { Car, BarChart3, Table, Filter } from "lucide-react"
import { Button } from "../ui/button"
import { motion } from "framer-motion"

const logo = "/public/logo.png";

interface HeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "data", label: "Data Table", icon: Table },
    { id: "filters", label: "Filters", icon: Filter },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-2">
           <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-xl font-bold text-balance hover:text-primary hover:scale-105 transition-all duration-200 cursor-default">
            EV Population Dashboard
          </h1>
      {/* <motion.div
  initial={{ x: 0 }}
  animate={{ x: [0, 40, 0] }}
  transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
  whileHover={{ scale: 1.05 }}
  className="cursor-grab"
>
  <Car className="h-6 w-6 text-primary" />
</motion.div> */}
        </div>

        <nav className="ml-auto flex items-center space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
