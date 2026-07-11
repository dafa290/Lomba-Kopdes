import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateQuery = searchParams.get('date');

    let dateFilter = {};
    if (dateQuery) {
      const parsedDate = new Date(dateQuery);
      parsedDate.setHours(23, 59, 59, 999);
      dateFilter = { createdAt: { lte: parsedDate } };
    }

    const kasRaw = await prisma.bukuKas.findMany({
      where: dateFilter,
      orderBy: { tanggal: 'desc' },
      take: 50 // Limit for dashboard view
    });

    const kasData = kasRaw.map(k => ({
      id: k.id.toString(),
      date: k.tanggal.toISOString().split('T')[0],
      uraian: k.uraian,
      tipeMutasi: k.tipeMutasi,
      nominal: Number(k.nominal),
      saldoSetelahnya: Number(k.saldoSetelahnya)
    }));

    return NextResponse.json({ data: kasData });
  } catch (error) {
    console.error("Error fetching buku kas:", error);
    return NextResponse.json({ error: "Failed to fetch buku kas" }, { status: 500 });
  }
}
