import connectDB from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    const properties = await Property.find({}).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(
      { success: true, data: properties },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}