"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, CreditCard, Smartphone, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JansevaLogo } from "@/components/JansevaLogo"

interface GoogleLoginCardProps {
  className?: string
  onLogin?: (data: { email: string; password: string; dob: string }) => void
}

export function GoogleLoginCard({ className, onLogin }: GoogleLoginCardProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    onLogin?.({ email, password, dob })
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
        {/* Google-style header */}
        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-center">
            <JansevaLogo size="lg" />
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-normal text-foreground">
              Sign in
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              to continue to Janseva Labs Patient Portal
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email or phone
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Date of Birth for Adaptive UI */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Date of Birth
              </label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="h-12"
                required
              />
              <p className="text-xs text-muted-foreground">
                Used to personalize your experience
              </p>
            </div>

            {/* Action Links */}
            <div className="flex items-center justify-between text-sm">
              <a
                href="#"
                className="text-janseva-green hover:underline font-medium"
              >
                Forgot password?
              </a>
              <a
                href="#"
                className="text-janseva-green hover:underline font-medium"
              >
                Create account
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-medium bg-janseva-green hover:bg-janseva-green/90 haptic-glow"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Payment Gateway Module */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-muted-foreground text-center mb-4">
              Quick payment methods available after login
            </p>
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-3 rounded-lg glass-button"
              >
                <Smartphone className="w-6 h-6 text-janseva-green" />
                <span className="text-xs">UPI</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-3 rounded-lg glass-button"
              >
                <Wallet className="w-6 h-6 text-janseva-orange" />
                <span className="text-xs">Apple Pay</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-3 rounded-lg glass-button"
              >
                <CreditCard className="w-6 h-6 text-electric-blue" />
                <span className="text-xs">Cards</span>
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
