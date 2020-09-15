import { UserDatabase } from "../database/UserDataBase";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";

//import User from "../model/User";

export class UserBusiness {
  public async signup(
    name: string,
    nickname: string,
    email: string,
    password: string
  ): Promise<string> {
    if (!name || !nickname || !email || !password) {
      throw new Error("Insira todas as informações necessárias para cadastro");
    }

    if (password.length < 6) {
      throw new Error("A senha deve conter no mínimo seis caracteres");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();

    await userDatabase.createUser(id, name, nickname, email, hashPassword);

    const token = Authenticator.generateToken({ id });

    return token;
  }

  public async login(email: string, password: string): Promise<string> {
    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Usuário ou senha errados!");
    }

    const token = Authenticator.generateToken({ id: user.id });
    return token;
  }
}
