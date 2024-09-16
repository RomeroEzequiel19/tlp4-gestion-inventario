import { Hashing } from "../helpers/hash"
import { addJWT } from "../helpers/jsonwebtoken"
import { ILogin } from "../interface/AuthInterface"
import User, { IUser } from "../models/User"
import UserService from "./UserService"

class AuthService {
    private readonly hashing: Hashing

    constructor() {
        // Inicializo la clase hashing
        this.hashing = new Hashing()
    }

    async register(user: IUser) {
        // Se hashea la contraseña
        const password = await this.hashing.hashPassword(user.password)
        const newUser = new User({ ...user, password })
        return await newUser.save()
    }

    async login(user: ILogin) {
        // Desestructuración+
        const { email, password } = user
        // Se obtiene el usuario
        const loginUser = await UserService.getUserByEmailAndPassword({email, password})
        // Se crea el token
        const token = await addJWT({user: loginUser.id,}   )
        // Retorno
        return token
    }

}

export default new AuthService()