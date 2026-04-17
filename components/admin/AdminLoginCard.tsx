"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Shield, UserCog, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JansevaLogo } from "@/components/JansevaLogo"

type UserRole = "pharmacist" | "hod"

interface AdminLoginCardProps {
  className?: string
  onLogin?: (data: { email: string; password: string; role: UserRole }) => void
}

export function AdminLoginCard({ className, onLogin }: AdminLoginCardProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("pharmacist")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    onLogin?.({ email, password, role })
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("w-full max-w-md", className)}
    >
      <Card className="glass-card overflow-hidden">
        {/* Header */}
        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-center">
            <JansevaLogo size="lg" />
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-normal text-foreground">
              Admin Sign In
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Access the Janseva Labs Command Center
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-white/5">
            <button
              type="button"
              onClick={() => setRole("pharmacist")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300",
                role === "pharmacist"
                  ? "bg-janseva-green/20 border border-janseva-green"
                  : "hover:bg-white/5"
              )}
            >
              <UserCog className={cn(
                "w-6 h-6",
                role === "pharmacist" ? "text-janseva-green" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm font-medium",
                role === "pharmacist" ? "text-janseva-green" : "text-muted-foreground"
              )}>
                Pharmacist
              </span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </button>
            
            <button
              type="button"
              onClick={() => setRole("hod")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300",
                role === "hod"
                  ? "bg-amber-vivid/20 border border-amber-vivid"
                  : "hover:bg-white/5"
              )}
            >
              <Building2 className={cn(
                "w-6 h-6",
                role === "hod" ? "text-amber-vivid" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm font-medium",
                role === "hod" ? "text-amber-vivid" : "text-muted-foreground"
              )}>
                HOD
              </span>
              <span className="text-xs text-muted-foreground">SuperAdmin</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input
                type="email"
                placeholder="admin@jansevalabs.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
            </div>

            {/* Role Indicator */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
              <Shield className={cn(
                "w-5 h-5",
                role === "pharmacist" ? "text-janseva-green" : "text-amber-vivid"
              )} />
              <span className="text-sm text-muted-foreground">
                Signing in as{" "}
                <span className={cn(
                  "font-medium",
                  role === "pharmacist" ? "text-janseva-green" : "text-amber-vivid"
                )}>
                  {role === "pharmacist" ? "Pharmacist (Admin)" : "HOD (SuperAdmin)"}
                </span>
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-12 text-base font-medium haptic-glow",
                role === "pharmacist"
                  ? "bg-janseva-green hover:bg-janseva-green/90"
                  : "bg-amber-vivid hover:bg-amber-vivid/90"
              )}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                `Sign in as ${role === "pharmacist" ? "Pharmacist" : "HOD"}`
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="p-3 rounded-lg bg-amber-vivid/10 border border-amber-vivid/20">
            <p className="text-xs text-amber-vivid text-center">
              This is a secure admin portal. All activities are logged and monitored.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
