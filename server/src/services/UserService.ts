import { Hashing } from "../helpers/hash";
import { ILogin } from "../interface/AuthInterface";
import { IUser } from "../models/User";
import User from "../models/User";

class UserService {
  private readonly hashing: Hashing;

  constructor() {
    this.hashing = new Hashing();
  }

  async getUserByEmailAndPassword({ email, password }: ILogin){
    const user = await User.findOne({ email }) ;

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await this.hashing.comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }

  async createUser(userData: IUser): Promise<IUser> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('El correo ya está en uso');
    }

    const hashedPassword = await this.hashing.hashPassword(userData.password);
    const newUser = new User({ ...userData, password: hashedPassword });
    
    return await newUser.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await User.findById(userId) as IUser;
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser> {
    const user = await User.findById(userId) as IUser;
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (updateData.password) {
      updateData.password = await this.hashing.hashPassword(updateData.password);
    }

    Object.assign(user, updateData);
    return await user.save();
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  }
}

export default new UserService();
