"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "dark" | "card" | "floating"
  animate?: boolean
  delay?: number
}

const variants = {
  default: "glass",
  dark: "glass-dark",
  card: "glass-card",
  floating: "glass-card animate-float",
}

export function GlassPanel({ 
  children, 
  className, 
  variant = "default",
  animate = false,
  delay = 0
}: GlassPanelProps) {
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cn(variants[variant], className)}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  )
}

interface GlassButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "elderly" | "ghost"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit"
}

const buttonVariants = {
  default: "glass-button",
  primary: "bg-janseva-green text-white hover:bg-janseva-green/90 backdrop-blur-md",
  elderly: "bg-electric-blue text-white text-xl font-bold px-8 py-4 rounded-xl haptic-glow",
  ghost: "hover:bg-white/10 backdrop-blur-sm transition-all duration-300",
}

export function GlassButton({ 
  children, 
  className, 
  variant = "default",
  onClick,
  disabled,
  type = "button"
}: GlassButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn(
        "rounded-lg px-4 py-2 font-medium transition-all duration-200 haptic-glow",
        buttonVariants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  )
}
