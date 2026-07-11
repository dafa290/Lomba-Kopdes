# Product Requirements Document (PRD): RentengPay

## 1. Executive Summary & Objective

### A. Vision
RentengPay is an **AI-Powered Supply Chain & Cooperative Growth Platform** designed to transform Koperasi Desa/Kelurahan Merah Putih (KDKMP) from Level 1 modernization (basic digital recording) into proactive, Level 3/4 **Business Intelligence Command Centers**. 

RentengPay connects local downstream food production (*hilirisasi*) directly to a high-volume, guaranteed buyer: the national **Free Nutritious Meal Program Kitchens (SPPG - Dapur Program Makan Bergizi Gratis)**. It leverages conversational AI over WhatsApp for village members and a lightweight, offline-first dashboard for cooperative managers.

### B. Hackathon Theme Alignment
* **Selected Theme**: Tema 1 - **"Peningkatan Usaha Koperasi Melalui Teknologi Digital"** (Peningkatan Volume Usaha Koperasi).
* **Challenge Question Addressed**: How to match village production potential with market demand and connect cooperatives with the right buyers/offtakers (Dapur SPPG) while increasing downstream product value.

### C. Measured Strategic Impact Goals (Evaluation Weight: 20% / Impact Weight: 1.5)
Using the official Kemenkop formula: **Who is helped + What changes + By how much + How long**
* **Farmer Income Boost**: 300+ village members will see their crop margin increase from **15% to over 60%** within **90 days** by supplying processed downstream foods (e.g., tempeh, eggs, milled rice) directly to SPPG.
* **Cooperative Money Velocity**: KDKMP transaction volume will expand by **300%** within **6 months** by managing the daily supply contracts of SPPG.
* **Financial Sustainability**: Generates a transparent service fee of **2% - 5%** per transaction, funding KUD operations without relying on government subsidies.

---

## 2. Policy & Compliance Frameworks

### A. UU PDP Compliance (UU No. 27/2022)
To secure the trust of village members and meet regulatory requirements:
* The system is forbidden from scanning, indexing, or processing a member's NIK, location, or crop capacity until the member actively replies **"SETUJU"** to a plain-language data privacy notice sent via WhatsApp.

### B. SPBE Interoperability (Perpres 82/2023)
* RentengPay must not act as an isolated data silo.
* Database entities and API schemas are structured to ingest and sync data from the national `SIMKOPDES` system, BPS, and the national SPPG procurement network.

### C. Referensi Link Database & Integrasi Eksternal
Our system simulates data integration with the following official ministry endpoints:
* **Dashboard Nasional**: `https://simkopdes.go.id/pers/dashboard`
* **Data Rapat Anggota (RAT)**: `https://simkopdes.go.id/pers/rat`
* **Transaksi Bisnis**: `https://simkopdes.go.id/pers/transaksi/bisnis`
* **Early Warning System (EWS) Kesehatan**: `https://simkopdes.go.id/pers/ews/kesehatan-keuangan`
* **Kelembagaan Koperasi**: `https://simkopdes.go.id/pers/kelembagaan`
* **Database Hackathon**: `https://s.simkopdes.go.id/database-hackaton`

---

## 3. Product Architecture & Features

### A. WhatsApp Member Client (Low-End Mobile friendly)
Targeted at village residents running budget Android phones (under Rp1.5M) with fluctuating 3G/4G connectivity:
1. **"Bu Kanti" virtual officer**: Resolves **70-80%** of repetitive member inquiries (savings balances, loan application statuses, payout dates) in conversational, warm Indonesian. Complex requests are forwarded to human managers.
2. **AI Pricing Engine (HHP Estimator)**: Allows farmers to type in raw ingredient costs (e.g., soybean prices) via WhatsApp. The AI calculates the cost of production (HPP) and recommends a fair selling price to SPPG that guarantees a 60%+ margin.
3. **Proactive Supply Bidding**: Receives matching notifications and broadcasts from the cooperative about daily SPPG requirements. Members reply with simple numbers (e.g., "Sanggup 50") to participate.

