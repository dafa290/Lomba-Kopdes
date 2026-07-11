import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const approvalsRaw = await prisma.approvalPengurus.findMany({
      include: {
        blast: {
          include: {
            matching: {
              include: {
                anggota: true,
                order: true
              }
            }
          }
        }
      }
    });

    const approvals = approvalsRaw.map(a => {
      const m = a.blast?.matching;
      return {
        id_approval: a.id.toString(),
        status: a.status === 'pending' ? 'Menunggu Pengurus' : (a.status === 'approved' ? 'Disetujui' : 'Ditolak'),
        details: `Order: ${m?.order?.produk || 'Unknown'} - ${m?.order?.jumlah || 0} ${m?.order?.satuan || 'kg'}`,
        allocations: [
          {
            nama: m?.anggota?.nama || 'Supplier Tunggal',
            amount: m?.order?.jumlah || 0
          }
        ]
      };
    });

    return NextResponse.json({ approvals });
  } catch (error) {
    console.error("Error fetching approvals:", error);
    return NextResponse.json({ error: "Failed to fetch approvals" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action, id_approval } = await request.json();
    if (action === 'approve' && id_approval) {
      await prisma.approvalPengurus.update({
        where: { id: parseInt(id_approval) },
        data: { status: 'approved' }
      });
      return NextResponse.json({ message: "Approval successful" });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating approval:", error);
    return NextResponse.json({ error: "Failed to update approval" }, { status: 500 });
  }
}
