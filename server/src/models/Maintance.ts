import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IDevice } from './Device';

// Interfaz para el Registro de Mantenimiento
export interface IMaintenance extends Document {
  device: IDevice['_id'];
  maintenanceDate: Date;
  description: string;
  performedBy: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Registro de Mantenimiento
const MaintenanceSchema: Schema = new Schema(
  {
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    maintenanceDate: { type: Date, required: true },
    description: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMaintenance>('Maintenance', MaintenanceSchema);
