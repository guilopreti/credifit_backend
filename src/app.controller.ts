import { Request, Response } from "express";
import RegisterTransactionService from "./services/transaction.service";
import ListUsersService from "./services/listUsers.service";

class AppController {
  static async store(req: Request, res: Response) {
    let dataArray: string[] = Object.values(req.body);

    let data = dataArray.map((value) => ({
      type: parseInt(value.slice(0, 1)),
      date: new Date(value.slice(1, 26)),
      product: value.slice(26, 56).trim(),
      value: parseFloat(value.slice(56, 66).trim()) / 100,
      user: value.slice(66).trim(),
    }));

    const transaction = await RegisterTransactionService.execute(data);

    return res.status(201).json(transaction);
  }

  static async index(req: Request, res: Response) {
    const usersList = await ListUsersService.execute();

    return res.json(usersList);
  }
}

export default AppController;
