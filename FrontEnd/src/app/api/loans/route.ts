import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.tb_loans);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, amount, type, tenure, purpose } = body;

    if (!name || !phone || !amount || !type || !tenure) {
      return NextResponse.json({ error: "Data pengajuan pinjaman kurang lengkap" }, { status: 400 });
    }

    const db = readDb();
    const newLoan = {
      id: `L00${db.tb_loans.length + 1}`,
      name,
      phone,
      amount: Number(amount),
      type,
      tenure: Number(tenure),
      status: "Menunggu",
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }),
      purpose: purpose || "Keperluan Modal Hilirisasi / Usaha"
    };

    db.tb_loans.push(newLoan);
    writeDb(db);

    return NextResponse.json(newLoan, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
