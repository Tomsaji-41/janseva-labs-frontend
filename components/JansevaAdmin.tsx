"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Eye, EyeOff, Lock, Mail, Users, Activity, FileText, 
  Clock, CheckCircle, X, Moon, Sun, LogOut, Bell, 
  Search, Filter, ChevronDown, Wifi, WifiOff, RefreshCw,
  TrendingUp, AlertTriangle, UserPlus, Building2, Shield,
  Stethoscope, MoreHorizontal, Download, Edit3, ChevronRight,
  Menu, Zap, Calendar, ArrowUpDown
} from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================
// TYPES & INTERFACES
// ============================================
type UserRole = "pharmacist" | "hod" | "developer"

interface StaffMember {
  id: string
  name: string
  category: "Dev" | "Pharm"
  punchIn: string
  punchOut: string
  status: "active" | "break" | "offline"
}

interface TestItem {
  id: string
  patientName: string
  testName: string
  status: "pending" | "processing" | "completed"
  timestamp: string
}

interface ReportItem {
  id: string
  patientId: string
  testType: string
  receivedDate: string
  status: "pending" | "signed"
}

// ============================================
// THEME HOOK
// ============================================
const useTheme = () => {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("janseva-admin-theme")
      const darkMode = saved === "dark"
      setIsDark(darkMode)
      document.documentElement.classList.toggle("dark", darkMode)
    }
  }, [])

  const toggle = () => {
    const newValue = !isDark
    setIsDark(newValue)
    if (typeof window !== "undefined") {
      localStorage.setItem("janseva-admin-theme", newValue ? "dark" : "light")
      document.documentElement.classList.toggle("dark", newValue)
    }
  }

  return { isDark, toggle, mounted }
}

// ============================================
// OFFLINE MODE HOOK
// ============================================
const useOfflineMode = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [queue, setQueue] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const handleOnline = () => setIsOnline(true)
      const handleOffline = () => setIsOnline(false)

      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)
      setIsOnline(navigator.onLine)

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  const addToQueue = (item: string) => {
    setQueue(prev => [...prev, item])
  }

  const sync = async () => {
    if (!isOnline || queue.length === 0) return
    setIsSyncing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setQueue([])
    setIsSyncing(false)
  }

  return { isOnline, isSyncing, queue, addToQueue, sync, mounted }
}

// ============================================
// JANSEVA LOGO (Exact Match)
// ============================================
const JansevaLogo = ({ size = "md", className }: { size?: "sm" | "md" | "lg" | "xl"; className?: string }) => {
  const sizes = {
    sm: { container: "h-8", icon: "w-6 h-6", text: "text-lg" },
    md: { container: "h-10", icon: "w-8 h-8", text: "text-xl" },
    lg: { container: "h-14", icon: "w-12 h-12", text: "text-2xl" },
    xl: { container: "h-20", icon: "w-16 h-16", text: "text-4xl" }
  }
  
  const sizeClasses = sizes[size]
  
  return (
    <div className={cn("flex items-center gap-2 z-50 drop-shadow-lg", sizeClasses.container, className)}>
      {/* Logo Icon with z-index and drop-shadow */}
      <svg
        viewBox="0 0 100 100"
        className={cn(sizeClasses.icon, "text-[#00A651] z-50 drop-shadow-lg")}
        fill="currentColor"
      >
        {/* J letter shape */}
        <path
          d="M30 15 L45 15 L45 65 Q45 75 35 75 L25 75 Q20 75 20 70 L20 65 L30 65 L30 60 Q30 55 35 55 L35 15"
          fill="#00A651"
        />
        {/* Dot above J */}
        <circle cx="37.5" cy="10" r="5" fill="#F37021" />
        {/* Stylized stethoscope curve */}
        <path
          d="M50 50 Q65 50 70 65 Q75 80 60 85 Q45 90 40 75"
          stroke="#00A651"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Logo Text */}
      <div className="flex flex-col z-50">
        <span className={cn("font-bold leading-none tracking-tight drop-shadow-md", sizeClasses.text)}>
          <span className="text-[#00A651]">Janseva</span>
          <span className="text-[#F37021] ml-1">Labs</span>
        </span>
        <span className="text-xs text-muted-foreground/80 tracking-widest uppercase">
          Diagnostic Excellence
        </span>
      </div>
    </div>
  )
}

