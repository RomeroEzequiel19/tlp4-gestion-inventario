import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para el Usuario
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Usuario
const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    done: {type: Boolean, default: true}
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
