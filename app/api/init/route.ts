import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db/init';

export async function POST() {
  try {
    await initializeDatabase();
    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Initialization Error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}