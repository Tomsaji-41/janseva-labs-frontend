"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { GoogleLoginCard } from "@/components/patient/GoogleLoginCard"
import { JansevaLogo } from "@/components/JansevaLogo"
import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"

export default function PatientLogin() {
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = (data: { email: string; password: string; dob: string }) => {
    setIsLoggingIn(true)
    // Simulate login
    setTimeout(() => {
      // Store DOB in localStorage for adaptive UI
      localStorage.setItem("janseva-dob", data.dob)
      router.push("/patient/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/poppy-bg.svg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/">
              <JansevaLogo size="md" />
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <GoogleLoginCard onLogin={handleLogin} />
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
            <p>© 2024 Janseva Labs. All rights reserved. | NABL Accredited</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
