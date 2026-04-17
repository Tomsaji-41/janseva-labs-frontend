"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AdminLoginCard } from "@/components/admin/AdminLoginCard"
import { JansevaLogo } from "@/components/JansevaLogo"
import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"

export default function AdminLogin() {
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = (data: { email: string; password: string; role: "pharmacist" | "hod" }) => {
    setIsLoggingIn(true)
    // Simulate login
    setTimeout(() => {
      localStorage.setItem("janseva-admin-role", data.role)
      router.push("/admin/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/admin-bg.svg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian/90 via-obsidian/80 to-obsidian/90" />

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
          <AdminLoginCard onLogin={handleLogin} />
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
            <p>© 2024 Janseva Labs. Admin Portal. All activities are monitored and logged.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
