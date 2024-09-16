import { model, Schema} from 'mongoose';
import { IEquipamentComputer } from '../interface/EquipamentComputerInterface';

const EquipamentComputerSchema = new Schema<IEquipamentComputer>(
    {
        name_equipament: { type: String, required: true },
        type_equipament: { type: Number, required: true },
        creation_date: { type: Date, required: true },
        trademark: { type: Number, required: true },
        model: { type: String, required: true },
        memory_ram: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

export default model<IEquipamentComputer>("Equipament_Computer", EquipamentComputerSchema)