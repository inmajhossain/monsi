// app/api/bookings/route.ts
import connectDB from '@/lib/mongodb';
import ClientInfo from '@/models/ClientInfo';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { propertyId, propertyTitle, clientName, clientEmail, clientPhone, message } = body;
    
    // Validate required fields
    if (!propertyId || !propertyTitle || !clientName || !clientEmail || !clientPhone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const booking = await ClientInfo.create({
      propertyId,
      propertyTitle,
      clientName,
      clientEmail,
      clientPhone,
      message,
      status: 'pending',
    });
    
    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = {};
    if (status) {
      query = { status };
    }
    
    const bookings = await ClientInfo.find(query)
      .sort({ createdAt: -1 })
      .populate('propertyId');
    
    return NextResponse.json(
      { success: true, data: bookings },
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