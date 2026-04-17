"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Activity, 
  Heart, 
  Brain, 
  Bone, 
  Droplets, 
  Stethoscope,
  Pill,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useAdaptiveUI } from "@/hooks/useAdaptiveUI"

interface MedicalBentoGridProps {
  className?: string
  dateOfBirth?: string
  onSubmit?: (data: MedicalHistoryData) => void
}

export interface MedicalHistoryData {
  conditions: string[]
  allergies: string[]
  medications: string[]
  bloodType: string
  height: string
  weight: string
  familyHistory: string[]
  lifestyle: {
    smoking: boolean
    alcohol: boolean
    exercise: string
  }
}

const commonConditions = [
  { id: "diabetes", label: "Diabetes", icon: Droplets },
  { id: "hypertension", label: "Hypertension", icon: Heart },
  { id: "asthma", label: "Asthma", icon: Activity },
  { id: "heart_disease", label: "Heart Disease", icon: Heart },
  { id: "thyroid", label: "Thyroid", icon: Activity },
  { id: "arthritis", label: "Arthritis", icon: Bone },
  { id: "migraine", label: "Migraine", icon: Brain },
  { id: "none", label: "None", icon: CheckCircle2 },
]

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function MedicalBentoGrid({ className, dateOfBirth, onSubmit }: MedicalBentoGridProps) {
  const { fontSize, buttonClass, isElderly } = useAdaptiveUI(dateOfBirth)
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<MedicalHistoryData>({
    conditions: [],
    allergies: [],
    medications: [],
    bloodType: "",
    height: "",
    weight: "",
    familyHistory: [],
    lifestyle: {
      smoking: false,
      alcohol: false,
      exercise: "moderate",
    },
  })

  const toggleCondition = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition],
    }))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onSubmit?.(formData)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: s <= step ? "#00A651" : "rgba(255,255,255,0.1)",
                scale: s === step ? 1.1 : 1,
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            >
              {s}
            </motion.div>
            {s < 4 && (
              <div
                className={cn(
                  "w-12 h-1 rounded-full",
                  s < step ? "bg-janseva-green" : "bg-white/10"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <div className="space-y-6">
            <h2 className={cn("font-semibold text-center", fontSize)}>
              Select Your Medical Conditions
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {commonConditions.map((condition) => (
                <motion.button
                  key={condition.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleCondition(condition.id)}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2",
                    formData.conditions.includes(condition.id)
                      ? "bg-janseva-green/20 border-janseva-green"
                      : "glass hover:bg-white/10"
                  )}
                >
                  <condition.icon className="w-8 h-8" />
                  <span className={cn("text-sm", isElderly && "text-lg")}>
                    {condition.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className={cn("font-semibold text-center", fontSize)}>
              Vital Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 glass space-y-3">
                <label className="text-sm text-muted-foreground">Blood Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, bloodType: type })}
                      className={cn(
                        "p-2 rounded-lg text-sm font-medium transition-all",
                        formData.bloodType === type
                          ? "bg-janseva-green text-white"
                          : "glass-button"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-4 glass space-y-3">
                <label className="text-sm text-muted-foreground">Height (cm)</label>
                <Input
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="h-12"
                />
              </Card>

              <Card className="p-4 glass space-y-3">
                <label className="text-sm text-muted-foreground">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="h-12"
                />
              </Card>
            </div>

            <Card className="p-4 glass space-y-3">
              <label className="text-sm text-muted-foreground">Known Allergies</label>
              <Input
                placeholder="Enter allergies separated by commas (e.g., Penicillin, Peanuts)"
                value={formData.allergies.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allergies: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                className="h-12"
              />
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className={cn("font-semibold text-center", fontSize)}>
              Current Medications
            </h2>
            <Card className="p-4 glass space-y-3">
              <label className="text-sm text-muted-foreground">
                List your current medications
              </label>
              <Input
                placeholder="Enter medications separated by commas"
                value={formData.medications.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medications: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                className="h-12"
              />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Stethoscope className="w-4 h-4" />
                <span>Include dosage if known</span>
              </div>
            </Card>

            <Card className="p-4 glass space-y-3">
              <label className="text-sm text-muted-foreground">
                Family Medical History
              </label>
              <Input
                placeholder="Conditions that run in your family"
                value={formData.familyHistory.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    familyHistory: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                className="h-12"
              />
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className={cn("font-semibold text-center", fontSize)}>
              Lifestyle Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 glass space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <span className={cn(isElderly && "text-xl")}>Do you smoke?</span>
                  </div>
                  <Switch
                    checked={formData.lifestyle.smoking}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        lifestyle: { ...formData.lifestyle, smoking: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-janseva-orange" />
                    <span className={cn(isElderly && "text-xl")}>Alcohol consumption?</span>
                  </div>
                  <Switch
                    checked={formData.lifestyle.alcohol}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        lifestyle: { ...formData.lifestyle, alcohol: checked },
                      })
                    }
                  />
                </div>
              </Card>

              <Card className="p-4 glass space-y-4">
                <label className={cn("text-muted-foreground", isElderly && "text-xl")}>
                  Exercise Frequency
                </label>
                <div className="space-y-2">
                  {["none", "light", "moderate", "active"].map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          lifestyle: { ...formData.lifestyle, exercise: level },
                        })
                      }
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-all flex items-center gap-3",
                        formData.lifestyle.exercise === level
                          ? "bg-janseva-green/20 border border-janseva-green"
                          : "glass-button"
                      )}
                    >
                      <Activity className="w-4 h-4" />
                      <span className="capitalize">{level}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="ghost"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className={cn(isElderly && "text-xl px-8 py-4")}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className={cn(
            "haptic-glow",
            isElderly ? buttonClass : "bg-janseva-green hover:bg-janseva-green/90"
          )}
        >
          {step === 4 ? "Complete" : "Continue"}
        </Button>
      </div>
    </div>
  )
}
