import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = 0;

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Error al cargar noticias' }, { status: 500 });
  }
}
