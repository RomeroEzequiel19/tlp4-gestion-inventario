import { Hashing } from "../helpers/hash";
import { ILogin, IRegister } from "../interface/AuthInterface";
import User from "../models/User";

class UserService {
    private readonly hashing: Hashing

    constructor(){
        this.hashing = new Hashing()
    }

    async getUserByEmailAndPassword({email, password}: ILogin): Promise<IRegister> {
        const user = await User.findOne({email}) as IRegister

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await this.hashing.comparePasswords(password, user.password)

        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        return user
    }
}

export default new UserService