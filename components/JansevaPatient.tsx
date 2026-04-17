"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Eye, EyeOff, Lock, Mail, Calendar, User, Heart, Activity, 
  FileText, Users, Search, Plus, CreditCard, Smartphone, 
  Wallet, ArrowLeftRight, X, ChevronRight, Beaker, Clock,
  Stethoscope, Pill, AlertCircle, CheckCircle, Moon, Sun,
  LogOut, Bell, Menu, ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================
// TYPES & INTERFACES
// ============================================
interface Test {
  id: string
  name: string
  price: number
  category: string
  description: string
}

interface FamilyMember {
  id: string
  name: string
  relation: string
  dob: string
}

interface MedicalHistory {
  allergies: string
  medications: string
  surgeries: string
  chronicConditions: string
  familyHistory: string
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
const calculateAge = (dob: string): number => {
  if (!dob) return 0
  const birthYear = new Date(dob).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear
}

// ============================================
// THEME CONTEXT (Inline for single file)
// ============================================
const useTheme = () => {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("janseva-theme")
      const darkMode = saved === "dark"
      setIsDark(darkMode)
      document.documentElement.classList.toggle("dark", darkMode)
    }
  }, [])

  const toggle = () => {
    const newValue = !isDark
    setIsDark(newValue)
    if (typeof window !== "undefined") {
      localStorage.setItem("janseva-theme", newValue ? "dark" : "light")
      document.documentElement.classList.toggle("dark", newValue)
    }
  }

  return { isDark, toggle, mounted }
}

// ============================================
// ADAPTIVE UI HOOK (Watching DOB input)
// ============================================
const useAdaptiveUI = (dob: string) => {
  const age = useMemo(() => calculateAge(dob), [dob])
  const isElderly = age > 50

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isElderly) {
        document.documentElement.classList.add("high-contrast-mode")
      } else {
        document.documentElement.classList.remove("high-contrast-mode")
      }
    }
  }, [isElderly])

  return { age, isElderly }
}

