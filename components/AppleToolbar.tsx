"use client"

import { motion } from "framer-motion"
import { Home, Calendar, FileText, Users, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { JansevaLogo } from "./JansevaLogo"
import { ThemeToggle } from "./ThemeToggle"
import Link from "next/link"

interface AppleToolbarProps {
  className?: string
  userType?: "patient" | "pharmacist" | "hod"
  userName?: string
}

const patientLinks = [
  { href: "/patient", icon: Home, label: "Home" },
  { href: "/patient/booking", icon: Calendar, label: "Book Test" },
  { href: "/patient/history", icon: FileText, label: "History" },
  { href: "/patient/family", icon: Users, label: "Family" },
]

const adminLinks = [
  { href: "/admin", icon: Home, label: "Dashboard" },
  { href: "/admin/reports", icon: FileText, label: "Reports" },
  { href: "/admin/requests", icon: Calendar, label: "Requests" },
  { href: "/admin/staff", icon: Users, label: "Staff" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

export function AppleToolbar({ 
  className, 
  userType = "patient",
  userName 
}: AppleToolbarProps) {
  const links = userType === "patient" ? patientLinks : adminLinks

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 py-3",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href={userType === "patient" ? "/patient" : "/admin"}>
            <JansevaLogo size="sm" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/10 transition-all duration-200"
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {userName && (
              <span className="hidden sm:block text-sm text-muted-foreground">
                Welcome, {userName}
              </span>
            )}
            
            <ThemeToggle />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  )
}
