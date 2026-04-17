"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Clock, 
  Users, 
  AlertTriangle,
  Calendar,
  BarChart3
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts"

interface PredictiveStaffingProps {
  className?: string
}

const hourlyData = [
  { hour: "7AM", patients: 12, staff: 8, predicted: 15 },
  { hour: "8AM", patients: 25, staff: 12, predicted: 28 },
  { hour: "9AM", patients: 45, staff: 15, predicted: 48 },
  { hour: "10AM", patients: 52, staff: 18, predicted: 55 },
  { hour: "11AM", patients: 38, staff: 15, predicted: 42 },
  { hour: "12PM", patients: 28, staff: 12, predicted: 30 },
  { hour: "2PM", patients: 35, staff: 14, predicted: 38 },
  { hour: "3PM", patients: 42, staff: 16, predicted: 45 },
  { hour: "4PM", patients: 30, staff: 14, predicted: 32 },
  { hour: "5PM", patients: 18, staff: 10, predicted: 20 },
]

const weeklyData = [
  { day: "Mon", avgPatients: 180, staffNeeded: 22, efficiency: 92 },
  { day: "Tue", avgPatients: 220, staffNeeded: 26, efficiency: 88 },
  { day: "Wed", avgPatients: 195, staffNeeded: 24, efficiency: 91 },
  { day: "Thu", avgPatients: 240, staffNeeded: 28, efficiency: 87 },
  { day: "Fri", avgPatients: 210, staffNeeded: 25, efficiency: 89 },
  { day: "Sat", avgPatients: 150, staffNeeded: 18, efficiency: 94 },
  { day: "Sun", avgPatients: 120, staffNeeded: 15, efficiency: 96 },
]

export function PredictiveStaffing({ className }: PredictiveStaffingProps) {
  const [selectedView, setSelectedView] = useState<"today" | "weekly">("today")

  const peakHours = useMemo(() => {
    const maxPatients = Math.max(...hourlyData.map(d => d.patients))
    return hourlyData.filter(d => d.patients > maxPatients * 0.8).map(d => d.hour)
  }, [])

  const recommendations = useMemo(() => {
    const todayPeak = hourlyData.filter(d => d.predicted > d.staff * 3)
    return todayPeak.map(d => ({
      time: d.hour,
      currentStaff: d.staff,
      recommendedStaff: Math.ceil(d.predicted / 3),
      reason: "High patient volume predicted",
    }))
  }, [])

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Predictive Staffing</h2>
          <p className="text-sm text-muted-foreground">
            AI-powered workforce optimization based on historical patterns
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView("today")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedView === "today"
                ? "bg-janseva-green text-white"
                : "glass-button"
            )}
          >
            Today
          </button>
          <button
            onClick={() => setSelectedView("weekly")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedView === "weekly"
                ? "bg-janseva-green text-white"
                : "glass-button"
            )}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 glass">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-janseva-green/10">
              <Users className="w-5 h-5 text-janseva-green" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Staff</p>
              <p className="text-xl font-bold">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 glass">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-vivid/10">
              <Clock className="w-5 h-5 text-amber-vivid" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Peak Hours</p>
              <p className="text-xl font-bold">{peakHours.join(", ")}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 glass">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-electric-blue/10">
              <TrendingUp className="w-5 h-5 text-electric-blue" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Efficiency</p>
              <p className="text-xl font-bold">91%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 glass">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Shortage Risk</p>
              <p className="text-xl font-bold">{recommendations.length} slots</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Volume Chart */}
        <Card className="p-6 glass">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-janseva-green" />
            Patient Volume Forecast
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedView === "today" ? hourlyData : weeklyData}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A651" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A651" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F37021" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F37021" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey={selectedView === "today" ? "hour" : "day"} 
                  stroke="rgba(255,255,255,0.5)"
                  fontSize={12}
                />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(10, 10, 11, 0.9)", 
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={selectedView === "today" ? "patients" : "avgPatients"} 
                  stroke="#00A651" 
                  fillOpacity={1} 
                  fill="url(#colorPatients)" 
                  name="Actual"
                />
                {selectedView === "today" && (
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#F37021" 
                    fillOpacity={1} 
                    fill="url(#colorPredicted)" 
                    name="Predicted"
                    strokeDasharray="5 5"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Staffing Efficiency */}
        <Card className="p-6 glass">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-janseva-green" />
            Staffing Efficiency
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedView === "today" ? hourlyData : weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey={selectedView === "today" ? "hour" : "day"} 
                  stroke="rgba(255,255,255,0.5)"
                  fontSize={12}
                />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(10, 10, 11, 0.9)", 
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="staff" 
                  fill="#00A651" 
                  name="Current Staff"
                  radius={[4, 4, 0, 0]}
                />
                {selectedView === "weekly" && (
                  <Bar 
                    dataKey="staffNeeded" 
                    fill="#F37021" 
                    name="Recommended"
                    radius={[4, 4, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6 glass">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-vivid" />
          Staffing Recommendations
        </h3>
        
        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.time}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-amber-vivid/10 border border-amber-vivid/30"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-amber-vivid/20">
                    <Clock className="w-5 h-5 text-amber-vivid" />
                  </div>
                  <div>
                    <p className="font-medium">{rec.time} - Additional Staff Needed</p>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="font-medium">{rec.currentStaff}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-janseva-green">Recommended</p>
                    <p className="font-bold text-janseva-green">{rec.recommendedStaff}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-janseva-green mx-auto mb-4" />
            <p className="text-muted-foreground">
              Staffing levels are optimal for today&apos;s predicted patient volume
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  )
}
