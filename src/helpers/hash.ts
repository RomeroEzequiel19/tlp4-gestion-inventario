import bcrypt from "bcryptjs"

export class Hashing {
    private readonly saltRounds: number = 10 ;
  
    // Hashear
    async hashPassword(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    }

    // Comparar
    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}