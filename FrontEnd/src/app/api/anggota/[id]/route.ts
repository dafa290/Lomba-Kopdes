import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    
    const updatedAnggota = await prisma.anggota.update({
      where: { id },
      data: body,
    });
    
    return NextResponse.json(updatedAnggota);
  } catch (error) {
    console.error("Error updating anggota:", error);
    return NextResponse.json({ error: "Failed to update anggota" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.anggota.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Anggota deleted successfully" });
  } catch (error) {
    console.error("Error deleting anggota:", error);
    return NextResponse.json({ error: "Failed to delete anggota" }, { status: 500 });
  }
}
