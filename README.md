# Janseva Labs - Medical Diagnostic Ecosystem

A premium dual-platform medical diagnostic ecosystem built with Next.js 14, Tailwind CSS, and Framer Motion. Features "Vision Pro" Glassmorphism design with adaptive UI for elderly users.

## 🌟 Features

### Patient Hub
- **Google-style Login** with integrated payment gateway (UPI, Apple Pay, Credit Cards)
- **Adaptive UI Engine** - Automatically adjusts for users over 50 (larger text, high contrast, bold buttons)
- **Medical Bento Grid** - Multi-step medical history intake form
- **Smart Booking** - Searchable test catalog with 200+ tests
- **Test Request System** - Request missing tests that alert admin
- **Family Sync** - Caregiver Mode to manage elderly relatives' records

### Admin Command
- **RBAC Login** - Role selector for Pharmacist (Admin) and HOD (SuperAdmin)
- **Pharmacist Dashboard**:
  - Report Verification Queue with digital signatures
  - PWA Offline Mode for basement operations
  - Request Inbox for test approvals
- **HOD Dashboard**:
  - Staff Monitor with punch in/out tracking
  - Predictive Staffing with AI-powered workforce optimization
  - Live Radar for real-time test tracking
- **Apple Toolbar** - Persistent floating navigation with theme toggle

## 🎨 Design Philosophy

- **Glassmorphism**: `backdrop-blur(20px)`, semi-transparent glass panels
- **Obsidian Dark Mode**: Deep charcoal (#0A0A0B) with Vivid Amber accents
- **Haptic Feedback**: Visual pulse/glow on all interactive elements
- **Background Images**: Custom SVG backgrounds for each portal (poppy flower, lab, admin radar)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
```

Static files will be generated in the `dist` folder.

## 📁 Project Structure

```
janseva-labs/
├── app/
│   ├── page.tsx              # Landing page with portal selection
│   ├── patient/
│   │   ├── login/page.tsx    # Patient login
│   │   └── dashboard/page.tsx # Patient dashboard
│   ├── admin/
│   │   ├── login/page.tsx    # Admin login
│   │   └── dashboard/page.tsx # Admin dashboard
│   ├── layout.tsx            # Root layout with ThemeProvider
│   └── globals.css           # Global styles & glassmorphism utilities
├── components/
│   ├── ui/                   # Reusable UI components (Button, Card, etc.)
│   ├── patient/              # Patient-specific components
│   ├── admin/                # Admin-specific components
│   ├── JansevaLogo.tsx       # Brand logo component
│   ├── ThemeProvider.tsx     # Theme context provider
│   ├── ThemeToggle.tsx       # Light/Dark mode toggle
│   ├── GlassPanel.tsx        # Glassmorphism container
│   └── AppleToolbar.tsx      # Floating navigation
├── hooks/
│   ├── useAdaptiveUI.ts      # Age-based UI adaptation
│   └── useOfflineMode.ts     # PWA offline queue management
├── lib/
│   └── utils.ts              # Utility functions
├── public/
│   └── images/               # Background SVGs
│       ├── poppy-bg.svg      # Landing page background
│       ├── patient-bg.svg    # Patient portal background
│       ├── lab-bg.svg        # Lab-themed background
│       └── admin-bg.svg      # Admin radar background
├── tailwind.config.ts        # Custom theme configuration
└── next.config.mjs           # Next.js configuration
```

## 🎯 Key Technologies

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animation**: Framer Motion for physics-based animations
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization

## 🔐 Access Portals

### Patient Portal
- URL: `/patient/login`
- Demo: Enter any email/password/DOB to access
- Features DOB-based adaptive UI (try DOB before 1974 for elderly mode)

### Admin Portal
- URL: `/admin/login`
- Select role: Pharmacist or HOD
- Pharmacist sees: Reports, Requests, Live Radar
- HOD sees: Staff, Predictive Staffing, Live Radar, Reports

## 🌓 Theme Toggle

Both portals support Light/Obsidian Dark mode via the theme toggle button in the toolbar.

## 📱 PWA Support

The application includes Service Worker infrastructure for offline operation, particularly useful for admin staff working in lab basements with limited connectivity.

## 🎨 Brand Colors

- Primary Green: `#00A651` (Janseva Green)
- Primary Orange: `#F37021` (Janseva Orange)
- Accent Blue: `#0066FF` (Electric Blue for elderly mode)
- Accent Amber: `#FF9500` (Vivid Amber for dark mode)
- Obsidian: `#0A0A0B` (Dark mode background)

## 📄 License

© 2026 Janseva Labs. All rights reserved.

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion.
