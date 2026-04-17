"use client"

import { useState, useEffect, useCallback } from "react"

interface OfflineQueueItem {
  id: string
  type: "report_update" | "test_request" | "signature"
  data: any
  timestamp: number
}

export function useOfflineMode() {
  const [isOnline, setIsOnline] = useState(true)
  const [queue, setQueue] = useState<OfflineQueueItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load queue from localStorage
    const savedQueue = localStorage.getItem("janseva-offline-queue")
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue))
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const addToQueue = useCallback((item: Omit<OfflineQueueItem, "id" | "timestamp">) => {
    const newItem: OfflineQueueItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 15),
      timestamp: Date.now(),
    }
    
    setQueue((prev) => {
      const updated = [...prev, newItem]
      localStorage.setItem("janseva-offline-queue", JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeFromQueue = useCallback((id: string) => {
    setQueue((prev) => {
      const updated = prev.filter((item) => item.id !== id)
      localStorage.setItem("janseva-offline-queue", JSON.stringify(updated))
      return updated
    })
  }, [])

  const processQueue = useCallback(async () => {
    if (!isOnline || queue.length === 0 || isProcessing) return

    setIsProcessing(true)
    
    for (const item of queue) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log(`Processing offline item: ${item.type}`, item.data)
        removeFromQueue(item.id)
      } catch (error) {
        console.error(`Failed to process item ${item.id}:`, error)
      }
    }
    
    setIsProcessing(false)
  }, [isOnline, queue, isProcessing, removeFromQueue])

  useEffect(() => {
    if (isOnline && queue.length > 0) {
      processQueue()
    }
  }, [isOnline, queue, processQueue])

  return {
    isOnline,
    queue,
    addToQueue,
    removeFromQueue,
    processQueue,
    isProcessing,
  }
}
