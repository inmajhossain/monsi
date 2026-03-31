// app/api/bookings/[id]/route.ts
import connectDB from '@/lib/mongodb';
import ClientInfo from '@/models/ClientInfo';
import { NextResponse } from 'next/server';

// For Next.js App Router, params is a Promise that needs to be awaited
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to database
    await connectDB();
    
    // Await the params
    const { id } = await params;
    
    console.log('Received ID from params:', id); // Debug log
    
    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { status } = body;
    
    console.log('Received status:', status); // Debug log
    
    // Validate status
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }
    
    if (!['pending', 'contacted', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be pending, contacted, completed, or cancelled' },
        { status: 400 }
      );
    }

    // Find and update the booking
    const booking = await ClientInfo.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    console.log('Found booking:', booking); // Debug log
    
    // Check if booking exists
    if (!booking) {
      return NextResponse.json(
        { error: `Booking not found with ID: ${id}` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Status updated successfully',
        data: booking 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error updating booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    console.log('Deleting booking with ID:', id); // Debug log
    
    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    const booking = await ClientInfo.findByIdAndDelete(id);
    
    if (!booking) {
      return NextResponse.json(
        { error: `Booking not found with ID: ${id}` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Booking deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}