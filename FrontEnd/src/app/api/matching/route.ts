import { NextResponse } from 'next/server';
import { readDb, runAiMatching, approveOrderMatching } from '@/lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json({
    matching: db.tb_ai_matching,
    blasts: db.tb_ai_blast_log,
    approvals: db.tb_approval_pengurus,
    transactions: db.tb_transaksi,
    coop: db.tb_koperasi_kdkmp[0]
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id_order, id_approval, manager_name } = body;

    if (action === 'match') {
      if (!id_order) {
        return NextResponse.json({ error: "id_order wajib diisi" }, { status: 400 });
      }
      const res = runAiMatching(id_order);
      return NextResponse.json(res);
    } 
    
    if (action === 'approve') {
      if (!id_approval || !manager_name) {
        return NextResponse.json({ error: "id_approval dan manager_name wajib diisi" }, { status: 400 });
      }
      const res = approveOrderMatching(id_approval, manager_name);
      return NextResponse.json(res);
    }

    return NextResponse.json({ error: "Action tidak valid" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
