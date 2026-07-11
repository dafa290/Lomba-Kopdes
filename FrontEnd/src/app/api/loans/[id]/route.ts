import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    const db = readDb();
    const loan = db.tb_loans.find(l => l.id === id);

    if (!loan) {
      return NextResponse.json({ error: "Pengajuan pinjaman tidak ditemukan" }, { status: 404 });
    }

    if (status !== undefined) {
      loan.status = status;
    }

    writeDb(db);
    return NextResponse.json(loan);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
