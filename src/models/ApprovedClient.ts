import mongoose, { Schema, Document } from 'mongoose';

export interface IApprovedClient extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  registrationNumber: string;
  businessAddress: string;
  verificationDocuments: { url: string; docType: string }[];
  approvalDate?: Date;
  approvedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ApprovedClientSchema = new Schema<IApprovedClient>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    companyName: { type: String, required: true, trim: true },
    registrationNumber: { type: String, required: true, unique: true, trim: true },
    businessAddress: { type: String, trim: true },
    verificationDocuments: [
      {
        url: { type: String, required: true },
        docType: { type: String, required: true },
      },
    ],
    approvalDate: { type: Date },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const ApprovedClient = mongoose.models.ApprovedClient || mongoose.model<IApprovedClient>('ApprovedClient', ApprovedClientSchema);

export default ApprovedClient;
