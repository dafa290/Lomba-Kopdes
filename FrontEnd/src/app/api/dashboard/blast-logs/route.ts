import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const logs = await prisma.aiBlastLog.findMany({
      include: {
        matching: {
          include: {
            anggota: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const formattedLogs = logs.map(l => ({
      waktuKirim: l.createdAt.toISOString(),
      namaPenerima: l.matching?.anggota?.nama || 'Unknown',
      nomorWhatsapp: l.matching?.anggota?.noWhatsapp || '-',
      isiTemplateChat: l.pesan,
      statusBlast: l.statusKirim
    }));

    return NextResponse.json({ data: formattedLogs });
  } catch (error) {
    console.error("Error fetching blast logs:", error);
    return NextResponse.json({ error: "Failed to fetch blast logs" }, { status: 500 });
  }
}
