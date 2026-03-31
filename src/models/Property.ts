import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Property interface
export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl?: string;
  createdAt: Date;
}

// Define the Property schema
const PropertySchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please provide number of bedrooms'],
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please provide number of bathrooms'],
  },
  area: {
    type: Number,
    required: [true, 'Please provide area in sq ft'],
  },
  imageUrl: {
    type: String,
    default: '/default-property.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'properties' // Specify your collection name here
});

// Create and export the model
const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);

export default Property;