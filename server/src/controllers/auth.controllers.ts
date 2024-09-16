import {Request, Response} from "express"
import AuthService from "../services/AuthService"
import { ILogin, IRegister } from "../interface/AuthInterface"

export const ctrlAuthRegister = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Nos aseguramos que el cuerpo cumpla con la interfaz
        const user: IRegister = req.body

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

        return res.status(200).json(token)

    } catch (error: any) {
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json({
            message: error.message,
            status: error.status
        })
    }
}