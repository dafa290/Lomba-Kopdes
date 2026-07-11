import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.tb_anggota_warga);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, role, location, komoditas, category } = body;
    
    if (!name || !phone) {
      return NextResponse.json({ error: "Nama dan No Telepon wajib diisi" }, { status: 400 });
    }

    const db = readDb();
    const newMember = {
      id_anggota: `A00${db.tb_anggota_warga.length + 1}`,
      id_koperasi: "K001",
      nama: name,
      no_whatsapp: phone,
      kategori_usaha: category || role || "Anggota Tani",
      komoditas: komoditas || "Beras",
      opt_in_consent: false, // Must opt-in via WA
      status: "Menunggu"
    };

    db.tb_anggota_warga.push(newMember);
    
    // Also create initial blank production row
    db.tb_produksi_harian.push({
      id_produksi: `P00${db.tb_produksi_harian.length + 1}`,
      id_anggota: newMember.id_anggota,
      tanggal: new Date().toISOString().split('T')[0],
      jumlah_produksi: 0.0,
      jumlah_tersedia: 0.0,
      status: "Belum Ada"
    });

    writeDb(db);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
