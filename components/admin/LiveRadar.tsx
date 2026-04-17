"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Activity, 
  Clock, 
  User, 
  Beaker,
  MoreHorizontal,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LiveRadarProps {
  className?: string
}

interface LiveTest {
  id: string
  patientName: string
  patientId: string
  testName: string
  status: "registered" | "sample_collected" | "processing" | "completed" | "verified"
  stage: number
  timestamp: string
  technician: string
  location: string
  priority: "normal" | "urgent" | "emergency"
}

const sampleLiveTests: LiveTest[] = [
  {
    id: "T001",
    patientName: "Rajesh Kumar",
    patientId: "PT001",
    testName: "CBC",
    status: "processing",
    stage: 3,
    timestamp: "10:30 AM",
    technician: "Dr. Sharma",
    location: "Lab Block A",
    priority: "normal",
  },
  {
    id: "T002",
    patientName: "Sunita Devi",
    patientId: "PT002",
    testName: "Thyroid Panel",
    status: "sample_collected",
    stage: 2,
    timestamp: "10:35 AM",
    technician: "Rahul V.",
    location: "Collection Center",
    priority: "urgent",
  },
  {
    id: "T003",
    patientName: "Amit Singh",
    patientId: "PT003",
    testName: "Blood Sugar",
    status: "completed",
    stage: 4,
    timestamp: "10:15 AM",
    technician: "Dr. Sharma",
    location: "Lab Block A",
    priority: "normal",
  },
  {
    id: "T004",
    patientName: "Priya Patel",
    patientId: "PT004",
    testName: "Lipid Profile",
    status: "registered",
    stage: 1,
    timestamp: "10:40 AM",
    technician: "—",
    location: "Reception",
    priority: "emergency",
  },
  {
    id: "T005",
    patientName: "Vikram Rao",
    patientId: "PT005",
    testName: "Liver Function",
    status: "verified",
    stage: 5,
    timestamp: "09:45 AM",
    technician: "Dr. Patel",
    location: "Reporting",
    priority: "normal",
  },
]

const stages = [
  { id: 1, name: "Registered", icon: User },
  { id: 2, name: "Sample Collected", icon: Beaker },
  { id: 3, name: "Processing", icon: Activity },
  { id: 4, name: "Completed", icon: Clock },
  { id: 5, name: "Verified", icon: Activity },
]

export function LiveRadar({ className }: LiveRadarProps) {
  const [tests, setTests] = useState<LiveTest[]>(sampleLiveTests)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTests((prev) => prev.map((test) => {
        // Randomly progress some tests
        if (Math.random() > 0.7 && test.stage < 5) {
          return {
            ...test,
            stage: test.stage + 1,
            status: stages[test.stage].name.toLowerCase().replace(" ", "_") as LiveTest["status"],
          }
        }
        return test
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredTests = tests.filter((test) => {
    const matchesSearch = 
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || test.priority === activeTab
    return matchesSearch && matchesTab
  })

  const getPriorityBadge = (priority: LiveTest["priority"]) => {
    const styles = {
      normal: "bg-janseva-green/20 text-janseva-green border-janseva-green/30",
      urgent: "bg-amber-vivid/20 text-amber-vivid border-amber-vivid/30",
      emergency: "bg-rose-500/20 text-rose-500 border-rose-500/30 animate-pulse",
    }

    return (
      <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", styles[priority])}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    )
  }

  const stats = {
    total: tests.length,
    processing: tests.filter(t => t.status === "processing").length,
    urgent: tests.filter(t => t.priority === "urgent" || t.priority === "emergency").length,
    completed: tests.filter(t => t.status === "verified").length,
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">Live Radar</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-janseva-green/20 border border-janseva-green/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-janseva-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-janseva-green"></span>
              </span>
              <span className="text-xs font-medium text-janseva-green">LIVE</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Real-time test tracking across all departments • {currentTime.toLocaleTimeString()}
          </p>
        </div>
        
        {/* Stats */}
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-lg glass text-center">
            <span className="text-xs text-muted-foreground">Active</span>
            <p className="text-lg font-bold text-janseva-green">{stats.processing}</p>
          </div>
          <div className="px-4 py-2 rounded-lg glass text-center">
            <span className="text-xs text-muted-foreground">Urgent</span>
            <p className="text-lg font-bold text-amber-vivid">{stats.urgent}</p>
          </div>
          <div className="px-4 py-2 rounded-lg glass text-center">
            <span className="text-xs text-muted-foreground">Completed</span>
            <p className="text-lg font-bold">{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <Card className="p-6 glass mb-6">
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Test Pipeline</h3>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
          
          <div className="relative grid grid-cols-5 gap-2">
            {stages.map((stage, index) => {
              const count = tests.filter(t => t.stage === stage.id).length
              const Icon = stage.icon
              
              return (
                <motion.div
                  key={stage.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={cn(
                    "relative w-12 h-12 rounded-full flex items-center justify-center border-2 z-10",
                    count > 0 
                      ? "bg-janseva-green/20 border-janseva-green" 
                      : "bg-white/5 border-white/10"
                  )}>
                    <Icon className={cn("w-5 h-5", count > 0 ? "text-janseva-green" : "text-muted-foreground")} />
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-janseva-green text-white text-xs flex items-center justify-center font-bold">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="mt-2 text-xs text-muted-foreground text-center">
                    {stage.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass mb-6">
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="normal" className="data-[state=active]:bg-janseva-green data-[state=active]:text-white">
            Normal
          </TabsTrigger>
          <TabsTrigger value="urgent" className="data-[state=active]:bg-amber-vivid data-[state=active]:text-white">
            Urgent
          </TabsTrigger>
          <TabsTrigger value="emergency" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
            Emergency
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4">
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 glass haptic-glow hover:border-janseva-green/30 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-xl",
                        test.priority === "emergency" ? "bg-rose-500/10" :
                        test.priority === "urgent" ? "bg-amber-vivid/10" :
                        "bg-janseva-green/10"
                      )}>
                        <Beaker className={cn(
                          "w-6 h-6",
                          test.priority === "emergency" ? "text-rose-500" :
                          test.priority === "urgent" ? "text-amber-vivid" :
                          "text-janseva-green"
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-semibold">{test.testName}</h3>
                          {getPriorityBadge(test.priority)}
                          <span className="text-xs text-muted-foreground">{test.id}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {test.patientName} ({test.patientId})
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="w-4 h-4" />
                            {test.technician}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {test.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {stages.map((stage) => (
                          <div
                            key={stage.id}
                            className={cn(
                              "w-2 h-2 rounded-full",
                              test.stage >= stage.id
                                ? "bg-janseva-green"
                                : "bg-white/10"
                            )}
                          />
                        ))}
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        test.status === "verified" ? "bg-janseva-green/20 text-janseva-green" :
                        test.status === "completed" ? "bg-electric-blue/20 text-electric-blue" :
                        test.status === "processing" ? "bg-amber-vivid/20 text-amber-vivid" :
                        "bg-white/10 text-muted-foreground"
                      )}>
                        {test.status.replace("_", " ").toUpperCase()}
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredTests.length === 0 && (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active tests</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
