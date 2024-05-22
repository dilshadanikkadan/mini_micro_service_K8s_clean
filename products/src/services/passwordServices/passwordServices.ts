import bcrypt from "bcrypt";
export class PasswordServices {
  static async hash(password: string) {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    return pass;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return await bcrypt.compare(storedPassword, suppliedPassword);
  }
}
