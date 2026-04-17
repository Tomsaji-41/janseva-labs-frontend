"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, 
  UserCircle, 
  Plus, 
  X, 
  ArrowLeftRight, 
  Heart,
  ChevronRight,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useAdaptiveUI } from "@/hooks/useAdaptiveUI"

interface CaregiverModeProps {
  className?: string
  currentUserDob?: string
  onSwitchProfile?: (profile: FamilyProfile) => void
}

interface FamilyProfile {
  id: string
  name: string
  relationship: string
  dateOfBirth: string
  bloodType: string
  conditions: string[]
  avatar?: string
}

const sampleFamilyProfiles: FamilyProfile[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    relationship: "Father",
    dateOfBirth: "1955-03-15",
    bloodType: "O+",
    conditions: ["Diabetes", "Hypertension"],
  },
  {
    id: "2",
    name: "Sunita Devi",
    relationship: "Mother",
    dateOfBirth: "1958-07-22",
    bloodType: "A+",
    conditions: ["Thyroid"],
  },
]

export function CaregiverMode({ className, currentUserDob, onSwitchProfile }: CaregiverModeProps) {
  const { fontSize, isElderly } = useAdaptiveUI(currentUserDob)
  
  const [isEnabled, setIsEnabled] = useState(false)
  const [profiles, setProfiles] = useState<FamilyProfile[]>(sampleFamilyProfiles)
  const [activeProfile, setActiveProfile] = useState<FamilyProfile | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProfile, setNewProfile] = useState<Partial<FamilyProfile>>({
    name: "",
    relationship: "",
    dateOfBirth: "",
    bloodType: "",
    conditions: [],
  })

  const handleSwitchProfile = (profile: FamilyProfile) => {
    setActiveProfile(profile)
    onSwitchProfile?.(profile)
  }

  const handleAddProfile = () => {
    if (newProfile.name && newProfile.relationship && newProfile.dateOfBirth) {
      const profile: FamilyProfile = {
        id: Math.random().toString(36).substring(2, 15),
        name: newProfile.name,
        relationship: newProfile.relationship,
        dateOfBirth: newProfile.dateOfBirth,
        bloodType: newProfile.bloodType || "Unknown",
        conditions: newProfile.conditions || [],
      }
      setProfiles([...profiles, profile])
      setShowAddModal(false)
      setNewProfile({
        name: "",
        relationship: "",
        dateOfBirth: "",
        bloodType: "",
        conditions: [],
      })
    }
  }

  const handleRemoveProfile = (id: string) => {
    setProfiles(profiles.filter((p) => p.id !== id))
    if (activeProfile?.id === id) {
      setActiveProfile(null)
    }
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {/* Toggle Section */}
      <Card className="p-6 glass-card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-janseva-green/10">
              <Users className="w-6 h-6 text-janseva-green" />
            </div>
            <div>
              <h3 className={cn("font-semibold", fontSize)}>Caregiver Mode</h3>
              <p className="text-sm text-muted-foreground">
                Manage health records for your family members
              </p>
            </div>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
            className="data-[state=checked]:bg-janseva-green"
          />
        </div>
      </Card>

      <AnimatePresence>
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Active Profile Indicator */}
            {activeProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-janseva-green/10 border border-janseva-green/30"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-janseva-green" />
                  <div>
                    <p className="text-sm font-medium">
                      Currently managing: {activeProfile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activeProfile.relationship} • {activeProfile.bloodType}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile List */}
            <div className="space-y-3">
              <h4 className={cn("font-medium", isElderly && "text-xl")}>
                Family Members
              </h4>
              
              {profiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card
                    className={cn(
                      "p-4 glass cursor-pointer transition-all haptic-glow",
                      activeProfile?.id === profile.id && "border-janseva-green bg-janseva-green/5"
                    )}
                    onClick={() => handleSwitchProfile(profile)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/10">
                          <UserCircle className="w-8 h-8 text-janseva-green" />
                        </div>
                        <div>
                          <h5 className={cn("font-semibold", isElderly && "text-lg")}>
                            {profile.name}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {profile.relationship} • Born {new Date(profile.dateOfBirth).getFullYear()}
                          </p>
                          {profile.conditions.length > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              <Heart className="w-3 h-3 text-rose-500" />
                              <span className="text-xs text-muted-foreground">
                                {profile.conditions.join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {activeProfile?.id === profile.id && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-janseva-green text-white">
                            Active
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveProfile(profile.id)
                          }}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Add Profile Button */}
              <Button
                variant="outline"
                onClick={() => setShowAddModal(true)}
                className="w-full haptic-glow glass-button py-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Family Member
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveProfile(null)}
                  disabled={!activeProfile}
                  className="glass-button"
                >
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Back to My Profile
                </Button>
                <Button
                  variant="outline"
                  className="glass-button"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  View All Records
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Profile Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="glass-card max-w-md">
          <DialogHeader>
            <DialogTitle className={fontSize}>Add Family Member</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="Enter full name"
                value={newProfile.name}
                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Relationship</label>
              <Input
                placeholder="e.g., Father, Mother, Spouse"
                value={newProfile.relationship}
                onChange={(e) => setNewProfile({ ...newProfile, relationship: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <Input
                type="date"
                value={newProfile.dateOfBirth}
                onChange={(e) => setNewProfile({ ...newProfile, dateOfBirth: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Blood Type (Optional)</label>
              <Input
                placeholder="e.g., O+, A-, AB+"
                value={newProfile.bloodType}
                onChange={(e) => setNewProfile({ ...newProfile, bloodType: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Known Conditions (Optional)</label>
              <Input
                placeholder="e.g., Diabetes, Hypertension (comma separated)"
                value={newProfile.conditions?.join(", ")}
                onChange={(e) => setNewProfile({ 
                  ...newProfile, 
                  conditions: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddProfile}
              disabled={!newProfile.name || !newProfile.relationship || !newProfile.dateOfBirth}
              className="flex-1 bg-janseva-green hover:bg-janseva-green/90"
            >
              Add Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
