import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  
  // Controlador para crear un nuevo usuario
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Controlador para obtener todos los usuarios
  async ctrlGetAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Controlador para obtener un usuario por ID
  async ctrlGetUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(req.params.id);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Controlador para actualizar un usuario por ID
  async ctrlUpdateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Controlador para eliminar un usuario por ID
  async ctrlDeleteUser(req: Request, res: Response): Promise<Response> {
    try {
      await UserService.deleteUser(req.params.id);
      return res.status(204).json({message: "Usuario eliminado"});
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Controlador para autenticar al usuario
  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.getUserByEmailAndPassword(req.body);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export default new UserController();
