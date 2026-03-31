import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import { NextResponse } from 'next/server';

// Define the property data type
interface PropertyData {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl?: string;
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body: PropertyData = await request.json();
    
    // Validate required fields
    const { title, description, price, location, bedrooms, bathrooms, area, imageUrl, } = body;
    
    if (!title || !description || !price || !location || !bedrooms || !bathrooms || !area || !imageUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const property = await Property.create(body);
    
    return NextResponse.json(
      { success: true, data: property },
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