### B. "Kotak Kuning" Web Dashboard (Cooperative Managers)
Targeted at village admins handling administrative duties under low-signal conditions:
1. **"Kotak Kuning" (Human-in-the-Loop Panel)**: The AI is legally and operationally restricted from automatically authorizing transactions or disbursements. The AI generates the supply-demand matching recommendations, but highlights them in a yellow confirmation box. A human manager must verify and click "Setujui" to execute.
2. **Offline-First Synchronization**: Uses local browser cache to store dashboard actions (e.g., approvals, pricing updates) during signal drops. Synchandlers auto-upload transactions to the cloud once network connectivity is restored.
3. **Spatial Aggregation Map**: Displays locations of active farmers and nearby SPPG kitchen hubs to optimize logistics routing, minimizing freight costs.

---

## 4. Multi-Pass Reasoning Engine ("Kimi Thinking")

RentengPay uses an agentic chain-of-thought workflow to dynamically resolve fluctuating agricultural supply constraints:

1. **Pass 1: Intake & Parse**: Parse the SPPG purchase requisition (e.g., "Needs 100kg Tempeh, max budget Rp2.000/piece"). Pull active producer records from `tb_produksi_harian` via mock SIMKOPDES.
2. **Pass 2: Reflection & Order Splitting**: If no single producer satisfies the demand (e.g., Farmer A has 60kg, Farmer B has 50kg), the AI reflects and splits the order fractionally: 60kg to Farmer A, 40kg to Farmer B.
3. **Pass 3: Risk Assessment & Blasting**: Check weather and historical performance metrics. Queue Farmer C (20kg capacity) as standby. Draft and trigger WA blasts to Farmer A and B.
4. **Pass 4: Autonomous Fallback & Self-Correction**: If Farmer B rejects the blast, the AI automatically transfers the remaining 40kg allocation to Farmer C without requiring manual dashboard intervention, reporting the final allocation directly to the "Kotak Kuning" review panel.

---

## 5. Database Schema (Versi Hackathon Ideal)

The database consists of 10 tables structured to capture the entire supply chain, AI reasoning, and audit trail:

### 1. `tb_koperasi_kdkmp` (Pusat Koperasi Desa)
* `id_koperasi` (PK) - VARCHAR
* `id_desa` - VARCHAR
* `nama_koperasi` - VARCHAR
* `tingkat_modernisasi` - INT (L0 to L4)
* `saldo_kas` - DECIMAL
* `status` - VARCHAR

### 2. `tb_sppg` (Dapur MBG / Offtaker)
* `id_sppg` (PK) - VARCHAR
* `id_koperasi` - VARCHAR (FK)
* `nama_sppg` - VARCHAR
* `alamat` - TEXT
* `kapasitas_harian` - DECIMAL
* `status` - VARCHAR

### 3. `tb_anggota_warga` (Supplier / Warga Desa)
* `id_anggota` (PK) - VARCHAR
* `id_koperasi` - VARCHAR (FK)
* `nama` - VARCHAR
* `no_whatsapp` - VARCHAR
* `kategori_usaha` - VARCHAR
* `komoditas` - VARCHAR
* `opt_in_consent` - BOOLEAN (UU PDP check)
* `status` - VARCHAR

### 4. `tb_produksi_harian` (Kapasitas Supply Aktual)
* `id_produksi` (PK) - VARCHAR
* `id_anggota` - VARCHAR (FK)
* `tanggal` - DATE
* `jumlah_produksi` - DECIMAL
* `jumlah_tersedia` - DECIMAL
* `status` - VARCHAR

### 5. `tb_kebutuhan_sppg` (Permintaan Pasar)
* `id_order` (PK) - VARCHAR
* `id_sppg` - VARCHAR (FK)
* `produk` - VARCHAR
* `jumlah` - DECIMAL
* `harga_maksimal` - DECIMAL
* `status` - VARCHAR

