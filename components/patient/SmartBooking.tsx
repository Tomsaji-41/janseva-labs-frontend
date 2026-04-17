"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  TestTube, 
  Heart,
  Brain,
  Bone,
  Droplets,
  Activity,
  Microscope,
  X,
  Plus,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useAdaptiveUI } from "@/hooks/useAdaptiveUI"

interface SmartBookingProps {
  className?: string
  dateOfBirth?: string
  onBookTest?: (test: TestItem, date: string, time: string) => void
  onRequestTest?: (testName: string) => void
}

interface TestItem {
  id: string
  name: string
  category: string
  price: number
  duration: string
  preparation: string
  icon: React.ElementType
  description: string
}

const testCatalog: TestItem[] = [
  { id: "1", name: "Complete Blood Count (CBC)", category: "Blood Tests", price: 350, duration: "15 mins", preparation: "Fasting 8-12 hours", icon: Droplets, description: "Measures various components of blood including red blood cells, white blood cells, and platelets." },
  { id: "2", name: "Blood Sugar (FBS/PPBS)", category: "Blood Tests", price: 200, duration: "10 mins", preparation: "Fasting 8-12 hours for FBS", icon: Droplets, description: "Measures blood glucose levels to diagnose diabetes and monitor blood sugar control." },
  { id: "3", name: "HbA1c", category: "Blood Tests", price: 500, duration: "10 mins", preparation: "No fasting required", icon: Droplets, description: "Provides average blood sugar levels over the past 2-3 months." },
  { id: "4", name: "Lipid Profile", category: "Blood Tests", price: 800, duration: "15 mins", preparation: "Fasting 12 hours", icon: Heart, description: "Measures cholesterol levels including HDL, LDL, and triglycerides." },
  { id: "5", name: "Thyroid Function Test (TFT)", category: "Hormone Tests", price: 1200, duration: "15 mins", preparation: "No special preparation", icon: Activity, description: "Checks thyroid hormone levels including T3, T4, and TSH." },
  { id: "6", name: "Liver Function Test (LFT)", category: "Organ Function", price: 1500, duration: "20 mins", preparation: "No fasting required", icon: Activity, description: "Evaluates liver health by measuring enzymes, proteins, and bilirubin." },
  { id: "7", name: "Kidney Function Test (KFT)", category: "Organ Function", price: 1400, duration: "20 mins", preparation: "No special preparation", icon: Activity, description: "Assesses kidney function through creatinine, BUN, and electrolyte levels." },
  { id: "8", name: "ECG", category: "Cardiac Tests", price: 400, duration: "15 mins", preparation: "No special preparation", icon: Heart, description: "Records electrical activity of the heart to detect cardiac issues." },
  { id: "9", name: "Chest X-Ray", category: "Imaging", price: 600, duration: "30 mins", preparation: "Remove metal objects", icon: Activity, description: "Imaging test to examine chest organs including heart and lungs." },
  { id: "10", name: "MRI Brain", category: "Imaging", price: 5500, duration: "45 mins", preparation: "No metal implants", icon: Brain, description: "Detailed imaging of brain structure and tissues." },
  { id: "11", name: "CT Scan Abdomen", category: "Imaging", price: 4500, duration: "30 mins", preparation: "Fasting 4-6 hours", icon: Activity, description: "Cross-sectional imaging of abdominal organs." },
  { id: "12", name: "Bone Density Test", category: "Bone Health", price: 2500, duration: "20 mins", preparation: "No calcium supplements 24hrs", icon: Bone, description: "Measures bone mineral density to assess osteoporosis risk." },
  { id: "13", name: "Vitamin D Test", category: "Vitamin Tests", price: 1500, duration: "10 mins", preparation: "No special preparation", icon: Sun, description: "Measures vitamin D levels in blood." },
  { id: "14", name: "Vitamin B12 Test", category: "Vitamin Tests", price: 1200, duration: "10 mins", preparation: "No special preparation", icon: Activity, description: "Checks vitamin B12 levels for deficiency." },
  { id: "15", name: "Urine Analysis", category: "Urine Tests", price: 300, duration: "15 mins", preparation: "First morning sample preferred", icon: TestTube, description: "Examines urine for various health indicators." },
  { id: "16", name: "Stool Test", category: "Stool Tests", price: 500, duration: "20 mins", preparation: "Collect sample as instructed", icon: Microscope, description: "Analyzes stool for digestive health and infections." },
]

const categories = ["All", "Blood Tests", "Hormone Tests", "Organ Function", "Cardiac Tests", "Imaging", "Bone Health", "Vitamin Tests", "Urine Tests", "Stool Tests"]

