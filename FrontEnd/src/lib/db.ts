import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/lib/db.json');

export interface Koperasi {
  id_koperasi: string;
  id_desa: string;
  nama_koperasi: string;
  tingkat_modernisasi: number;
  saldo_kas: number;
  status: string;
}

export interface Sppg {
  id_sppg: string;
  id_koperasi: string;
  nama_sppg: string;
  alamat: string;
  kapasitas_harian: number;
  status: string;
}

export interface AnggotaWarga {
  id_anggota: string;
  id_koperasi: string;
  nama: string;
  no_whatsapp: string;
  kategori_usaha: string;
  komoditas: string;
  opt_in_consent: boolean;
  status: string;
}

export interface ProduksiHarian {
  id_produksi: string;
  id_anggota: string;
  tanggal: string;
  jumlah_produksi: number;
  jumlah_tersedia: number;
  status: string;
}

export interface KebutuhanSppg {
  id_order: string;
  id_sppg: string;
  produk: string;
  jumlah: number;
  harga_maksimal: number;
  status: string;
}

export interface AiMatching {
  id_matching: string;
  id_order: string;
  id_anggota: string;
  score: number;
  rekomendasi_ai: string;
  confidence: number;
  allocated_amount: number;
}

export interface AiBlastLog {
  id_blast: string;
  id_matching: string;
  pesan: string;
  status_kirim: string;
  respon?: string;
  no_whatsapp: string;
}

export interface ApprovalPengurus {
  id_approval: string;
  id_order: string;
  details: string;
  approved_by?: string;
  status: string;
  catatan?: string;
  allocations: Array<{
    id_anggota: string;
    nama: string;
    amount: number;
  }>;
}

export interface Transaksi {
  id_transaksi: string;
  id_order: string;
  id_supplier: string;
  nilai_transaksi: number;
  service_fee: number;
  nilai_supplier: number;
  status: string;
  tanggal: string;
}

export interface AiLearningLog {
  id_log: string;
  id_transaksi: string;
  hasil_rekomendasi: string;
  hasil_aktual: string;
  feedback_ai: string;
}

import { Loan, CommodityPrice } from '@/types';

export interface DatabaseSchema {
  tb_koperasi_kdkmp: Koperasi[];
  tb_sppg: Sppg[];
  tb_anggota_warga: AnggotaWarga[];
  tb_produksi_harian: ProduksiHarian[];
  tb_kebutuhan_sppg: KebutuhanSppg[];
  tb_ai_matching: AiMatching[];
  tb_ai_blast_log: AiBlastLog[];
  tb_approval_pengurus: ApprovalPengurus[];
  tb_transaksi: Transaksi[];
  tb_ai_learning_log: AiLearningLog[];
  tb_loans: Loan[];
  tb_commodity_prices: CommodityPrice[];
}

export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      // Re-create initial DB if missing
      return {
        tb_koperasi_kdkmp: [],
        tb_sppg: [],
        tb_anggota_warga: [],
        tb_produksi_harian: [],
        tb_kebutuhan_sppg: [],
        tb_ai_matching: [],
        tb_ai_blast_log: [],
        tb_approval_pengurus: [],
        tb_transaksi: [],
        tb_ai_learning_log: [],
        tb_loans: [],
        tb_commodity_prices: [],
      };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error("Read DB Error, returning empty state:", error);
    return {} as DatabaseSchema;
  }
}

export function writeDb(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Write DB Error:", error);
  }
}

