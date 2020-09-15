import * as bcrypt from "bcryptjs";

export default class HashManager {
  async hash(text: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const cypherText = await bcrypt.hash(text, salt);

    return cypherText;
  }

  async compare(text: string, cypherText: string): Promise<boolean> {
    const result = await bcrypt.compare(text, cypherText);

    return result;
  }
}
