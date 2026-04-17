"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface JansevaLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  animated?: boolean
}

const sizes = {
  sm: { container: "h-8", icon: "w-6 h-6", text: "text-lg" },
  md: { container: "h-10", icon: "w-8 h-8", text: "text-xl" },
  lg: { container: "h-14", icon: "w-12 h-12", text: "text-2xl" },
  xl: { container: "h-20", icon: "w-16 h-16", text: "text-4xl" },
}

export function JansevaLogo({ 
  className, 
  size = "md", 
  showText = true,
  animated = false 
}: JansevaLogoProps) {
  const sizeClasses = sizes[size]
  
  const LogoIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className={cn(sizeClasses.icon, "text-janseva-green")}
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
  )

  const Wrapper = animated ? motion.div : "div"
  const wrapperProps = animated ? {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  } : {}

  return (
    <Wrapper 
      className={cn("flex items-center gap-2", sizeClasses.container, className)}
      {...wrapperProps}
    >
      <LogoIcon />
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold leading-none tracking-tight", sizeClasses.text)}>
            <span className="text-janseva-green">Janseva</span>
            <span className="text-janseva-orange ml-1">Labs</span>
          </span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Diagnostic Excellence
          </span>
        </div>
      )}
    </Wrapper>
  )
}
