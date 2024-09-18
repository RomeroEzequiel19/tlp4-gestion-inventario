import {Request, Response} from "express"
import AuthService from "../services/AuthService"
import { ILogin, Payload } from "../interface/AuthInterface"
import { IUser } from "../models/User"
import jwt from "jsonwebtoken"
import { KEY } from "../config/conf"
import UserService from "../services/UserService"

export const ctrlAuthRegister = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Nos aseguramos que el cuerpo cumpla con la interfaz
        const user: IUser = req.body

        await AuthService.register(user)

        return res.status(201).json({
            message: "Registro correcto"
        })
    } catch (error: any) {
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json({
            message: error.message,
            status: error.status
        })
    }
}

export const ctrlAuthLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Nos aseguramos que el cuerpo cumpla con la interfaz
        const user: ILogin = req.body
        
        const token = await AuthService.login(user)

        return res.status(200).json({
            message: "Login correcto",
            token: token.token
        })

    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        console.error("Error en el servidor:", error);
        return res.status(statusCode).json({
            message: error.message,
            status: error.status
        })
    }
}

export const validateToken = async(req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, KEY) as Payload;

        const user = await  UserService.getUserById(decoded.user)

        if (!user) {
        return res.status(403).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ valid: true, user });
    } catch (error) {
        res.status(401).json({ valid: false, message: 'Token inválido' });
    }
};