import { connect } from "mongoose";
import { URI } from "../config/conf";
import User from "../models/User";
import bcrypt from "bcryptjs"

export const dbConnect = async (): Promise<void> => {
    try {
        await connect(URI);
        await createDefaultAdmin();
        console.log("Connected Database");
    } catch (error) {
        console.log("Error connecting to database", error as Error);
    }
};

// Función para crear un usuario administrador por defecto
const createDefaultAdmin = async () => {
    try {
      const adminExists = await User.findOne({ role: 'admin' });
  
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10); 
        const adminUser = new User({
          username: "admin",
          email: 'admin@admin.com',
          password: hashedPassword,
          role: 'admin', 
        });
  
        await adminUser.save();
        console.log('Usuario administrador por defecto creado');
      } else {
        console.log('Usuario administrador ya existe');
      }
    } catch (error) {
      console.error('Error creando el usuario administrador por defecto:', error);
    }
  };
