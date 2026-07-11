import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.tb_kebutuhan_sppg);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { produk, jumlah, harga_maksimal } = body;

    if (!produk || !jumlah || !harga_maksimal) {
      return NextResponse.json({ error: "Produk, jumlah, dan harga maksimal wajib diisi" }, { status: 400 });
    }

    const db = readDb();
    const newOrder = {
      id_order: `O00${db.tb_kebutuhan_sppg.length + 1}`,
      id_sppg: "S001",
      produk,
      jumlah: Number(jumlah),
      harga_maksimal: Number(harga_maksimal),
      status: "Menunggu Matching"
    };

    db.tb_kebutuhan_sppg.push(newOrder);
    writeDb(db);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
