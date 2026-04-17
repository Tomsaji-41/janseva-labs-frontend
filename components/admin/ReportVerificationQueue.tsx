"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  Search,
  Filter,
  PenTool,
  Download
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useOfflineMode } from "@/hooks/useOfflineMode"

interface ReportVerificationQueueProps {
  className?: string
}

interface TestReport {
  id: string
  patientName: string
  patientId: string
  testName: string
  testDate: string
  status: "pending" | "verified" | "rejected"
  result: string
  technician: string
  verifiedBy?: string
  verifiedAt?: string
}

const sampleReports: TestReport[] = [
  {
    id: "1",
    patientName: "Rajesh Kumar",
    patientId: "PT001",
    testName: "Complete Blood Count",
    testDate: "2024-01-15",
    status: "pending",
    result: "Hemoglobin: 12.5 g/dL (Normal)",
    technician: "Dr. Sharma",
  },
  {
    id: "2",
    patientName: "Sunita Devi",
    patientId: "PT002",
    testName: "Thyroid Function Test",
    testDate: "2024-01-15",
    status: "pending",
    result: "TSH: 4.2 mIU/L (Borderline)",
    technician: "Dr. Verma",
  },
  {
    id: "3",
    patientName: "Amit Singh",
    patientId: "PT003",
    testName: "Blood Sugar Fasting",
    testDate: "2024-01-14",
    status: "verified",
    result: "Glucose: 95 mg/dL (Normal)",
    technician: "Dr. Sharma",
    verifiedBy: "Dr. Patel",
    verifiedAt: "2024-01-14T16:30:00",
  },
]

export function ReportVerificationQueue({ className }: ReportVerificationQueueProps) {
  const [reports, setReports] = useState<TestReport[]>(sampleReports)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<TestReport | null>(null)
  const [signature, setSignature] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const { isOnline, queue, addToQueue } = useOfflineMode()

  const filteredReports = reports.filter((report) => {
    const matchesSearch = 
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || report.status === activeTab
    return matchesSearch && matchesTab
  })

  const handleVerify = (reportId: string, approved: boolean) => {
    if (!signature.trim()) {
      alert("Please provide your digital signature")
      return
    }

    const updatedReports = reports.map((report) =>
      report.id === reportId
        ? {
            ...report,
            status: (approved ? "verified" : "rejected") as "verified" | "rejected",
            verifiedBy: signature,
            verifiedAt: new Date().toISOString(),
          }
        : report
    )

    // If offline, queue the update
    if (!isOnline) {
      addToQueue({
        type: "report_update",
        data: { reportId, approved, signature },
      })
    }

    setReports(updatedReports)
    setSelectedReport(null)
    setSignature("")
  }

  const getStatusBadge = (status: TestReport["status"]) => {
    const styles = {
      pending: "bg-amber-vivid/20 text-amber-vivid border-amber-vivid/30",
      verified: "bg-janseva-green/20 text-janseva-green border-janseva-green/30",
      rejected: "bg-destructive/20 text-destructive border-destructive/30",
    }

    const icons = {
      pending: Clock,
      verified: CheckCircle,
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
          <h2 className="text-2xl font-semibold">Report Verification Queue</h2>
          <p className="text-sm text-muted-foreground">
            Review and approve test reports with digital signatures
          </p>
        </div>
        
        {/* Offline Indicator */}
        {!isOnline && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-vivid/10 border border-amber-vivid/30">
            <Clock className="w-4 h-4 text-amber-vivid" />
            <span className="text-sm text-amber-vivid">
              Offline Mode - {queue.length} items queued
            </span>
          </div>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by patient name, test, or ID..."
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
            Pending ({reports.filter(r => r.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="verified" className="data-[state=active]:bg-janseva-green data-[state=active]:text-white">
            Verified ({reports.filter(r => r.status === "verified").length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-destructive data-[state=active]:text-white">
            Rejected ({reports.filter(r => r.status === "rejected").length})
          </TabsTrigger>
          <TabsTrigger value="all">All Reports</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredReports.map((report) => (
                <motion.div
                  key={report.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card
                    onClick={() => setSelectedReport(report)}
                    className="p-4 glass cursor-pointer haptic-glow hover:border-janseva-green/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-janseva-green/10">
                          <FileText className="w-6 h-6 text-janseva-green" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold">{report.testName}</h3>
                            {getStatusBadge(report.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {report.patientName} ({report.patientId})
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(report.testDate).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="mt-2 text-sm">{report.result}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {report.status === "verified" && report.verifiedBy && (
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Verified by</p>
                            <p className="text-sm font-medium">{report.verifiedBy}</p>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="glass-button"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No reports found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Verification Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle>Verify Report</DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6 py-4">
              {/* Report Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-janseva-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Patient</p>
                    <p className="font-medium">{selectedReport.patientName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-janseva-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Test</p>
                    <p className="font-medium">{selectedReport.testName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-janseva-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {new Date(selectedReport.testDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Result Preview */}
              <div className="p-4 rounded-lg glass">
                <p className="text-sm text-muted-foreground mb-2">Test Result</p>
                <p className="font-medium">{selectedReport.result}</p>
              </div>

              {/* Digital Signature */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <PenTool className="w-4 h-4" />
                  Digital Signature
                </label>
                <Input
                  placeholder="Type your full name as signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  By signing, you confirm the accuracy of this report
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleVerify(selectedReport.id, false)}
                  disabled={!signature.trim()}
                  className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleVerify(selectedReport.id, true)}
                  disabled={!signature.trim()}
                  className="flex-1 bg-janseva-green hover:bg-janseva-green/90"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
