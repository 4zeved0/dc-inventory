import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { email, name, surname } = await req.json();

    if (!email || !name || !surname) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const upsertUser = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        surname,
      },
      create: {
        email,
        name,
        surname,
      },
    });


    return NextResponse.json(upsertUser, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
