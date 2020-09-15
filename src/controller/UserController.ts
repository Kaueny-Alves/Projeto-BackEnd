import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export default class UserController {
  async signup(req: Request, res: Response) {
    try {
      const name = req.body.name;
      const nickname = req.body.nickname;
      const email = req.body.email;
      const password = req.body.password;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.signup(name, nickname, email, password);

      res.status(200).send({
        message: "Usuário criado com sucesso",
        token,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.login(email, password);

      res.status(200).send({
        message: "Usuário logado com sucesso",
        token,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
}
