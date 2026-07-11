import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const produks = await prisma.produk.findMany({
      take: 10,
      orderBy: { updatedAt: 'desc' }
    });

    const prices = produks.map(p => ({
      id: p.id.toString(),
      item: p.namaProduk,
      price: Number(p.nilaiTransaksi) || 0,
      change: "+0.0%", // Hardcoded change since we don't track historical changes in this table yet
      trend: "stable",
      info: `Volume: ${p.volume}kg`
    }));

    return NextResponse.json({ prices });
  } catch (error) {
    console.error("Error fetching komoditas:", error);
    return NextResponse.json({ error: "Failed to fetch komoditas" }, { status: 500 });
  }
}
