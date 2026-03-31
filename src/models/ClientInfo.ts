// models/ClientInfo.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClientInfo extends Document {
  propertyId: mongoose.Types.ObjectId;
  propertyTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
  bookingDate: Date;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: Date;
}

const ClientInfoSchema: Schema = new Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Property ID is required'],
  },
  propertyTitle: {
    type: String,
    required: [true, 'Property title is required'],
  },
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
  },
  clientEmail: {
    type: String,
    required: [true, 'Client email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  clientPhone: {
    type: String,
    required: [true, 'Client phone is required'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'clientinfo' // Specify your collection name
});

const ClientInfo: Model<IClientInfo> = mongoose.models.ClientInfo || mongoose.model<IClientInfo>('ClientInfo', ClientInfoSchema);

export default ClientInfo;