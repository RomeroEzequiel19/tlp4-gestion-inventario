import { model, Schema } from "mongoose";
import { IRegister } from "../interface/AuthInterface";

const UserSchema = new Schema<IRegister>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    done: { type: Boolean, default: false },
    rol: { type: Number, default: 0 }
  },
  {
    timestamps: true,
  }
);

// Exportación del modelo de usuario
export default model<IRegister>("User", UserSchema);
