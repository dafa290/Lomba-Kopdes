import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json({
    prices: db.tb_commodity_prices,
    lastUpdated: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, price, change, trend, info } = body;

    if (!id || price === undefined) {
      return NextResponse.json({ error: "ID Komoditas dan harga wajib ditentukan" }, { status: 400 });
    }

    const db = readDb();
    const item = db.tb_commodity_prices.find(c => c.id === id);

    if (!item) {
      return NextResponse.json({ error: "Komoditas tidak ditemukan" }, { status: 404 });
    }

    const oldPrice = item.price;
    item.price = Number(price);

    if (change !== undefined) {
      item.change = change;
    } else {
      const diff = ((item.price - oldPrice) / oldPrice) * 100;
      item.change = (diff >= 0 ? "+" : "") + diff.toFixed(1) + "%";
    }

    if (trend !== undefined) {
      item.trend = trend;
    } else {
      item.trend = item.price > oldPrice ? "up" : item.price < oldPrice ? "down" : "stable";
    }

    if (info !== undefined) {
      item.info = info;
    }

    writeDb(db);
    return NextResponse.json({ success: true, updatedItem: item });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
