"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Activity, 
  Calendar, 
  FileText, 
  Users, 
  Heart,
  ChevronRight,
  TrendingUp,
  Clock
} from "lucide-react"
import { AppleToolbar } from "@/components/AppleToolbar"
import { GlassPanel } from "@/components/GlassPanel"
import { MedicalBentoGrid } from "@/components/patient/MedicalBentoGrid"
import { SmartBooking } from "@/components/patient/SmartBooking"
import { CaregiverMode } from "@/components/patient/CaregiverMode"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdaptiveUI } from "@/hooks/useAdaptiveUI"
import { cn } from "@/lib/utils"

export default function PatientDashboard() {
  const [dateOfBirth, setDateOfBirth] = useState<string>("")
  const [activeTab, setActiveTab] = useState("overview")
  const { fontSize, isElderly } = useAdaptiveUI(dateOfBirth)

  useEffect(() => {
    const storedDob = localStorage.getItem("janseva-dob")
    if (storedDob) {
      setDateOfBirth(storedDob)
    }
  }, [])

  const stats = [
    { label: "Total Tests", value: "24", icon: Activity, color: "text-janseva-green" },
    { label: "Upcoming", value: "2", icon: Calendar, color: "text-amber-vivid" },
    { label: "Pending Reports", value: "1", icon: FileText, color: "text-electric-blue" },
    { label: "Family Members", value: "3", icon: Users, color: "text-rose-500" },
  ]

  const recentTests = [
    { name: "Complete Blood Count", date: "Jan 10, 2024", status: "Completed", result: "Normal" },
    { name: "Thyroid Function Test", date: "Jan 5, 2024", status: "Pending", result: "—" },
    { name: "Lipid Profile", date: "Dec 28, 2023", status: "Completed", result: "Normal" },
  ]

  return (
    <div 
      className="min-h-screen relative"
      style={{ backgroundImage: "url('/images/patient-bg.svg')", backgroundSize: "cover", backgroundAttachment: "fixed" }}
    >
      <div className="absolute inset-0 bg-background/80" />
      
      <div className="relative z-10">
        <AppleToolbar userType="patient" userName="Rajesh Kumar" />
        
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className={cn("font-bold mb-2", isElderly ? "text-4xl" : "text-3xl")}>
                Welcome back, Rajesh
              </h1>
              <p className={cn("text-muted-foreground", isElderly && "text-xl")}>
                Here&apos;s your health overview for today
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {stats.map((stat, i) => (
                <GlassPanel key={i} variant="card" className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                    </div>
                    <stat.icon className={cn("w-8 h-8", stat.color, "opacity-50")} />
                  </div>
                </GlassPanel>
              ))}
            </motion.div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="glass mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="book">Book Test</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* Recent Activity */}
                <GlassPanel variant="card" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={cn("font-semibold", fontSize)}>Recent Tests</h2>
                    <button className="text-sm text-janseva-green hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentTests.map((test, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg glass"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-janseva-green/10">
                            <Activity className="w-4 h-4 text-janseva-green" />
                          </div>
                          <div>
                            <p className="font-medium">{test.name}</p>
                            <p className="text-sm text-muted-foreground">{test.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            test.status === "Completed" 
                              ? "bg-janseva-green/20 text-janseva-green"
                              : "bg-amber-vivid/20 text-amber-vivid"
                          )}>
                            {test.status}
                          </span>
                          {test.result && (
                            <p className="text-sm text-muted-foreground mt-1">{test.result}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassPanel>

                {/* Health Trends */}
                <div className="grid md:grid-cols-2 gap-6">
                  <GlassPanel variant="card" className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-janseva-green" />
                      <h3 className="font-semibold">Health Trends</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Blood Pressure</span>
                        <span className="font-medium text-janseva-green">120/80 mmHg</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-janseva-green rounded-full" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Blood Sugar</span>
                        <span className="font-medium text-janseva-green">95 mg/dL</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-janseva-green rounded-full" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Cholesterol</span>
                        <span className="font-medium text-amber-vivid">180 mg/dL</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-amber-vivid rounded-full" />
                      </div>
                    </div>
                  </GlassPanel>

                  <GlassPanel variant="card" className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-janseva-orange" />
                      <h3 className="font-semibold">Upcoming Appointments</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg glass">
                        <p className="font-medium">Annual Health Checkup</p>
                        <p className="text-sm text-muted-foreground">Jan 20, 2024 at 9:00 AM</p>
                      </div>
                      <div className="p-3 rounded-lg glass">
                        <p className="font-medium">Diabetes Follow-up</p>
                        <p className="text-sm text-muted-foreground">Jan 25, 2024 at 2:00 PM</p>
                      </div>
                    </div>
                  </GlassPanel>
                </div>
              </TabsContent>

              <TabsContent value="book" className="mt-0">
                <GlassPanel variant="card" className="p-6">
                  <SmartBooking 
                    dateOfBirth={dateOfBirth}
                    onBookTest={(test, date, time) => {
                      console.log("Booked:", test, date, time)
                      alert(`Test booked: ${test.name} on ${date} at ${time}`)
                    }}
                    onRequestTest={(testName) => {
                      console.log("Requested:", testName)
                      alert(`Test requested: ${testName}`)
                    }}
                  />
                </GlassPanel>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <GlassPanel variant="card" className="p-6">
                  <MedicalBentoGrid 
                    dateOfBirth={dateOfBirth}
                    onSubmit={(data) => {
                      console.log("Medical history:", data)
                      alert("Medical history saved!")
                    }}
                  />
                </GlassPanel>
              </TabsContent>

              <TabsContent value="family" className="mt-0">
                <GlassPanel variant="card" className="p-6">
                  <CaregiverMode 
                    currentUserDob={dateOfBirth}
                    onSwitchProfile={(profile) => {
                      console.log("Switched to:", profile)
                      alert(`Switched to ${profile.name}'s profile`)
                    }}
                  />
                </GlassPanel>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
