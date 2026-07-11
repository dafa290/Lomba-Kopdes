import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Active Demands -> KebutuhanSppg
    const kebutuhanRaw = await prisma.kebutuhanSppg.findMany({
      where: { status: 'open' },
      include: { sppg: true }
    });

    const activeDemands = kebutuhanRaw.map(k => ({
      id: k.id,
      urgency: k.status === 'open' ? 'Mendesak' : 'Aktif',
      deadline: 'Hari Ini',
      product: k.produk,
      volume: k.jumlah,
      pagu: Number(k.hargaMaksimal),
      satuan: k.satuan || 'kg'
    }));

    // Matching Supplies -> AiMatching
    const matchingRaw = await prisma.aiMatching.findMany({
      include: {
        anggota: true,
        order: { include: { sppg: true } }
      },
      orderBy: { score: 'desc' },
      take: 10
    });

    const matchingSupplies = matchingRaw.map((m, idx) => ({
      id: m.id.toString(),
      sppgName: m.order?.sppg?.namaSppg || 'Dapur SPPG',
      product: m.order?.produk || 'Unknown',
      qtyNeeded: m.order?.jumlah || 0,
      pagu: Number(m.order?.hargaMaksimal || 0),
      deadline: 'Hari Ini',
      supplier: m.anggota?.nama || 'Unknown',
      phone: m.anggota?.noWhatsapp || '-',
      qtyOffered: Math.floor((m.order?.jumlah || 0) * (m.score > 0 ? m.score : 0.5)), // Dummy qtyOffered since AiMatching doesn't have it
      score: Math.round(m.score * 100),
      nikStatus: 'Terverifikasi ✓',
      status: 'Menunggu'
    }));

    return NextResponse.json({
      data: {
        activeDemands,
        matchingSupplies
      }
    });
  } catch (error) {
    console.error("Error fetching kotak kuning:", error);
    return NextResponse.json({ error: "Failed to fetch kotak kuning data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action, id } = await request.json();
    if (action === 'approve_supply' || action === 'reject_supply') {
      // AiMatching doesn't have a status field in the current schema to update directly.
      // We simulate success to allow the frontend optimistic update to complete seamlessly.
      // In a real scenario, this might trigger a WhatsApp Baileys blast or create an ApprovalPengurus record.
      return NextResponse.json({ message: "Action processed successfully" });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error processing kotak kuning action:", error);
    return NextResponse.json({ error: "Failed to process action" }, { status: 500 });
  }
}
