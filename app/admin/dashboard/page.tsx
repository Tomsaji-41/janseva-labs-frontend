"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  FileText, 
  Inbox, 
  Users, 
  TrendingUp, 
  Activity,
  Shield,
  Building2
} from "lucide-react"
import { AppleToolbar } from "@/components/AppleToolbar"
import { GlassPanel } from "@/components/GlassPanel"
import { ReportVerificationQueue } from "@/components/admin/ReportVerificationQueue"
import { RequestInbox } from "@/components/admin/RequestInbox"
import { StaffMonitor } from "@/components/admin/StaffMonitor"
import { PredictiveStaffing } from "@/components/admin/PredictiveStaffing"
import { LiveRadar } from "@/components/admin/LiveRadar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  const [role, setRole] = useState<"pharmacist" | "hod">("pharmacist")
  const [activeTab, setActiveTab] = useState("reports")

  useEffect(() => {
    const storedRole = localStorage.getItem("janseva-admin-role") as "pharmacist" | "hod"
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  const isHOD = role === "hod"

  return (
    <div 
      className="min-h-screen relative"
      style={{ backgroundImage: "url('/images/admin-bg.svg')", backgroundSize: "cover", backgroundAttachment: "fixed" }}
    >
      <div className="absolute inset-0 bg-obsidian/80" />
      
      <div className="relative z-10">
        <AppleToolbar userType={isHOD ? "hod" : "pharmacist"} userName={isHOD ? "Dr. Director" : "Dr. Pharmacist"} />
        
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                {isHOD ? (
                  <Building2 className="w-6 h-6 text-amber-vivid" />
                ) : (
                  <Shield className="w-6 h-6 text-janseva-green" />
                )}
                <h1 className="text-3xl font-bold">
                  {isHOD ? "HOD Command Center" : "Pharmacist Dashboard"}
                </h1>
              </div>
              <p className="text-muted-foreground">
                {isHOD 
                  ? "Complete operational oversight and strategic management"
                  : "Report verification and test request management"
                }
              </p>
            </motion.div>

            {/* Role-specific Dashboard */}
            {!isHOD ? (
              // Pharmacist View
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="glass mb-6">
                  <TabsTrigger value="reports">
                    <FileText className="w-4 h-4 mr-2" />
                    Report Verification
                  </TabsTrigger>
                  <TabsTrigger value="requests">
                    <Inbox className="w-4 h-4 mr-2" />
                    Request Inbox
                  </TabsTrigger>
                  <TabsTrigger value="radar">
                    <Activity className="w-4 h-4 mr-2" />
                    Live Radar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="reports" className="mt-0">
                  <GlassPanel variant="card" className="p-6">
                    <ReportVerificationQueue />
                  </GlassPanel>
                </TabsContent>

                <TabsContent value="requests" className="mt-0">
                  <GlassPanel variant="card" className="p-6">
                    <RequestInbox />
                  </GlassPanel>
                </TabsContent>

                <TabsContent value="radar" className="mt-0">
                  <GlassPanel variant="card" className="p-6">
                    <LiveRadar />
                  </GlassPanel>
                </TabsContent>
              </Tabs>
            ) : (
              // HOD View
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="glass mb-6">
                  <TabsTrigger value="staff">
                    <Users className="w-4 h-4 mr-2" />
                    Staff Monitor
                  </TabsTrigger>
                  <TabsTrigger value="staffing">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Predictive Staffing
                  </TabsTrigger>
                  <TabsTrigger value="radar">
                    <Activity className="w-4 h-4 mr-2" />
                    Live Radar
                  </TabsTrigger>
                  <TabsTrigger value="reports">
                    <FileText className="w-4 h-4 mr-2" />
                    Reports
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="staff" className="mt-0">
                  <GlassPanel variant="card" className="p-6">
                    <StaffMonitor />
                  </GlassPanel>
                </TabsContent>

                <TabsContent value="staffing" className="mt-0">
                  <GlassPanel variant="card" className="p-6">
                    <PredictiveStaffing />
                  </GlassPanel>
                </TabsContent>

                <TabsContent value="radar" className="mt-0">
                  <GlassPanel variant="card" className="p-6">
                    <LiveRadar />
                  </GlassPanel>
                </TabsContent>

                <TabsContent value="reports" className="mt-0">
                  <GlassPanel variant="card" className="p-6">
                    <ReportVerificationQueue />
                  </GlassPanel>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
