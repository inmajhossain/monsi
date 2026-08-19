import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'USER' | 'CLIENT' | 'ADMIN';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  profile: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['USER', 'CLIENT', 'ADMIN'], default: 'USER' },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
    profile: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      phoneNumber: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
