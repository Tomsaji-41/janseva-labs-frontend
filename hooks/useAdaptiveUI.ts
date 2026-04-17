"use client"

import { useState, useEffect, useCallback } from "react"
import { calculateAge } from "@/lib/utils"

interface AdaptiveUIConfig {
  isElderly: boolean
  fontSize: string
  buttonClass: string
  cardPadding: string
  spacing: string
}

export function useAdaptiveUI(dateOfBirth?: string): AdaptiveUIConfig {
  const [config, setConfig] = useState<AdaptiveUIConfig>({
    isElderly: false,
    fontSize: "text-base",
    buttonClass: "",
    cardPadding: "p-6",
    spacing: "space-y-4",
  })

  const updateConfig = useCallback(() => {
    if (!dateOfBirth) {
      setConfig({
        isElderly: false,
        fontSize: "text-base",
        buttonClass: "",
        cardPadding: "p-6",
        spacing: "space-y-4",
      })
      return
    }

    const age = calculateAge(dateOfBirth)
    const isElderly = age > 50

    if (isElderly) {
      setConfig({
        isElderly: true,
        fontSize: "text-2xl",
        buttonClass: "bg-electric-blue text-white text-xl font-bold px-8 py-4 rounded-xl",
        cardPadding: "p-8",
        spacing: "space-y-6",
      })
    } else {
      setConfig({
        isElderly: false,
        fontSize: "text-base",
        buttonClass: "",
        cardPadding: "p-6",
        spacing: "space-y-4",
      })
    }
  }, [dateOfBirth])

  useEffect(() => {
    updateConfig()
  }, [updateConfig])

  return config
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("janseva-theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("janseva-theme", newTheme)
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return { theme, toggleTheme, mounted }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error)
    }
    setIsHydrated(true)
  }, [key])

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [isHydrated ? storedValue : initialValue, setValue]
}