// ============================================
// JANSEVA LOGO COMPONENT (Exact Match)
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
    primary: "bg-[#00A651]/20 border-[#00A651]/50 text-[#00A651] hover:bg-[#00A651]/30",
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
  variant?: "default" | "card" | "input"
}) => {
  const variants = {
    default: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl",
    card: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:border-[#00A651]/30 transition-all",
    input: "bg-white/5 backdrop-blur-md border border-white/20 focus:border-[#0066FF]"
  }

  return (
    <div className={cn(variants[variant], "rounded-2xl", className)}>
      {children}
    </div>
  )
}

// ============================================
// GOOGLE LOGIN CARD
// ============================================
const GoogleLoginCard = ({ onLogin }: { onLogin: (data: any) => void }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  
  const { isElderly } = useAdaptiveUI(dob)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      onLogin({ email, password, dob })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <GlassPanel variant="default" className="p-8 relative overflow-hidden">
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#00A651]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#F37021]/20 to-transparent" />
        
        {/* Janseva Icon instead of Google */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-[#00A651]/20 to-[#00A651]/5 border-2 border-[#00A651]/30">
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#00A651]">
              <path d="M30 15 L45 15 L45 65 Q45 75 35 75 L25 75 Q20 75 20 70 L20 65 L30 65 L30 60 Q30 55 35 55 L35 15" fill="currentColor" />
              <circle cx="37.5" cy="10" r="5" fill="#F37021" />
              <path d="M50 50 Q65 50 70 65 Q75 80 60 85 Q45 90 40 75" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h2 className={cn("text-center font-semibold mb-2", isElderly ? "text-3xl" : "text-2xl")}>
          Sign in
        </h2>
        <p className="text-center text-muted-foreground mb-6 text-sm">
          to continue to Janseva Labs
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone"
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20",
                "focus:border-[#0066FF] focus:outline-none transition-all",
                "placeholder:text-muted-foreground",
                isElderly && "text-xl py-4"
              )}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20",
                "focus:border-[#0066FF] focus:outline-none transition-all",
                "placeholder:text-muted-foreground pr-12",
                isElderly && "text-xl py-4"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div>
            <label className={cn("text-sm text-muted-foreground mb-1 block", isElderly && "text-lg")}>
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20",
                "focus:border-[#0066FF] focus:outline-none transition-all",
                isElderly && "text-xl py-4 border-[#0066FF] border-2"
              )}
            />
            {isElderly && (
              <p className="text-xs text-[#0066FF] mt-1">
                High-contrast mode activated (Age: {calculateAge(dob)})
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-white/20" />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-[#00A651] hover:underline">
              Forgot password?
            </button>
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
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              "Sign in"
            )}
          </GlassButton>

          <button
            type="button"
            onClick={() => setShowPayment(!showPayment)}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {showPayment ? "Hide" : "Show"} Payment Methods
          </button>
        </form>

        {/* Payment Methods Section */}
        <AnimatePresence>
          {showPayment && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/10 mt-4">
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Payment Methods
                </h3>
                
                {/* UPI */}
                <div className="mb-3 p-3 rounded-lg glass">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-[#00A651]" />
                    <span className="text-sm font-medium">UPI</span>
                  </div>
                  <input
                    type="text"
                    value=""
                    onChange={() => {}}
                    placeholder="Enter VPA (e.g., name@upi)"
                    className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground"
                  />
                </div>

                {/* Cards */}
                <div className="mb-3 p-3 rounded-lg glass">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-[#F37021]" />
                    <span className="text-sm font-medium">Credit/Debit Card</span>
                  </div>
                  <input
                    type="text"
                    value=""
                    onChange={() => {}}
                    placeholder="Card Number"
                    className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground mb-2"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value=""
                      onChange={() => {}}
                      placeholder="MM/YY"
                      className="flex-1 px-3 py-2 rounded bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground"
                    />
                    <input
                      type="text"
                      value=""
                      onChange={() => {}}
                      placeholder="CVV"
                      className="w-20 px-3 py-2 rounded bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Apple Pay */}
                <div className="p-3 rounded-lg glass">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-black rounded flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold"></span>
                    </div>
                    <span className="text-sm font-medium">Apple Pay</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassPanel>
    </motion.div>
  )
}

// ============================================
// MEDICAL BENTO INTAKE FORM
// ============================================
const MedicalBentoForm = () => {
  const [formData, setFormData] = useState<MedicalHistory>({
    allergies: "",
    medications: "",
    surgeries: "",
    chronicConditions: "",
    familyHistory: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Medical history:", formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const fields = [
    { key: "allergies", label: "Allergies", icon: AlertCircle, placeholder: "List any drug allergies..." },
    { key: "medications", label: "Current Medications", icon: Pill, placeholder: "List current medications..." },
    { key: "surgeries", label: "Past Surgeries", icon: Stethoscope, placeholder: "List past surgeries with dates..." },
    { key: "chronicConditions", label: "Chronic Conditions", icon: Activity, placeholder: "Diabetes, hypertension, etc..." },
    { key: "familyHistory", label: "Family Medical History", icon: Users, placeholder: "Family history of diseases..." }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        {fields.map((field, index) => {
          const Icon = field.icon
          const key = field.key as keyof MedicalHistory
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl glass"
            >
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Icon className="w-4 h-4 text-[#00A651]" />
                {field.label}
              </label>
              <textarea
                value={formData[key]}
                onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={field.placeholder}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-[#0066FF] focus:outline-none resize-none placeholder:text-muted-foreground/50"
              />
            </motion.div>
          )
        })}
      </div>

      <GlassButton type="submit" variant="primary" className="w-full">
        {isSubmitted ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Saved Successfully
          </>
        ) : (
          "Save Medical History"
        )}
      </GlassButton>
    </form>
  )
}

// ============================================
// SMART BOOKING WITH REQUEST TEST MODAL
// ============================================
const SmartBooking = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestedTest, setRequestedTest] = useState("")
  const [requestReason, setRequestReason] = useState("")

  const testCatalog: Test[] = [
    { id: "1", name: "Complete Blood Count (CBC)", price: 350, category: "blood", description: "Comprehensive blood analysis" },
    { id: "2", name: "Thyroid Function Test", price: 800, category: "hormone", description: "T3, T4, TSH levels" },
    { id: "3", name: "Lipid Profile", price: 600, category: "blood", description: "Cholesterol & triglycerides" },
    { id: "4", name: "Liver Function Test", price: 900, category: "blood", description: "Liver enzyme analysis" },
    { id: "5", name: "Blood Sugar (Fasting)", price: 150, category: "blood", description: "Glucose level check" },
    { id: "6", name: "HbA1c", price: 500, category: "blood", description: "3-month glucose average" },
    { id: "7", name: "Vitamin D", price: 1200, category: "vitamin", description: "25-hydroxy vitamin D" },
    { id: "8", name: "Vitamin B12", price: 800, category: "vitamin", description: "Cobalamin levels" },
    { id: "9", name: "Iron Studies", price: 700, category: "blood", description: "Ferritin, TIBC, iron" },
    { id: "10", name: "Kidney Function Test", price: 850, category: "blood", description: "Creatinine, BUN, eGFR" }
  ]

  const filteredTests = useMemo(() => {
    return testCatalog.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || test.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value && filteredTests.length === 0 && value.length > 2) {
      setShowRequestModal(true)
      setRequestedTest(value)
    }
  }

  const handleRequestSubmit = () => {
    console.log("Test requested:", { name: requestedTest, reason: requestReason })
    setShowRequestModal(false)
    setRequestReason("")
    setSearchQuery("")
    alert("Test request submitted to admin!")
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tests..."
          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/20 focus:border-[#00A651] focus:outline-none text-lg"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {["all", "blood", "hormone", "vitamin"].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedCategory === cat
                ? "bg-[#00A651] text-white"
                : "glass hover:bg-white/10"
            )}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Test Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredTests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-xl glass hover:border-[#00A651]/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium mb-1">{test.name}</h3>
                <p className="text-sm text-muted-foreground">{test.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#00A651]">₹{test.price}</p>
                <GlassButton variant="primary" className="mt-2 text-sm py-2 px-4">
                  Book
                </GlassButton>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredTests.length === 0 && searchQuery && (
          <div className="col-span-2 p-8 text-center glass rounded-xl">
            <p className="text-muted-foreground mb-4">No tests found matching &quot;{searchQuery}&quot;</p>
            <GlassButton variant="secondary" onClick={() => setShowRequestModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Request This Test
            </GlassButton>
          </div>
        )}
      </div>

      {/* Request Test Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-6 rounded-2xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Request New Test</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Test Name</label>
                  <input
                    type="text"
                    value={requestedTest}
                    onChange={(e) => setRequestedTest(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Reason for Request</label>
                  <textarea
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    placeholder="Why do you need this test?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 resize-none placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="flex gap-3">
                  <GlassButton variant="ghost" onClick={() => setShowRequestModal(false)} className="flex-1">
                    Cancel
                  </GlassButton>
                  <GlassButton variant="primary" onClick={handleRequestSubmit} className="flex-1">
                    Submit Request
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// FAMILY SYNC / CAREGIVER MODE
// ============================================
const FamilySync = () => {
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMember, setNewMember] = useState({ name: "", relation: "", dob: "" })
  const [activeProfile, setActiveProfile] = useState<string>("self")

  const handleAddMember = () => {
    if (newMember.name && newMember.relation) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        ...newMember
      }
      setMembers(prev => [...prev, member])
      setNewMember({ name: "", relation: "", dob: "" })
      setShowAddForm(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Profile Display */}
      <div className="p-4 rounded-xl glass">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#00A651]/20 flex items-center justify-center">
              <User className="w-6 h-6 text-[#00A651]" />
            </div>
            <div>
              <p className="font-medium">Current Profile</p>
              <p className="text-sm text-muted-foreground">
                {activeProfile === "self" ? "Myself" : members.find(m => m.id === activeProfile)?.name}
              </p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/10">
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Family Members List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Family Members</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-sm text-[#00A651] hover:underline"
          >
            {showAddForm ? "Cancel" : "Add Member"}
          </button>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl glass space-y-3">
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20"
                />
                <input
                  type="text"
                  value={newMember.relation}
                  onChange={(e) => setNewMember(prev => ({ ...prev, relation: e.target.value }))}
                  placeholder="Relation (e.g., Father, Mother)"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20"
                />
                <input
                  type="date"
                  value={newMember.dob}
                  onChange={(e) => setNewMember(prev => ({ ...prev, dob: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20"
                />
                <GlassButton variant="primary" onClick={handleAddMember} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Family Member
                </GlassButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {members.length === 0 ? (
          <div className="p-8 text-center glass rounded-xl">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No family members added yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add members to manage their health records</p>
          </div>
        ) : (
          members.map(member => (
            <div
              key={member.id}
              onClick={() => setActiveProfile(member.id)}
              className={cn(
                "p-3 rounded-lg glass cursor-pointer transition-all",
                activeProfile === member.id && "border-[#00A651]/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.relation}</p>
                  </div>
                </div>
                {activeProfile === member.id && (
                  <CheckCircle className="w-5 h-5 text-[#00A651]" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ============================================
// MAIN PATIENT COMPONENT
// ============================================
export default function JansevaPatient() {
  const [view, setView] = useState<"login" | "dashboard">("login")
  const [activeTab, setActiveTab] = useState("overview")
  const [userDob, setUserDob] = useState("")
  const { isDark, toggle } = useTheme()
  const { isElderly } = useAdaptiveUI(userDob)

  const handleLogin = (data: { email: string; password: string; dob: string }) => {
    setUserDob(data.dob)
    setView("dashboard")
  }

  const handleLogout = () => {
    setView("login")
    setUserDob("")
    setActiveTab("overview")
  }

  // Login View
  if (view === "login") {
    return (
      <div className={cn(
        "min-h-screen relative overflow-hidden transition-colors duration-500",
        isDark ? "dark bg-[#0A0A0B]" : "bg-gradient-to-br from-[#e8f5e9] via-[#f5f5f5] to-[#fff3e0]"
      )}>
        {/* Background Pattern - Darkened for light mode */}
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-[#00A651]/30" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-[#00A651]/30 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[#F37021]/30 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-[#00A651]/30 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-[#F37021]/30 rounded-br-3xl" />

        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <JansevaLogo size="md" className="z-50 drop-shadow-lg" />
              <button
                onClick={toggle}
                className="p-2 rounded-lg glass hover:bg-white/20 transition-all"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-6 py-12">
            <GoogleLoginCard onLogin={handleLogin} />
          </main>
        </div>
      </div>
    )
  }

  // Dashboard View
  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      isDark ? "dark bg-[#0A0A0B]" : "bg-gradient-to-br from-[#f0fdf4] to-[#fef3e8]"
    )}>
      {/* Floating Apple Toolbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="glass px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
          <JansevaLogo size="sm" />
          
          <nav className="flex items-center gap-1">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "booking", label: "Book Test", icon: Calendar },
              { id: "history", label: "History", icon: FileText },
              { id: "family", label: "Family", icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  activeTab === tab.id
                    ? "bg-[#00A651] text-white"
                    : "hover:bg-white/10"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 border-l border-white/20 pl-4">
            <button className="p-2 rounded-full hover:bg-white/10 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFD60A] rounded-full" />
            </button>
            <button
              onClick={toggle}
              className="p-2 rounded-full hover:bg-white/10"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
            <h1 className={cn("font-bold", isElderly ? "text-4xl" : "text-3xl")}>
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your health records and book tests
            </p>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-3 gap-6"
              >
                <GlassPanel variant="card" className="p-6">
                  <Activity className="w-8 h-8 text-[#00A651] mb-4" />
                  <p className="text-sm text-muted-foreground">Total Tests</p>
                  <p className="text-3xl font-bold">0</p>
                </GlassPanel>
                <GlassPanel variant="card" className="p-6">
                  <Clock className="w-8 h-8 text-[#F37021] mb-4" />
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-3xl font-bold">0</p>
                </GlassPanel>
                <GlassPanel variant="card" className="p-6">
                  <FileText className="w-8 h-8 text-[#0066FF] mb-4" />
                  <p className="text-sm text-muted-foreground">Reports</p>
                  <p className="text-3xl font-bold">0</p>
                </GlassPanel>
              </motion.div>
            )}

            {activeTab === "booking" && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassPanel variant="card" className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Book a Test</h2>
                  <SmartBooking />
                </GlassPanel>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassPanel variant="card" className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Medical History</h2>
                  <MedicalBentoForm />
                </GlassPanel>
              </motion.div>
            )}

            {activeTab === "family" && (
              <motion.div
                key="family"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassPanel variant="card" className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Family Members</h2>
                  <FamilySync />
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