// Simulated Kimi Thinking Multi-Pass Matching
export function runAiMatching(id_order: string): { success: boolean; message: string; approvalId?: string } {
  const db = readDb();
  const order = db.tb_kebutuhan_sppg.find(o => o.id_order === id_order);
  if (!order) {
    return { success: false, message: "Order tidak ditemukan" };
  }

  // Pass 1: Intake & Availability check
  const targetCommodity = order.produk; // e.g. "Tempe", "Telur"
  const potentialSuppliers = db.tb_anggota_warga.filter(
    a => a.komoditas.toLowerCase() === targetCommodity.toLowerCase() && a.status === "Aktif"
  );

  if (potentialSuppliers.length === 0) {
    order.status = "Gagal (Tidak ada supplier)";
    writeDb(db);
    return { success: false, message: `Tidak ditemukan supplier untuk komoditas ${targetCommodity}` };
  }

  // Filter for opted-in suppliers (UU PDP check)
  const consentedSuppliers = potentialSuppliers.filter(s => s.opt_in_consent);
  
  // Get active capacities
  const availableStock = consentedSuppliers.map(s => {
    const prod = db.tb_produksi_harian.find(p => p.id_anggota === s.id_anggota);
    return {
      supplier: s,
      available: prod ? prod.jumlah_tersedia : 0,
    };
  }).filter(item => item.available > 0);

  const totalAvailable = availableStock.reduce((acc, curr) => acc + curr.available, 0);

  if (totalAvailable < order.jumlah) {
    // Check if we have non-consented members that we could ask
    const nonConsentedCount = potentialSuppliers.length - consentedSuppliers.length;
    order.status = "Gagal (Kurang kapasitas)";
    writeDb(db);
    return { 
      success: false, 
      message: `Total kapasitas tersedia (${totalAvailable} kg) kurang dari pesanan (${order.jumlah} kg). ${nonConsentedCount} petani potensial belum mengaktifkan persetujuan UU PDP.` 
    };
  }

  // Pass 2: Reflection & Fractional Splitting
  let neededAmount = order.jumlah;
  const allocations: Array<{ id_anggota: string; nama: string; amount: number }> = [];

  // Sort available suppliers by score/history (simulated)
  for (const item of availableStock) {
    if (neededAmount <= 0) break;
    const allocated = Math.min(neededAmount, item.available);
    allocations.push({
      id_anggota: item.supplier.id_anggota,
      nama: item.supplier.nama,
      amount: allocated,
    });
    neededAmount -= allocated;
  }

  // Pass 3: Risk Mitigation & Blast queuing
  const approvalId = `AP-${Date.now()}`;
  const approvalItem: ApprovalPengurus = {
    id_approval: approvalId,
    id_order: id_order,
    details: `Pecah order untuk Dapur SPPG: ${order.jumlah} kg ${targetCommodity}. Dibagi secara fraksional kepada ${allocations.length} produsen desa terverifikasi.`,
    status: "Menunggu Pengurus",
    allocations: allocations,
  };

  db.tb_approval_pengurus.push(approvalItem);

  // Generate Matching rows
  allocations.forEach(alloc => {
    const matchingId = `M-${Math.random().toString(36).substr(2, 9)}`;
    db.tb_ai_matching.push({
      id_matching: matchingId,
      id_order: id_order,
      id_anggota: alloc.id_anggota,
      score: 9.2,
      rekomendasi_ai: `Kimi Thinking split order: salurkan ${alloc.amount} kg dari total kebutuhan ${order.jumlah} kg.`,
      confidence: 0.95,
      allocated_amount: alloc.amount
    });

    // Queue WhatsApp blast logs (Pass 3 & 4 WA simulation)
    const blastId = `B-${Math.random().toString(36).substr(2, 9)}`;
    const member = db.tb_anggota_warga.find(a => a.id_anggota === alloc.id_anggota);
    db.tb_ai_blast_log.push({
      id_blast: blastId,
      id_matching: matchingId,
      pesan: `Pemberitahuan Tender RentengPay: Halo ${alloc.nama}, Dapur SPPG butuh suplai harian ${targetCommodity}. Anda direkomendasikan menyuplai sebanyak *${alloc.amount} kg* seharga Rp${order.harga_maksimal}/kg. Balas *SETUJU* untuk konfirmasi.`,
      status_kirim: "Terkirim",
      no_whatsapp: member ? member.no_whatsapp : "081234567890"
    });
  });

  order.status = "Proses Matching";
  writeDb(db);

  return { 
    success: true, 
    message: `Pencocokan berhasil. Menunggu persetujuan pengurus di Kotak Kuning.`,
    approvalId: approvalId 
  };
}

// Complete the transaction (Pass 4: Execute & Ledger fee cut)
export function approveOrderMatching(id_approval: string, managerName: string): { success: boolean; message: string } {
  const db = readDb();
  const approval = db.tb_approval_pengurus.find(a => a.id_approval === id_approval);
  if (!approval) {
    return { success: false, message: "Approval item tidak ditemukan" };
  }

  if (approval.status !== "Menunggu Pengurus") {
    return { success: false, message: `Status approval ini sudah: ${approval.status}` };
  }

  const order = db.tb_kebutuhan_sppg.find(o => o.id_order === approval.id_order);
  if (!order) {
    return { success: false, message: "Order terkait tidak ditemukan" };
  }

  // Execute transaction logic for each split allocation
  approval.allocations.forEach(alloc => {
    const itemPrice = order.harga_maksimal;
    const totalValue = alloc.amount * itemPrice;
    
    // Service Fee Cut (3% transparency rate)
    const feeRate = 0.03;
    const serviceFee = totalValue * feeRate;
    const netToSupplier = totalValue - serviceFee;

    const txId = `TX-${Math.random().toString(36).substr(2, 9)}`;
    db.tb_transaksi.push({
      id_transaksi: txId,
      id_order: order.id_order,
      id_supplier: alloc.id_anggota,
      nilai_transaksi: totalValue,
      service_fee: serviceFee,
      nilai_supplier: netToSupplier,
      status: "Disetujui",
      tanggal: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })
    });

    // Deduct stock from daily production
    const prod = db.tb_produksi_harian.find(p => p.id_anggota === alloc.id_anggota);
    if (prod) {
      prod.jumlah_tersedia = Math.max(0, prod.jumlah_tersedia - alloc.amount);
    }

    // Set WA responses as approved
    const matchRow = db.tb_ai_matching.find(m => m.id_order === order.id_order && m.id_anggota === alloc.id_anggota);
    if (matchRow) {
      const blastLog = db.tb_ai_blast_log.find(b => b.id_matching === matchRow.id_matching);
      if (blastLog) {
        blastLog.respon = "SETUJU";
      }
    }
  });

  // Update statuses
  approval.status = "Disetujui";
  approval.approved_by = managerName;
  order.status = "Selesai";

  // Add a ledger transaction fee to cooperative cash
  const totalOrderValue = approval.allocations.reduce((acc, curr) => acc + (curr.amount * order.harga_maksimal), 0);
  const coop = db.tb_koperasi_kdkmp[0];
  if (coop) {
    coop.saldo_kas += totalOrderValue * 0.03; // Cooperative gains the 3% service fee
  }

  writeDb(db);
  return { success: true, message: `Persetujuan berhasil diproses. Saldo kas koperasi bertambah.` };
}