const timeSlots = [
  "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
]

function Sun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  )
}

export function SmartBooking({ className, dateOfBirth, onBookTest, onRequestTest }: SmartBookingProps) {
  const { fontSize, isElderly } = useAdaptiveUI(dateOfBirth)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTest, setSelectedTest] = useState<TestItem | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestedTestName, setRequestedTestName] = useState("")

  const filteredTests = useMemo(() => {
    return testCatalog.filter((test) => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || test.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleBookTest = () => {
    if (selectedTest && selectedDate && selectedTime) {
      onBookTest?.(selectedTest, selectedDate, selectedTime)
      setSelectedTest(null)
      setSelectedDate("")
      setSelectedTime("")
    }
  }

  const handleRequestTest = () => {
    if (requestedTestName.trim()) {
      onRequestTest?.(requestedTestName)
      setShowRequestModal(false)
      setRequestedTestName("")
    }
  }

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for tests (e.g., 'blood sugar', 'thyroid')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("pl-12 h-14", isElderly && "text-xl")}
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all haptic-glow",
                selectedCategory === category
                  ? "bg-janseva-green text-white"
                  : "glass-button"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Test Grid */}
      <AnimatePresence mode="wait">
        {filteredTests.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  onClick={() => setSelectedTest(test)}
                  className="p-4 glass cursor-pointer haptic-glow hover:border-janseva-green/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-janseva-green/10">
                      <test.icon className="w-5 h-5 text-janseva-green" />
                    </div>
                    <span className="text-lg font-bold text-janseva-green">
                      ₹{test.price}
                    </span>
                  </div>
                  <h3 className={cn("font-semibold mb-2", isElderly ? "text-xl" : "text-base")}>
                    {test.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {test.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {test.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {test.category}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className={cn("text-muted-foreground mb-4", fontSize)}>
              No tests found for &quot;{searchQuery}&quot;
            </p>
            <Button
              onClick={() => setShowRequestModal(true)}
              className="bg-janseva-orange hover:bg-janseva-orange/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Request Test
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Test Button */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Can&apos;t find the test you&apos;re looking for?
        </p>
        <Button
          variant="outline"
          onClick={() => setShowRequestModal(true)}
          className="glass-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request New Test
        </Button>
      </div>

      {/* Test Booking Dialog */}
      <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle className={cn("flex items-center gap-2", fontSize)}>
              {selectedTest && <selectedTest.icon className="w-6 h-6 text-janseva-green" />}
              {selectedTest?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedTest?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Test Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg glass">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-lg font-bold text-janseva-green">₹{selectedTest?.price}</p>
              </div>
              <div className="p-3 rounded-lg glass">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-lg font-medium">{selectedTest?.duration}</p>
              </div>
              <div className="p-3 rounded-lg glass col-span-2">
                <p className="text-xs text-muted-foreground">Preparation</p>
                <p className="text-sm">{selectedTest?.preparation}</p>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className={cn("text-sm font-medium", isElderly && "text-lg")}>
                Select Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="pl-12"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <label className={cn("text-sm font-medium", isElderly && "text-lg")}>
                Select Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "p-2 rounded-lg text-sm transition-all haptic-glow",
                      selectedTime === time
                        ? "bg-janseva-green text-white"
                        : "glass-button"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 p-3 rounded-lg glass">
              <MapPin className="w-5 h-5 text-janseva-orange" />
              <div>
                <p className="text-sm font-medium">Janseva Labs - Main Center</p>
                <p className="text-xs text-muted-foreground">123 Healthcare Avenue, Medical District</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setSelectedTest(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBookTest}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 bg-janseva-green hover:bg-janseva-green/90 haptic-glow"
            >
              Book Test
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Test Dialog */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Request New Test</DialogTitle>
            <DialogDescription>
              Can&apos;t find the test you need? Submit a request and our team will add it to the catalog.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Test Name</label>
              <Input
                placeholder="Enter the name of the test you need"
                value={requestedTestName}
                onChange={(e) => setRequestedTestName(e.target.value)}
              />
            </div>
            <div className="p-3 rounded-lg bg-amber-vivid/10 border border-amber-vivid/30">
              <p className="text-sm text-amber-vivid">
                This request will be sent to the admin for approval. You&apos;ll be notified once it&apos;s available.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRequestModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestTest}
              disabled={!requestedTestName.trim()}
              className="flex-1 bg-janseva-orange hover:bg-janseva-orange/90"
            >
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
