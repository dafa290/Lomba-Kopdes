# Spec: RentengPay (AI-Powered Supply Chain & Cooperative Growth Platform)

## 1. Objective
RentengPay is designed to solve the structural stagnancy of Koperasi Desa/Kelurahan Merah Putih (KDKMP). By bridging the gap between Stage 1 (*Digitize* - basic recording) and Stage 2 (*Digitalize* - connected workflows), RentengPay converts cooperatives from mere administrative entities into **Supply Chain Aggregators** that connect local farmers' downstream products (*hilirisasi*) directly with high-volume, guaranteed buyers, specifically the national **Free Nutritious Meal Program Kitchens (SPPG - Dapur Program Makan Bergizi Gratis)**.

### Strategic Impact Goals (Jury Weight: 1.5)
Using the official formula: **Who is helped + What changes + By how much + How long**
* **Farmer Income Boost**: 300+ village members/farmers will see their crop margin increase from **15% to over 60%** within **90 days** by bypassing middlemen and supplying directly to SPPG.
* **Cooperative Money Velocity**: KDKMP transaction volume will expand by **300%** within **6 months** by managing the daily supply chain of SPPG.
* **Cooperative Business Sustainability**: Generates a sustainable, transparent service fee of **2% - 5%** per transaction, funding KUD operations without burdening members.

---

## 2. Tech Stack
* **Frontend**: Next.js 14.2.3 (App Router), React 18, Tailwind CSS 3, Lucide React, Framer Motion (for premium micro-animations)
* **API Handlers & Storage**: Next.js API Route Handlers with a lightweight JSON file database (`src/lib/db.json`) representing the local cooperative data and simulated SIMKOPDES bridge.
* **AI Service Integration**: Google Gemini 1.5 Flash (REST API calls) for the virtual WhatsApp assistant "Bu Kanti" persona.

---

## 3. Commands
* **Dev Server**: `npm run dev` (starts server on `http://localhost:3000`)
* **Build App**: `npm run build`
* **Production Start**: `npm run start`
* **Linting**: `npm run lint`

---

## 4. Project Structure
```
.agents/
  └── skills.json         → Custom agent skills configuration
docs/
  └── spec_rentengpay.md  → This specification document
mentoring_rule/           → Mentor guidance material (macro-economy, AI, coop modern)
rule/                     └── Hackathon rules and TOR
src/
  ├── app/
  │   ├── api/            → API Route Handlers (Members, Loans, Commodity, Chat)
  │   ├── globals.css     → Base design system CSS (premium color tokens)
  │   ├── layout.tsx      → App shell layout
  │   └── page.tsx        → Main dashboard view
  ├── components/         → Interactive UI sections
  │   ├── AdminDashboard.tsx  → "Kotak Kuning" Human-in-the-loop portal for managers
  │   ├── AiConsultant.tsx    → WhatsApp Simulator for members
  │   ├── CommodityTracker.tsx → Live commodity price feed
  │   └── LoanCalculator.tsx   → Interactive downstream pricing engine
  └── lib/
      ├── db.ts           → Lightweight JSON DB wrapper (SIMKOPDES mock)
      └── utils.ts        → Tailwind merging utility
```

---

## 5. Code Style
### Conventions
* **Component Design**: Functional components with strict TypeScript types (`src/types.ts`).
* **Styling**: Tailwind utility classes backed by CSS custom properties in `globals.css` (sage green, beige, dark charcoal). Avoid plain primary colors.
* **Animations**: All page shifts, drawer slides, and card hovers must use Framer Motion transitions rather than default state changes to prevent "AI-slop" feel.

```tsx
// Example Premium Framer Motion Component
import { motion } from 'framer-motion';

export const PremiumCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(44, 53, 47, 0.08)" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/80 backdrop-blur-md border border-art-charcoal/10 p-6 rounded-3xl"
    >
      <h3 className="font-serif italic text-lg text-art-charcoal mb-2">{title}</h3>
      {children}
    </motion.div>
  );
};
```

---

## 6. Functional Architecture & Policy Frameworks

### A. WhatsApp Conversational Interface (Member Front-End)
* **Digital Opt-In Consent (UU PDP Compliance - UU No. 27/2022)**: The AI assistant **cannot** access or process any member NIK or data until the user sends "SETUJU" to a clear privacy consent message.
* **Conversational Scope**: Automatically resolves **70-80%** of repetitive inquiries (savings balance, payout schedules, pricing checks) using localized Indonesian ("Bu Kanti" warm, helpful persona). Unresolved queries are flagged to the manager.
* **AI Pricing Engine (Hilirisasi)**: Members can input raw crop supply capacities and calculate local production cost (HPP) in-chat to guarantee their 60%+ margins before submitting to Koperasi.

### B. "Kotak Kuning" Admin Dashboard (Manager Back-End)
* **Human-in-the-Loop (Anti-Bias & Governance)**: The AI is **forbidden** from making final financial/order decisions. It splits and matches supply orders autonomously, but highlights them in a **Yellow Box** (Kotak Kuning) on the dashboard for a human manager (e.g., "Bu Sari") to verify and approve.
* **Offline-First & Low-Bandwidth**: The Next.js dashboard is built with a lightweight footprint. Actions like clicking "Approve" cache locally during signal drops and auto-synchronize back to the server once the connection is restored.
* **Interoperability (SPBE Compliance - Perpres 82/2023)**: APIs are designed to import/export standard JSON data compatible with the national `SIMKOPDES` endpoints.

---

## 7. Data Model (`src/lib/db.json` Schema)
The database structure is optimized for transaction processing and matching:

1. **`tb_koperasi_kdkmp`**: Stores cooperative status, cash balance, and modernization level.
2. **`tb_sppg`**: Stores local Free Nutritious Meal kitchen nodes, addresses, and daily capacity.
3. **`tb_anggota_warga`**: Stores member profile, phone numbers, UU PDP opt-in flag, NIK, and category.
4. **`tb_produksi_harian`**: Tracks daily actual crop production capacity from farmers.
5. **`tb_kebutuhan_sppg`**: Stores daily purchase orders submitted by the SPPG kitchens.
6. **`tb_ai_matching`**: Stores matching scoring matrix calculated by the multi-pass reasoning engine.
7. **`tb_ai_blast_log`**: Logs WhatsApp blast bids and member responses.
8. **`tb_approval_pengurus`**: Audit log of managers' approvals (Human-in-the-loop).
9. **`tb_transaksi`**: Ledger of completed supply contracts, values, and the 2-5% service fees.
10. **`tb_ai_learning_log`**: Feedback logs to continuously optimize matching scoring accuracy.

---

## 8. Success Criteria
- [ ] Next.js app starts with 0 compilation errors or TypeScript warnings.
- [ ] No `404` errors on frontend dashboard when interacting with calculators, prices, members, or AI assistant.
- [ ] Bot chat correctly displays the UU PDP opt-in consent sequence.
- [ ] Form submissions write correctly to the JSON file database and persist on page reload.
- [ ] Custom design system tokens are mapped to `index.css` / `globals.css` with 0 generic bright color schemes.
- [ ] Dashboard is fully responsive on narrow screens (simulating a low-end phone screen of a village admin).

---

## 9. Open Questions
* **Gemini API Key Handling**: For local development and hackathon demos, should we default to a mock response mode if the Gemini API Key environment variable is missing, to ensure a seamless presentation?
* **Transaction Fee Cap**: Is the 2-5% service fee structure completely aligned with regional Yogyakarta cooperative bylaws, or should it be configurable?
