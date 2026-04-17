"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Clock, 
  MapPin, 
  Activity,
  Search,
  Filter,
  LogIn,
  LogOut,
  Coffee,
  Briefcase
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StaffMonitorProps {
  className?: string
}

interface StaffMember {
  id: string
  name: string
  role: string
  department: string
  status: "active" | "break" | "offline"
  punchIn?: string
  punchOut?: string
  location: string
  currentTask?: string
}

const sampleStaff: StaffMember[] = [
  {
    id: "EMP001",
    name: "Dr. Priya Sharma",
    role: "Senior Pathologist",
    department: "Pathology",
    status: "active",
    punchIn: "08:30 AM",
    location: "Lab Block A",
    currentTask: "Analyzing blood samples",
  },
  {
    id: "EMP002",
    name: "Rahul Verma",
    role: "Lab Technician",
    department: "Pathology",
    status: "active",
    punchIn: "08:00 AM",
    location: "Sample Collection",
    currentTask: "Processing CBC requests",
  },
  {
    id: "EMP003",
    name: "Anita Patel",
    role: "Pharmacist",
    department: "Pharmacy",
    status: "break",
    punchIn: "09:00 AM",
    location: "Cafeteria",
    currentTask: "On break",
  },
  {
    id: "EMP004",
    name: "Dr. Amit Kumar",
    role: "Radiologist",
    department: "Radiology",
    status: "active",
    punchIn: "08:15 AM",
    location: "Imaging Center",
    currentTask: "Reviewing CT scans",
  },
  {
    id: "EMP005",
    name: "Sunita Devi",
    role: "Nurse",
    department: "Patient Care",
    status: "offline",
    punchIn: "07:00 AM",
    punchOut: "03:00 PM",
    location: "—",
    currentTask: "Shift ended",
  },
  {
    id: "EMP006",
    name: "Vikram Singh",
    role: "Lab Technician",
    department: "Pathology",
    status: "active",
    punchIn: "08:45 AM",
    location: "Lab Block B",
    currentTask: "Preparing slides",
  },
]

const departments = ["All", "Pathology", "Radiology", "Pharmacy", "Patient Care", "Administration"]

export function StaffMonitor({ className }: StaffMonitorProps) {
  const [staff, setStaff] = useState<StaffMember[]>(sampleStaff)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDept, setSelectedDept] = useState("All")
  const [activeTab, setActiveTab] = useState("all")

  const filteredStaff = staff.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = selectedDept === "All" || member.department === selectedDept
    const matchesTab = activeTab === "all" || member.status === activeTab
    return matchesSearch && matchesDept && matchesTab
  })

  const getStatusBadge = (status: StaffMember["status"]) => {
    const styles = {
      active: "bg-janseva-green/20 text-janseva-green border-janseva-green/30",
      break: "bg-amber-vivid/20 text-amber-vivid border-amber-vivid/30",
      offline: "bg-muted text-muted-foreground border-muted",
    }

    const icons = {
      active: Activity,
      break: Coffee,
      offline: LogOut,
    }

    const labels = {
      active: "Active",
      break: "On Break",
      offline: "Offline",
    }

    const Icon = icons[status]

    return (
      <span className={cn("flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border", styles[status])}>
        <Icon className="w-3 h-3" />
        {labels[status]}
      </span>
    )
  }

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === "active").length,
    onBreak: staff.filter(s => s.status === "break").length,
    offline: staff.filter(s => s.status === "offline").length,
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Staff Monitor</h2>
          <p className="text-sm text-muted-foreground">
            Real-time staff tracking and activity monitoring
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-lg glass text-center">
            <span className="text-xs text-muted-foreground">Total</span>
            <p className="text-lg font-bold">{stats.total}</p>
          </div>
          <div className="px-4 py-2 rounded-lg glass text-center">
            <span className="text-xs text-muted-foreground">Active</span>
            <p className="text-lg font-bold text-janseva-green">{stats.active}</p>
          </div>
          <div className="px-4 py-2 rounded-lg glass text-center">
            <span className="text-xs text-muted-foreground">On Break</span>
            <p className="text-lg font-bold text-amber-vivid">{stats.onBreak}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search staff by name, ID, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all haptic-glow",
                selectedDept === dept
                  ? "bg-janseva-green text-white"
                  : "glass-button"
              )}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass mb-6">
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-janseva-green data-[state=active]:text-white">
            Active
          </TabsTrigger>
          <TabsTrigger value="break" className="data-[state=active]:bg-amber-vivid data-[state=active]:text-white">
            On Break
          </TabsTrigger>
          <TabsTrigger value="offline" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
            Offline
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4">
            {filteredStaff.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 glass haptic-glow hover:border-janseva-green/30 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-xl",
                        member.status === "active" ? "bg-janseva-green/10" :
                        member.status === "break" ? "bg-amber-vivid/10" :
                        "bg-muted"
                      )}>
                        <Users className={cn(
                          "w-6 h-6",
                          member.status === "active" ? "text-janseva-green" :
                          member.status === "break" ? "text-amber-vivid" :
                          "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-semibold">{member.name}</h3>
                          {getStatusBadge(member.status)}
                          <span className="text-xs text-muted-foreground">{member.id}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {member.role} • {member.department}
                        </p>
                        <div className="flex items-center gap-4 text-sm flex-wrap">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {member.location}
                          </span>
                          {member.currentTask && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Briefcase className="w-4 h-4" />
                              {member.currentTask}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Punch Times */}
                    <div className="flex items-center gap-6 lg:border-l lg:border-white/10 lg:pl-6">
                      {member.punchIn && (
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                            <LogIn className="w-3 h-3" />
                            Punch In
                          </div>
                          <p className="font-medium">{member.punchIn}</p>
                        </div>
                      )}
                      {member.punchOut && (
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                            <LogOut className="w-3 h-3" />
                            Punch Out
                          </div>
                          <p className="font-medium">{member.punchOut}</p>
                        </div>
                      )}
                      {!member.punchOut && member.punchIn && (
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                            <Clock className="w-3 h-3" />
                            Duration
                          </div>
                          <p className="font-medium text-janseva-green">
                            {(() => {
                              const [hours, minutes] = member.punchIn.split(":")
                              const start = new Date()
                              start.setHours(parseInt(hours), parseInt(minutes), 0)
                              const now = new Date()
                              const diff = Math.floor((now.getTime() - start.getTime()) / 60000)
                              const h = Math.floor(diff / 60)
                              const m = diff % 60
                              return `${h}h ${m}m`
                            })()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredStaff.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No staff found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