### 6. `tb_ai_matching` (Otak Pencocokan Supply-Demand)
* `id_matching` (PK) - VARCHAR
* `id_order` - VARCHAR (FK)
* `id_anggota` - VARCHAR (FK)
* `score` - DECIMAL
* `rekomendasi_ai` - TEXT
* `confidence` - DECIMAL

### 7. `tb_ai_blast_log` (Riwayat WhatsApp AI)
* `id_blast` (PK) - VARCHAR
* `id_matching` - VARCHAR (FK)
* `pesan` - TEXT
* `status_kirim` - VARCHAR
* `respon` - TEXT

### 8. `tb_approval_pengurus` (Human-in-the-Loop Log)
* `id_approval` (PK) - VARCHAR
* `id_blast` - VARCHAR (FK)
* `approved_by` - VARCHAR (Manager ID)
* `status` - VARCHAR
* `catatan` - TEXT

### 9. `tb_transaksi` (Pencatatan Transaksi Supply)
* `id_transaksi` (PK) - VARCHAR
* `id_order` - VARCHAR (FK)
* `id_supplier` - VARCHAR (FK)
* `nilai_transaksi` - DECIMAL
* `service_fee` - DECIMAL (2% to 5%)
* `nilai_supplier` - DECIMAL (Net payment to farmer)
* `status` - VARCHAR

### 10. `tb_ai_learning_log` (Optimasi Agentic AI)
* `id_log` (PK) - VARCHAR
* `id_transaksi` - VARCHAR (FK)
* `hasil_rekomendasi` - TEXT
* `hasil_aktual` - TEXT
* `feedback_ai` - TEXT

---

## 6. Business & Financial Feasibility Model (Nur Kholis Guidance)

KDKMP operates on a dual-purpose framework: Internal Profitability and External Social Benefit.
* **Financial Feasibility (FA)**: The dashboard calculates and displays **NPV** (Net Present Value), **IRR** (Internal Rate of Return), and **Payback Period (PP)** dynamically for new joint village projects. A project is marked viable if NPV > 0 and Benefit-Cost Ratio (BCR) > 1.
* **Economic Feasibility (CBA)**: Evaluates macro benefits to the village ecosystem (EBCR > 1).
* **Sensitivity Scenarios**: The modeling engine tests cooperative financial resilience against 3 guncangan (shocks):
  1. *Revenue drop* (-20% crop failure).
  2. *Operational cost surge* (+15% fertilizer/raw material inflation).
  3. *Default risk* (Non-Performing Loan / NPL up to 10% in savings-loans).
  It calculates **Switching Values** (critical drop boundaries before a project becomes unprofitable).

---

## 7. Success Criteria & Verification Gates
1. **PDP Validation**: Sending messages to the mock WhatsApp API throws an access denied exception unless `opt_in_consent = true` in `tb_anggota_warga`.
2. **Human-in-the-Loop Gate**: Orders cannot move from `tb_ai_matching` to `tb_transaksi` without a record entry in `tb_approval_pengurus` signed by a valid manager credential.
3. **Offline Sync**: Simulate network disconnect during approval: data must write to browser local storage and show "Pending Sync". Reconnecting must trigger automatic DB sync.
4. **Calculators Accuracy**: Downstream pricing inputs must compute HPP accurately and output NPV/IRR correctly.

---

## 8. AI Usage & IP Disclosure (TOR Section J Compliance)
In accordance with Kemenkop Hackathon rules:
* **Ideation & Core Concept**: Synthesized and designed solely by the human participants (RentengPay supply chain model and Kimi Thinking concept).
* **AI Assistance Disclosure**: Generative AI (Antigravity/Gemini) was utilized exclusively as a technical assistant for code generation, syntax debugging, UI component engineering, and generating this technical specification document.
