import { Router } from "express"
import authMiddleware from "../middlewares/ValidateJWT";
import userControllers from "../controllers/user.controllers";
import roleMiddleware from "../middlewares/Roles";

const userRoutes: Router = Router();

// Rutas para CRUD de usuarios
userRoutes.get('/users', authMiddleware, roleMiddleware(['admin']), userControllers.ctrlGetAllUsers); 
userRoutes.get('/users/:id', authMiddleware, roleMiddleware(['admin']), userControllers.ctrlGetUserById);
userRoutes.put('/users/:id',authMiddleware, roleMiddleware(['admin']), userControllers.ctrlUpdateUser);
userRoutes.delete('/users/:id',authMiddleware, roleMiddleware(['admin']), userControllers.ctrlDeleteUser); 

export default userRoutes