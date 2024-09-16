import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { KEY } from '../config/conf';
import UserService from '../services/UserService';
import { Payload } from '../interface/AuthInterface';
import { IUser } from '../models/User';

declare global {
  namespace Express {
      interface Request {
          user?: IUser
      }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Separar la palabra "Bearer" del token real
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, KEY) as Payload;

    const user = await  UserService.getUserById(decoded.user)

    if (!user) {
      return res.status(403).json({ message: 'Usuario no encontrado' });
    }
    
    req.user = user
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Error: Token inválido o expirado' });
  }
};

export default authMiddleware;
