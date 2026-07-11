import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const anggota = await prisma.anggota.findMany();
    return NextResponse.json(anggota);
  } catch (error) {
    console.error("Error fetching anggota:", error);
    return NextResponse.json({ error: "Failed to fetch anggota" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Default idKoperasi to 1 if not provided
    const { idKoperasi, ...rest } = body;
    
    const newAnggota = await prisma.anggota.create({
      data: {
        idKoperasi: idKoperasi || 1,
        ...rest
      }
    });
    
    return NextResponse.json(newAnggota, { status: 201 });
  } catch (error) {
    console.error("Error creating anggota:", error);
    return NextResponse.json({ error: "Failed to create anggota" }, { status: 500 });
  }
}
