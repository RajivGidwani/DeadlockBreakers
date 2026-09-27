# LandStack OneView — Digital Public Infrastructure (DPI) Platform
## Enterprise Cadastral Land Governance, AI Spatial Risk & DigiLocker eKYC Portal

A production-ready, enterprise-grade Digital Public Infrastructure (DPI) web application built for Revenue Officers, Town Planning Authorities, District Collectors, and System Administrators under the Gandhinagar Revenue Circle (Sector 21 & Sector 22, Gujarat, India).

![React](https://img.shields.io/badge/React-19.x-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)
![Leaflet](https://img.shields.io/badge/Leaflet-preferCanvas-10b981?logo=leaflet)
![Recharts](https://img.shields.io/badge/Recharts-Analytics-f59e0b)
![DigiLocker](https://img.shields.io/badge/DigiLocker-eKYC_Certified-0284c7)
![Vercel](https://img.shields.io/badge/Deploy-Vercel_Ready-black?logo=vercel)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser. Configured with `{ host: '0.0.0.0', port: 5173 }` for local network testing.

### 3. Production Build
```bash
npm run build
```
Generates a minified, tree-shaken, production-ready bundle in the `dist/` directory, ready for zero-configuration deployment to **Vercel**, **Netlify**, or **Cloudflare Pages**.

### 4. Code Quality & Linting
```bash
npm run lint
# or: npx oxlint src/
```

---

## 🏛️ System Architecture & Key Modules

### 1. Top Header & Interactive Officer Profile Switcher ([`HeaderNav.jsx`](src/components/HeaderNav.jsx))
- **Civic Branding & Coordinates**: "LandStack OneView" civic badge with live location indicator: `Gandhinagar Sector 21 / Sector 22 | 23.2156° N, 72.6369° E`.
- **5 Centered Navigation Tabs**:
  1. **GIS OneView Map** (`#nav-tab-map`)
  2. **Officer Control Panel** (`#nav-tab-officer`)
  3. **AI Intelligence Hub** (`#nav-tab-ai-hub`) with ✨ Sparkles badge
  4. **eKYC Verification Hub** (`#nav-tab-ekyc`)
  5. **Audit Logs** (`#nav-tab-audit`)
- **Interactive RBAC Switcher**: Live switching between 4 designated government officers:
  - 👨‍💼 **Tehsildar / Revenue Officer**: Rajesh Kumar (`#8821`)
  - 🏗️ **Town Planning & Municipal Officer**: Priya Sharma (`#4402`)
  - 📊 **District Collector & Magistrate**: Aman Verma (`#1001`)
  - ⚙️ **System Administrator**: IT Operations Desk (`#0099`)

### 2. Prominent Centered Cadastral Search Bar ([`App.jsx`](src/App.jsx))
- Positioned in `max-w-2xl mx-auto` beneath the navigation bar.
- Instant search across **ULPINs** (e.g. `GJ06GND000101`, `MH26DISP000008`), **Survey/Khasra Numbers** (e.g. `142/1`, `102/GIDC`), **Applicant/Citizen Names**, **Sectors**, and **Land Categories**.
- Selecting a match automatically:
  - Centers the GIS camera on that plot,
  - Traces the parcel boundary with an animated glowing perimeter outline,
  - Opens the **Property Dossier Modal**.

### 3. Cadastral GIS OneView Map with No-API-Key Basemap Switcher ([`GandhinagarGisMap.jsx`](src/components/GandhinagarGisMap.jsx))
- Centered over Gandhinagar, Gujarat (`lat: 23.2156, lng: 72.6369`) using Leaflet with `preferCanvas={true}` for maximum rendering performance.
- **Top-Right Basemap Layer Switcher** (No API Key Required):
  1. **Street / Vector View**: OpenStreetMap tiles (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)
  2. **Satellite View**: ArcGIS World Imagery (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}`)
  3. **Clean Positron View**: CartoDB Positron Light (`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`)
- **12+ Realistic Gandhinagar Parcel Polygons** styled by land category:
  - 🟢 **Agricultural Land**: Soft Emerald Green
  - 🟣 **Industrial Land**: Soft Purple
  - 🟡 **Utility Infrastructure Land**: Soft Amber
  - 🔵 **Residential Land**: Soft Sky Blue
- **Centered KPI Summary Bar** (Top of Map Canvas):
  - **TOTAL PARCELS: 12**
  - **TOTAL LAND AREA: 48,250 sq. m (11.9 Acres)**
  - **AI RISK FLAGS: 3**
  - **COMPLETED MUTATIONS: 4**

### 4. Centered "Property Dossier" Modal ([`PropertyDossierModal.jsx`](src/components/PropertyDossierModal.jsx))
- Centered viewport modal presenting integrated spatial & governance geometry:
  - **Spatial & Land Data**: Bhu-Aadhaar (ULPIN), Land Category, Parcel Area (sq. m & Acres), Survey / Khasra No, Coordinates.
  - **Ownership Data**: Recorded Holder Name, Mobile Number, Aadhaar Linkage Status (`Linked & Verified`).
  - **Registration & Fiscal**: Purchase Date, Transaction Value (₹), Previous Owner Name, Property Tax Status, Encumbrance Status.
  - **AI Risk Card**: Interactive status badge (🔴 High Encroachment Risk, 🟡 Medium Warning, or 🟢 Low Risk) with button to open the AI Encroachment Inspector.
  - **Action Bar**:
    - `[ Initiate Mutation / Transfer ]`
    - `[ Run AI Encroachment Scan ]`
    - `[ Verify via DigiLocker eKYC ]`

### 5. AI Satellite Encroachment Analysis & Risk Detection ([`AiEncroachmentModal.jsx`](src/components/AiEncroachmentModal.jsx))
- **Interactive Split-View Satellite Analysis**:
  - Baseline imagery (**2022**) vs High-Res Orthomosaic (**2026**).
  - Interactive split slider (0% to 100%) and toggleable side-by-side mode.
  - Highlights statutory boundary vs illegal spatial encroachment (e.g., *"Boundary Shift Detected: 2.4m onto Public Reserve"*).
  - Multi-spectral telemetry attribution (`ISRO Cartosat-3 (0.28m) & Sentinel-2 Stream`) with `94.2% AI Confidence Score`.
- **Decision Controls**:
  - `[ 📄 Generate AI Field Inspection Report ]`: Generates technical field survey dossier for rover units.
  - `[ ⚠️ Issue Digital Encroachment Notice ]`: Issues statutory notice under Section 61 with ₹25,000/day penalty via DigiLocker e-Notice Gateway and logs into immutable Audit Ledger.

### 6. Government Control Center & Mutation Workflow ([`OfficerControlPanel.jsx`](src/components/OfficerControlPanel.jsx))
- **Application Queue**: High-density operational table displaying Application ID, ULPIN, Land Category, Applicant Name, Submission Date, AI Risk Level & Automated Scanners, Pre-Verification Checks, Status, and Action Controls.
- **Quasi-Judicial Action Controls**:
  - 🟢 **Approve**: Gated by DigiLocker eKYC $\to$ updates docket to Approved $\to$ launches celebratory "WELCOME HOME!" popup $\to$ direct printable 7/12 RoR PDF certificate generation.
  - 🔴 **Reject**: Opens mandatory Rejection Modal with statutory category and officer comment $\to$ writes to immutable audit ledger.
  - 🔵 **Review / Hold**: Flags application for physical field demarcation survey.
  - 🛰️ **AI Inspector**: Opens satellite encroachment modal.
- **Executive Analytics Dashboard**:
  - Monthly Mutation Settlement Rates (Bar Chart: Received vs Approved vs Rejected)
  - Land Use Category Distribution (Pie Chart: Agricultural, Residential, Industrial, Utility)
  - Revenue Collection Trends (Area Chart: e-Stamp Duty vs Property Tax)
- **Interoperability API Health Monitor**: Live health status for 5 gateways: AnyRoR, e-Garvi, CERSAI, GMC Municipal, and GUVNL Grid.
- **Immutable Audit Trail ([`AuditTrail.jsx`](src/components/AuditTrail.jsx))**: SHA-256 cryptographic audit logs capturing `[Timestamp | Officer Profile | Action Taken | ULPIN | Rejection Comment / eKYC Hash]`.

---

## 📁 Repository Structure

```text
land-stack-gov-portal/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── HeaderNav.jsx             # Top header bar, civic badge, profile switcher
│   │   ├── Header.jsx                # Header component alias
│   │   ├── GandhinagarGisMap.jsx     # Leaflet GIS engine (preferCanvas) & tile switcher
│   │   ├── MapView.jsx               # MapView component alias
│   │   ├── KpiMetricsBar.jsx         # 4-card Material KPI bar
│   │   ├── PropertyDossierModal.jsx  # Property Dossier with AI Risk Card & Action Bar
│   │   ├── DossierModal.jsx          # DossierModal component alias
│   │   ├── OfficerControlPanel.jsx   # Government queue, action controls, Recharts
│   │   ├── GovDashboard.jsx          # GovDashboard component alias
│   │   ├── AiEncroachmentModal.jsx   # Split-view satellite inspector (2022 vs 2026)
│   │   ├── AIInspectorModal.jsx      # AIInspectorModal component alias
│   │   ├── AiIntelligenceHub.jsx     # AI surveillance feeds & encroachment dockets
│   │   ├── DigiLockerEkycModal.jsx   # 3-step DigiLocker eKYC authentication
│   │   ├── eKYCModal.jsx             # eKYCModal component alias
│   │   ├── CelebratoryModal.jsx      # Post-mutation "WELCOME HOME!" confetti modal
│   │   ├── RorCertificateModal.jsx   # Printable official 7/12 RoR certificate
│   │   ├── RoRDocumentModal.jsx      # RoRDocumentModal component alias
│   │   ├── RejectionModal.jsx        # Mandatory rejection comment & category modal
│   │   ├── MutationTransferModal.jsx # Conveyance transfer initiation modal
│   │   ├── EkycHub.jsx               # Standalone eKYC verification hub
│   │   ├── AuditTrail.jsx            # Immutable audit logs ledger
│   │   └── AuditLogTable.jsx         # AuditLogTable component alias
│   ├── data/
│   │   ├── gandhinagarParcels.js     # 12 Gandhinagar parcels, queue, incidents, basemaps
│   │   ├── gandhinagarParcels.geojson# RFC 7946 GeoJSON FeatureCollection
│   │   └── mockData.js               # Analytics trends & interoperability gateways
│   ├── App.jsx                       # Root routing, search bar, state & modal orchestration
│   ├── main.jsx                      # React 19 entrypoint
│   └── index.css                     # Tailwind CSS, Leaflet styles & print media rules
├── index.html                        # HTML template with Google Fonts & Leaflet CSS
├── package.json                      # Dependencies and build scripts
├── vite.config.js                    # Vite configuration with { host: '0.0.0.0', port: 5173 }
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
├── .gitignore                        # Standard ignore rules
└── README.md                         # Documentation
```

---

## 🌐 Deploy to Vercel

This repository is structured for direct deployment to [Vercel](https://vercel.com):

1. Push this repository to GitHub.
2. In the Vercel Dashboard, click **New Project** and import your repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**. Zero configuration required.