// ============================================
// GLASS BUTTON (with Haptic Pulse)
// ============================================
const GlassButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className, 
  type = "button",
  disabled = false
}: { 
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger" | "ghost"
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
}) => {
  const variants = {
    primary: "bg-[#FFD60A]/20 border-[#FFD60A]/50 text-[#FFD60A] hover:bg-[#FFD60A]/30",
    secondary: "bg-white/10 border-white/20 hover:bg-white/20",
    danger: "bg-rose-500/20 border-rose-500/50 text-rose-500 hover:bg-rose-500/30",
    ghost: "bg-transparent border-transparent hover:bg-white/10"
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-6 py-3 rounded-xl font-medium border backdrop-blur-md transition-all",
        "flex items-center justify-center gap-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  )
}

// ============================================
// GLASS PANEL
// ============================================
const GlassPanel = ({ 
  children, 
  className,
  variant = "default"
}: { 
  children: React.ReactNode
  className?: string
  variant?: "default" | "card" | "input" | "obsidian"
}) => {
  const variants = {
    default: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl",
    card: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:border-[#FFD60A]/30 transition-all",
    input: "bg-white/5 backdrop-blur-md border border-white/20 focus:border-[#FFD60A]",
    obsidian: "bg-[#0A0A0B]/80 backdrop-blur-xl border border-[#FFD60A]/20 shadow-2xl"
  }

  return (
    <div className={cn(variants[variant], "rounded-2xl", className)}>
      {children}
    </div>
  )
}

// ============================================
// UNIFIED LOGIN CARD WITH ROLE SELECTOR
// ============================================
const AdminLoginCard = ({ onLogin }: { onLogin: (role: UserRole) => void }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("pharmacist")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)

  const roles: { value: UserRole; label: string; icon: typeof Shield }[] = [
    { value: "pharmacist", label: "Pharmacist (Admin)", icon: Stethoscope },
    { value: "hod", label: "HOD (SuperAdmin)", icon: Building2 },
    { value: "developer", label: "Developer", icon: Shield }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      onLogin(role)
      setIsLoading(false)
    }, 1500)
  }

  const selectedRole = roles.find(r => r.value === role)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <GlassPanel variant="obsidian" className="p-8 relative overflow-hidden">
        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FFD60A]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#00A651]/20 to-transparent" />
        
        {/* Janseva Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-[#FFD60A]/20 to-[#FFD60A]/5 border-2 border-[#FFD60A]/30">
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#FFD60A]">
              <path d="M30 15 L45 15 L45 65 Q45 75 35 75 L25 75 Q20 75 20 70 L20 65 L30 65 L30 60 Q30 55 35 55 L35 15" fill="currentColor" />
              <circle cx="37.5" cy="10" r="5" fill="#00A651" />
              <path d="M50 50 Q65 50 70 65 Q75 80 60 85 Q45 90 40 75" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Janseva Logo */}
        <div className="flex justify-center mb-4">
          <JansevaLogo size="md" />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-2 text-white">
          Admin Sign in
        </h2>
        <p className="text-center text-white/60 mb-6 text-sm">
          Access the Janseva Labs Command Center
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD60A] focus:outline-none transition-all"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD60A] focus:outline-none transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Role Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white flex items-center justify-between hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                {selectedRole && <selectedRole.icon className="w-5 h-5 text-[#FFD60A]" />}
                <span>{selectedRole?.label || "Select Role"}</span>
              </div>
              <ChevronDown className={cn("w-5 h-5 transition-transform", showRoleDropdown && "rotate-180")} />
            </button>

            <AnimatePresence>
              {showRoleDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0B] border border-white/20 rounded-xl overflow-hidden z-50"
                >
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => {
                        setRole(r.value)
                        setShowRoleDropdown(false)
                      }}
                      className={cn(
                        "w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all",
                        role === r.value && "bg-[#FFD60A]/20"
                      )}
                    >
                      <r.icon className="w-5 h-5 text-[#FFD60A]" />
                      <span className="text-white">{r.label}</span>
                      {role === r.value && <CheckCircle className="w-4 h-4 text-[#FFD60A] ml-auto" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <GlassButton 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-[#FFD60A]/30 border-t-[#FFD60A] rounded-full"
              />
            ) : (
              "Sign in"
            )}
          </GlassButton>
        </form>

        <p className="text-center text-white/40 text-xs mt-6">
          All activities are monitored and logged for security
        </p>
      </GlassPanel>
    </motion.div>
  )
}

