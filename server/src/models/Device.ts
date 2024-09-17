import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

// Interfaz para el Equipo
export interface IDevice extends Document{
  name: string;
  type: 'Laptop' | 'PC' | 'Monitor' | 'Impresora';
  brand: string;
  deviceModel: string;
  serialNumber: string;
  purchaseDate: Date;
  warrantyExpiration: Date;
  location: string;
  status: 'activo' | 'en reparación' | 'dado de baja';
  assignedTo: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Equipo
const DeviceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['Laptop', 'PC', 'Monitor', 'Impresora'],
      required: true,
    },
    brand: { type: String, required: true },
    deviceModel: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    purchaseDate: { type: Date, required: true },
    warrantyExpiration: { type: Date, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ['activo', 'en reparación', 'dado de baja'],
      default: 'activo',
    },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IDevice>('Device', DeviceSchema);
