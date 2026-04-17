"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { User, Shield, Activity, Heart, Beaker } from "lucide-react"
import { JansevaLogo } from "@/components/JansevaLogo"
import { GlassPanel, GlassButton } from "@/components/GlassPanel"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/poppy-bg.svg')" }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <JansevaLogo size="md" />
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-5xl w-full">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-janseva-green" />
                <span className="text-sm font-medium text-janseva-green uppercase tracking-wider">
                  Diagnostic Excellence
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-janseva-green to-janseva-orange bg-clip-text text-transparent">
                Welcome to Janseva Labs
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Premium diagnostic services with transparent pricing, 
                accessible care for all ages, and state-of-the-art technology.
              </p>
            </motion.div>

            {/* Portal Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Patient Portal */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <GlassPanel variant="card" className="h-full p-8">
                  <div className="flex flex-col h-full">
                    <div className="p-4 rounded-2xl bg-janseva-green/10 w-fit mb-6">
                      <Heart className="w-8 h-8 text-janseva-green" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Patient Portal</h2>
                    <p className="text-muted-foreground mb-6 flex-1">
                      Book tests, view medical history, manage family profiles, 
                      and access your health records securely.
                    </p>
                    <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Beaker className="w-4 h-4 text-janseva-green" />
                        Smart test booking
                      </li>
                      <li className="flex items-center gap-2">
                        <User className="w-4 h-4 text-janseva-green" />
                        Caregiver mode for elderly
                      </li>
                      <li className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-janseva-green" />
                        Medical history tracking
                      </li>
                    </ul>
                    <Link href="/patient/login">
                      <GlassButton className="w-full justify-center">
                        Access Patient Portal
                      </GlassButton>
                    </Link>
                  </div>
                </GlassPanel>
              </motion.div>

              {/* Admin Portal */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GlassPanel variant="card" className="h-full p-8">
                  <div className="flex flex-col h-full">
                    <div className="p-4 rounded-2xl bg-amber-vivid/10 w-fit mb-6">
                      <Shield className="w-8 h-8 text-amber-vivid" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Admin Command</h2>
                    <p className="text-muted-foreground mb-6 flex-1">
                      Operational cockpit for pharmacists and HODs. 
                      Manage staff, verify reports, and monitor live operations.
                    </p>
                    <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Beaker className="w-4 h-4 text-amber-vivid" />
                        Report verification queue
                      </li>
                      <li className="flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-vivid" />
                        Staff monitoring
                      </li>
                      <li className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber-vivid" />
                        Live test tracking
                      </li>
                    </ul>
                    <Link href="/admin/login">
                      <GlassButton className="w-full justify-center bg-amber-vivid/20 hover:bg-amber-vivid/30 border-amber-vivid/50">
                        Access Admin Portal
                      </GlassButton>
                    </Link>
                  </div>
                </GlassPanel>
              </motion.div>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
            >
              {[
                { label: "200+ Tests", value: "Available" },
                { label: "50,000+", value: "Patients Served" },
                { label: "24/7", value: "Service Available" },
                { label: "NABL", value: "Accredited" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 glass rounded-xl">
                  <p className="text-lg font-bold text-janseva-green">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
            <p>© 2024 Janseva Labs. All rights reserved. | NABL Accredited Diagnostic Center</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