// ============================================
// HOD VIEW: STAFF TRACKING TABLE
// ============================================
const StaffTrackingTable = () => {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "category" | "status">("name")

  const filteredStaff = useMemo(() => {
    return staff.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "category") return a.category.localeCompare(b.category)
      return a.status.localeCompare(b.status)
    })
  }, [staff, searchQuery, sortBy])

  const getStatusBadge = (status: StaffMember["status"]) => {
    const styles = {
      active: "bg-[#00A651]/20 text-[#00A651] border-[#00A651]/30",
      break: "bg-[#FFD60A]/20 text-[#FFD60A] border-[#FFD60A]/30",
      offline: "bg-white/10 text-white/60 border-white/20"
    }
    return (
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", styles[status])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search staff..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD60A] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {["name", "category", "status"].map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort as any)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium border transition-all",
                sortBy === sort
                  ? "bg-[#FFD60A]/20 border-[#FFD60A]/50 text-[#FFD60A]"
                  : "bg-white/5 border-white/20 text-white/60 hover:bg-white/10"
              )}
            >
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Name</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Category</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Punch In</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Punch Out</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">No staff records found</p>
                  <p className="text-white/30 text-sm mt-1">Staff will appear here when they check in</p>
                </td>
              </tr>
            ) : (
              filteredStaff.map((member) => (
                <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white">{member.name}</td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      member.category === "Dev" ? "bg-blue-500/20 text-blue-400" : "bg-[#00A651]/20 text-[#00A651]"
                    )}>
                      {member.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white/60">{member.punchIn || "—"}</td>
                  <td className="py-3 px-4 text-white/60">{member.punchOut || "—"}</td>
                  <td className="py-3 px-4">{getStatusBadge(member.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================
// HOD VIEW: PREDICTIVE STAFFING (Loading State)
// ============================================
const PredictiveStaffing = () => {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Current Staff", value: "0", icon: Users },
          { label: "Peak Hours", value: "—", icon: Clock },
          { label: "Efficiency", value: "0%", icon: TrendingUp },
          { label: "Shortage Risk", value: "—", icon: AlertTriangle }
        ].map((stat, i) => (
          <GlassPanel key={i} variant="card" className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <stat.icon className="w-5 h-5 text-[#FFD60A]" />
              </div>
              <div>
                <p className="text-xs text-white/40">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Loading State */}
      <GlassPanel variant="card" className="p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-12 h-12 border-4 border-white/10 border-t-[#FFD60A] rounded-full mb-4"
          />
          <h3 className="text-lg font-medium text-white mb-2">Searching for Data...</h3>
          <p className="text-white/40 text-sm">AI is analyzing historical patterns</p>
        </div>
      </GlassPanel>

      {/* Zeroed Chart Placeholder */}
      <GlassPanel variant="card" className="p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#FFD60A]" />
          Patient Volume Forecast
        </h3>
        <div className="h-48 flex items-end justify-between gap-2 px-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-white/5 rounded-t" style={{ height: `${Math.random() * 5}%` }} />
              <span className="text-xs text-white/30">{i + 1}</span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}

// ============================================
// HOD VIEW: PATIENT RADAR (Blank List)
// ============================================
const PatientRadar = () => {
  const [tests, setTests] = useState<TestItem[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "processing" | "completed">("all")

  const filteredTests = useMemo(() => {
    if (filter === "all") return tests
    return tests.filter(t => t.status === filter)
  }, [tests, filter])

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "processing", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              filter === f
                ? "bg-[#FFD60A] text-[#0A0A0B]"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Empty Scrollable List */}
      <div className="h-96 overflow-y-auto space-y-3 pr-2">
        {filteredTests.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <Activity className="w-16 h-16 text-white/10 mb-4" />
            <p className="text-white/40 font-medium">No active tests</p>
            <p className="text-white/30 text-sm mt-1">Live check-in data will appear here</p>
          </div>
        ) : (
          filteredTests.map((test) => (
            <div key={test.id} className="p-4 rounded-xl glass flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{test.testName}</p>
                <p className="text-white/40 text-sm">{test.patientName}</p>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                test.status === "completed" && "bg-[#00A651]/20 text-[#00A651]",
                test.status === "processing" && "bg-[#FFD60A]/20 text-[#FFD60A]",
                test.status === "pending" && "bg-white/10 text-white/60"
              )}>
                {test.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ============================================
// PHARMACIST VIEW: VERIFICATION QUEUE
// ============================================
const VerificationQueue = () => {
  const [reports, setReports] = useState<ReportItem[]>([])
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [signature, setSignature] = useState("")

  const handleSign = (reportId: string) => {
    console.log("Signing report:", reportId, "with signature:", signature)
    setSignature("")
    setSelectedReport(null)
    alert("Report signed successfully!")
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Search reports by ID or type..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-[#FFD60A] focus:outline-none"
        />
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Report ID</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Patient ID</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Test Type</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Received</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Status</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">No reports in verification queue</p>
                  <p className="text-white/30 text-sm mt-1">Reports will appear here when ready for review</p>
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-mono text-sm">{report.id}</td>
                  <td className="py-3 px-4 text-white/60">{report.patientId}</td>
                  <td className="py-3 px-4 text-white">{report.testType}</td>
                  <td className="py-3 px-4 text-white/60">{report.receivedDate}</td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      report.status === "signed"
                        ? "bg-[#00A651]/20 text-[#00A651]"
                        : "bg-[#FFD60A]/20 text-[#FFD60A]"
                    )}>
                      {report.status === "signed" ? "Signed" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {report.status === "pending" && (
                      <button
                        onClick={() => setSelectedReport(report.id)}
                        className="px-3 py-1 rounded-lg bg-[#FFD60A]/20 text-[#FFD60A] text-sm hover:bg-[#FFD60A]/30 transition-all"
                      >
                        Sign
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Signature Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-6 rounded-2xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Digital Signature</h3>
              <p className="text-white/60 text-sm mb-4">
                Report ID: {selectedReport}
              </p>
              <textarea
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Enter your digital signature or PIN..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 resize-none focus:border-[#FFD60A] focus:outline-none mb-4"
              />
              <div className="flex gap-3">
                <GlassButton variant="ghost" onClick={() => setSelectedReport(null)} className="flex-1">
                  Cancel
                </GlassButton>
                <GlassButton 
                  variant="primary" 
                  onClick={() => handleSign(selectedReport)} 
                  className="flex-1"
                  disabled={!signature}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Sign Report
                </GlassButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// MAIN ADMIN COMPONENT
// ============================================
export default function JansevaAdmin() {
  const [view, setView] = useState<"login" | "dashboard">("login")
  const [role, setRole] = useState<UserRole>("pharmacist")
  const [activeTab, setActiveTab] = useState("")
  const { isDark, toggle } = useTheme()
  const { isOnline, isSyncing, queue, sync } = useOfflineMode()

  // Set default tab based on role
  useEffect(() => {
    if (view === "dashboard") {
      setActiveTab(role === "pharmacist" ? "verification" : "staff")
    }
  }, [view, role])

  const handleLogin = (userRole: UserRole) => {
    setRole(userRole)
    setView("dashboard")
  }

  const handleLogout = () => {
    setView("login")
    setRole("pharmacist")
    setActiveTab("")
  }

  // Get tabs based on role
  const getTabs = () => {
    if (role === "pharmacist") {
      return [
        { id: "verification", label: "Verification Queue", icon: FileText },
        { id: "radar", label: "Live Radar", icon: Activity }
      ]
    }
    return [
      { id: "staff", label: "Staff Monitor", icon: Users },
      { id: "staffing", label: "Predictive Staffing", icon: TrendingUp },
      { id: "radar", label: "Patient Radar", icon: Activity },
      { id: "verification", label: "Reports", icon: FileText }
    ]
  }

  const tabs = getTabs()

  // Login View
  if (view === "login") {
    return (
      <div className="min-h-screen bg-[#0A0A0B] relative overflow-hidden">
        {/* Radar Grid Background */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="radar-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFD60A" strokeWidth="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#radar-grid)" />
          </svg>
        </div>
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-[#FFD60A]/30 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[#00A651]/30 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-[#00A651]/30 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-[#FFD60A]/30 rounded-br-3xl" />

        {/* Animated Radar Sweep */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(255, 214, 10, 0.1) 360deg)",
            borderRadius: "50%"
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />

        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <JansevaLogo size="md" className="z-50 drop-shadow-lg" />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-6 py-12">
            <AdminLoginCard onLogin={handleLogin} />
          </main>
        </div>
      </div>
    )
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Floating Apple Toolbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="glass px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl bg-[#0A0A0B]/80 border-[#FFD60A]/20">
          <JansevaLogo size="sm" />
          
          {/* PWA Sync Status */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <motion.div
              animate={isSyncing ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ repeat: isSyncing ? Infinity : 0, duration: 1 }}
              className={cn(
                "w-2 h-2 rounded-full",
                !isOnline ? "bg-rose-500" : isSyncing ? "bg-[#FFD60A]" : queue.length > 0 ? "bg-[#FFD60A]" : "bg-[#00A651]"
              )}
            />
            <span className="text-xs text-white/60">
              {!isOnline ? "Offline" : isSyncing ? "Syncing..." : queue.length > 0 ? `${queue.length} Pending` : "Synced"}
            </span>
            {queue.length > 0 && (
              <button onClick={sync} className="ml-1 hover:text-[#FFD60A] transition-colors">
                <RefreshCw className={cn("w-3 h-3", isSyncing && "animate-spin")} />
              </button>
            )}
          </div>
          
          <nav className="flex items-center gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  activeTab === tab.id
                    ? "bg-[#FFD60A] text-[#0A0A0B]"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 border-l border-white/20 pl-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/30">
              {role === "hod" ? <Building2 className="w-4 h-4 text-[#FFD60A]" /> : <Stethoscope className="w-4 h-4 text-[#FFD60A]" />}
              <span className="text-xs text-[#FFD60A] font-medium uppercase">
                {role === "hod" ? "HOD" : role === "developer" ? "Dev" : "Pharm"}
              </span>
            </div>
            <button className="p-2 rounded-full hover:bg-white/10 relative">
              <Bell className="w-5 h-5 text-white/60" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFD60A] rounded-full" />
            </button>
            <button
              onClick={toggle}
              className="p-2 rounded-full hover:bg-white/10"
            >
              {isDark ? <Sun className="w-5 h-5 text-white/60" /> : <Moon className="w-5 h-5 text-white/60" />}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-rose-500/20 text-rose-500"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3">
              {role === "hod" ? (
                <Building2 className="w-8 h-8 text-[#FFD60A]" />
              ) : (
                <Stethoscope className="w-8 h-8 text-[#00A651]" />
              )}
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {role === "hod" ? "HOD Command Center" : "Pharmacist Dashboard"}
                </h1>
                <p className="text-white/40 mt-1">
                  {role === "hod" 
                    ? "Complete operational oversight and strategic management"
                    : "Report verification and test request management"
                  }
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "staff" && role === "hod" && (
              <motion.div
                key="staff"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassPanel variant="obsidian" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6 text-[#FFD60A]" />
                    Staff Tracking
                  </h2>
                  <StaffTrackingTable />
                </GlassPanel>
              </motion.div>
            )}

            {activeTab === "staffing" && role === "hod" && (
              <motion.div
                key="staffing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassPanel variant="obsidian" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-[#FFD60A]" />
                    Predictive Staffing
                  </h2>
                  <PredictiveStaffing />
                </GlassPanel>
              </motion.div>
            )}

            {activeTab === "radar" && (
              <motion.div
                key="radar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassPanel variant="obsidian" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-[#FFD60A]" />
                    {role === "hod" ? "Patient Radar" : "Live Radar"}
                  </h2>
                  <PatientRadar />
                </GlassPanel>
              </motion.div>
            )}

            {activeTab === "verification" && (
              <motion.div
                key="verification"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassPanel variant="obsidian" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#FFD60A]" />
                    Report Verification Queue
                  </h2>
                  <VerificationQueue />
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
