import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateQuery = searchParams.get('date');
    const idKoperasi = 1; // Assuming primary Koperasi is 1

    let dateFilter = {};
    if (dateQuery) {
      const parsedDate = new Date(dateQuery);
      parsedDate.setHours(23, 59, 59, 999);
      dateFilter = { createdAt: { lte: parsedDate } };
    }
    
    // Get Koperasi
    const koperasi = await prisma.koperasi.findUnique({
      where: { id: idKoperasi }
    });

    // Get total members
    const totalMembers = await prisma.anggota.count({
      where: { idKoperasi, ...dateFilter }
    });

    // Get modal disalurkan (sum of approved loans)
    const approvedLoans = await prisma.pinjaman.aggregate({
      where: { 
        status: 'disetujui',
        ...dateFilter
      },
      _sum: {
        jumlah: true
      }
    });

    // Get service fee (sum of transaction service fees)
    const serviceFees = await prisma.transaksi.aggregate({
      _sum: {
        serviceFee: true
      }
    });

    // Compute basic statistics
    const saldoKas = Number(koperasi?.saldoKas || 0);
    const modalDisalurkan = Number(approvedLoans._sum.jumlah || 0);
    const serviceFeeTotal = Number(serviceFees._sum.serviceFee || 0);
    
    // Simulate SHU as a portion of Saldo Kas for demo purposes, since no direct SHU column
    const shuKoperasi = saldoKas * 0.4; 

    // Return in the format expected by dashboardStats state
    return NextResponse.json({
      saldoKasKud: { value: saldoKas, percentage: 12.4 },
      totalAnggota: { value: totalMembers, percentage: 12 },
      modalDisalurkan: { value: modalDisalurkan, percentage: 8 },
      shuKoperasi: { value: shuKoperasi, percentage: 41 },
      serviceFee: { value: serviceFeeTotal, percentage: 10.4 }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
