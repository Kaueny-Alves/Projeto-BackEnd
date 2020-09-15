//import User from "../model/User";

import BaseDB from "./BaseDataBase";

export class UserDatabase extends BaseDB {
  private static TABLE_NAME: string = "User_Backend";

  public async createUser(
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string
  ): Promise<any> {
    await this.getConnection()
      .insert({
        id,
        name,
        nickname,
        email,
        password,
      })
      .into(UserDatabase.TABLE_NAME);

    this.destroyConnection();
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });
    this.destroyConnection();
    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    this.destroyConnection();
    return result[0];
  }
}
