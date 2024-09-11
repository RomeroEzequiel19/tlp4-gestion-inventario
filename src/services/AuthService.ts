import { Hashing } from "../helpers/hash"
import { addJWT } from "../helpers/jsonwebtoken"
import { ILogin, IRegister } from "../interface/AuthInterface"
import User from "../models/User"
import UserService from "./UserService"

class AuthService {
    private readonly hashing: Hashing

    constructor() {
        // Inicializo la clase hashing
        this.hashing = new Hashing()
    }

    async register(user: IRegister) {
        // Se hashea la contraseña
        const password = await this.hashing.hashPassword(user.password)
        const newUser = new User({ ...user, password })
        return await newUser.save()
    }

    async login(user: ILogin) {
        const { email, password } = user
        const loginUser = await UserService.getUserByEmailAndPassword({email, password})
        const { id } = loginUser
        const token = await addJWT({user: id})

        return token
    }

}

export default new AuthService()