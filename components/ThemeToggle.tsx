"use client"

import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/useAdaptiveUI"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <div className={cn(
        "w-10 h-10 rounded-full glass flex items-center justify-center",
        className
      )}>
        <div className="w-5 h-5" />
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative w-10 h-10 rounded-full glass flex items-center justify-center haptic-glow",
        className
      )}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <Moon className="w-5 h-5 text-amber-vivid" />
        ) : (
          <Sun className="w-5 h-5 text-janseva-orange" />
        )}
      </motion.div>
    </motion.button>
  )
}
