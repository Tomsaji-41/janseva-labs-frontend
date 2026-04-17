"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Inbox, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Beaker,
  Search,
  Filter,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RequestInboxProps {
  className?: string
}

interface TestRequest {
  id: string
  requestedBy: string
  patientId: string
  testName: string
  reason: string
  status: "pending" | "approved" | "rejected"
  requestedAt: string
  category?: string
  estimatedPrice?: number
}

const sampleRequests: TestRequest[] = [
  {
    id: "REQ001",
    requestedBy: "Rahul Sharma",
    patientId: "PT005",
    testName: "Allergy Panel - Food",
    reason: "Patient has severe allergic reactions to certain foods, needs comprehensive testing",
    status: "pending",
    requestedAt: "2024-01-15T10:30:00",
    category: "Allergy Tests",
    estimatedPrice: 3500,
  },
  {
    id: "REQ002",
    requestedBy: "Priya Patel",
    patientId: "PT008",
    testName: "Genetic Screening - BRCA",
    reason: "Family history of breast cancer, patient wants genetic risk assessment",
    status: "pending",
    requestedAt: "2024-01-15T14:20:00",
    category: "Genetic Tests",
    estimatedPrice: 15000,
  },
  {
    id: "REQ003",
    requestedBy: "Amit Kumar",
    patientId: "PT012",
    testName: "Heavy Metal Screening",
    reason: "Patient works in industrial setting, concerned about lead exposure",
    status: "approved",
    requestedAt: "2024-01-14T09:15:00",
    category: "Toxicology",
    estimatedPrice: 4500,
  },
  {
    id: "REQ004",
    requestedBy: "Sneha Gupta",
    patientId: "PT015",
    testName: "Hormone Panel - Comprehensive",
    reason: "PCOS symptoms, needs detailed hormone analysis",
    status: "rejected",
    requestedAt: "2024-01-14T16:45:00",
    category: "Hormone Tests",
    estimatedPrice: 5500,
  },
]

export function RequestInbox({ className }: RequestInboxProps) {
  const [requests, setRequests] = useState<TestRequest[]>(sampleRequests)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<TestRequest | null>(null)
  const [activeTab, setActiveTab] = useState("pending")
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || request.status === activeTab
    return matchesSearch && matchesTab
  })

  const handleApprove = (requestId: string) => {
    setRequests(requests.map((req) =>
      req.id === requestId ? { ...req, status: "approved" } : req
    ))
    setSelectedRequest(null)
  }

  const handleReject = (requestId: string) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }
    setRequests(requests.map((req) =>
      req.id === requestId ? { ...req, status: "rejected" } : req
    ))
    setSelectedRequest(null)
    setRejectionReason("")
  }

  const getStatusBadge = (status: TestRequest["status"]) => {
    const styles = {
      pending: "bg-amber-vivid/20 text-amber-vivid border-amber-vivid/30",
      approved: "bg-janseva-green/20 text-janseva-green border-janseva-green/30",
      rejected: "bg-destructive/20 text-destructive border-destructive/30",
    }

    const icons = {
      pending: Clock,
      approved: CheckCircle,
      rejected: XCircle,
    }

    const Icon = icons[status]

    return (
      <span className={cn("flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border", styles[status])}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Test Request Inbox</h2>
          <p className="text-sm text-muted-foreground">
            Approve or reject new test requests from patients
          </p>
        </div>
        
        {/* Stats */}
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-lg glass">
            <span className="text-xs text-muted-foreground">Pending</span>
            <p className="text-lg font-bold text-amber-vivid">
              {requests.filter(r => r.status === "pending").length}
            </p>
          </div>
          <div className="px-4 py-2 rounded-lg glass">
            <span className="text-xs text-muted-foreground">Today</span>
            <p className="text-lg font-bold text-janseva-green">
              {requests.filter(r => new Date(r.requestedAt).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="glass-button">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass mb-6">
          <TabsTrigger value="pending" className="data-[state=active]:bg-amber-vivid data-[state=active]:text-white">
            Pending ({requests.filter(r => r.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-janseva-green data-[state=active]:text-white">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-destructive data-[state=active]:text-white">
            Rejected
          </TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card
                    onClick={() => setSelectedRequest(request)}
                    className="p-4 glass cursor-pointer haptic-glow hover:border-janseva-green/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-janseva-green/10">
                          <Inbox className="w-6 h-6 text-janseva-green" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="font-semibold">{request.testName}</h3>
                            {getStatusBadge(request.status)}
                            {request.category && (
                              <span className="px-2 py-0.5 rounded text-xs bg-white/10">
                                {request.category}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              Requested by {request.requestedBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <Beaker className="w-4 h-4" />
                              Patient ID: {request.patientId}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(request.requestedAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {request.reason}
                          </p>
                          {request.estimatedPrice && (
                            <p className="mt-2 text-sm font-medium text-janseva-green">
                              Estimated Price: ₹{request.estimatedPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      {request.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleApprove(request.id)
                            }}
                            className="border-janseva-green text-janseva-green hover:bg-janseva-green/10"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedRequest(request)
                            }}
                            className="border-destructive text-destructive hover:bg-destructive/10"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No requests found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Request Detail Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Beaker className="w-5 h-5 text-janseva-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Test Requested</p>
                    <p className="font-medium">{selectedRequest.testName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-janseva-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Requested By</p>
                    <p className="font-medium">{selectedRequest.requestedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-janseva-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Requested At</p>
                    <p className="font-medium">
                      {new Date(selectedRequest.requestedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg glass">
                <p className="text-sm text-muted-foreground mb-2">Reason for Request</p>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>

              {selectedRequest.status === "pending" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Rejection Reason (if rejecting)
                    </label>
                    <Input
                      placeholder="Enter reason for rejection..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedRequest.id)}
                      disabled={!rejectionReason.trim()}
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="flex-1 bg-janseva-green hover:bg-janseva-green/90"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
