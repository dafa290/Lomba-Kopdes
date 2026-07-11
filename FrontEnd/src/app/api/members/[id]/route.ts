import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, role, opt_in_consent } = body;

    const db = readDb();
    const member = db.tb_anggota_warga.find(m => m.id_anggota === id);
    
    if (!member) {
      return NextResponse.json({ error: "Anggota tidak ditemukan" }, { status: 404 });
    }

    if (status !== undefined) member.status = status;
    if (role !== undefined) member.kategori_usaha = role;
    if (opt_in_consent !== undefined) member.opt_in_consent = opt_in_consent;

    writeDb(db);
    return NextResponse.json(member);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
