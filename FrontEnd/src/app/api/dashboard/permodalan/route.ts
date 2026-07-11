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

    const pinjamanRaw = await prisma.pinjaman.findMany({
      where: dateFilter,
      include: {
        anggota: {
          include: {
            kelompok: {
              include: {
                anggota: true
              }
            }
          }
        },
        votingRenteng: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const data = pinjamanRaw.map((p: any) => {
      const kelompok = p.anggota?.kelompok;
      const totalGroupMembers = kelompok?.anggota?.length || 1;
      // Exclude the borrower from the voting quorum if needed, but let's just use totalGroupMembers for now.
      // Usually, everyone in the group except the borrower votes, but maybe the borrower votes too.
      
      const setujuCount = p.votingRenteng.filter((v: any) => v.status === 'setuju').length;
      const tolakCount = p.votingRenteng.filter((v: any) => v.status === 'tolak').length;
      
      // Calculate progress
      const progress = Math.round((setujuCount / totalGroupMembers) * 100);

      return {
        id: `L${p.id.toString().padStart(3, '0')}`,
        name: p.anggota?.nama || 'Unknown',
        phone: p.anggota?.noWhatsapp || '-',
        amount: Number(p.jumlah),
        type: p.skema || 'yarnen',
        tenure: 6, // Default tenure as it's not in schema
        status: p.status === 'pending' ? 'Menunggu' : (p.status === 'disetujui' ? 'Disetujui' : 'Ditolak'),
        date: p.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        purpose: p.tujuan || 'Modal Usaha',
        quorum: {
          setuju: setujuCount,
          total: totalGroupMembers,
          progress: progress
        }
      };
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching pinjaman:", error);
    return NextResponse.json({ error: "Failed to fetch pinjaman" }, { status: 500 });
  }
}
