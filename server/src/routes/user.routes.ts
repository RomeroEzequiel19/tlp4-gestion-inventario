import { Router } from "express"
import authMiddleware from "../middlewares/ValidateJWT";
import userControllers from "../controllers/user.controllers";
import roleMiddleware from "../middlewares/Roles";

const userRoutes: Router = Router();

// Rutas para CRUD de usuarios
userRoutes.get('/users', authMiddleware, roleMiddleware('admin'), userControllers.ctrlGetAllUsers); 
userRoutes.get('/users/:id', userControllers.ctrlGetUserById);
userRoutes.put('/users/:id', userControllers.ctrlUpdateUser);
userRoutes.delete('/users/:id', roleMiddleware('admin'), userControllers.ctrlDeleteUser); 

export default userRoutes