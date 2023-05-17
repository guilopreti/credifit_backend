import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { User, UserType } from "../entities/user.entity";
import { ITransaction } from "../interfaces";
import { Transaction, TransactionType } from "../entities/transactions.entity";
import AppError from "../errors/app.Error";

class CommissionPaidService {
  public static async execute(transaction: ITransaction) {
    const returnMessage = {
      transaction: "Commission Paid",
      date: transaction.date,
      user: transaction.user,
      product: transaction.product,
      value: transaction.value,
    };

    try {
      const userRepository = AppDataSource.getRepository(User);
      const productRepository = AppDataSource.getRepository(Product);
      const transactionRepository = AppDataSource.getRepository(Transaction);

      let user: User | null;

      user = await userRepository.findOne({
        where: {
          name: transaction.user,
          type: UserType.AFFILIATED,
        },
      });

      if (!user) {
        throw new AppError("User not found!", 404);
      }

      let product: Product | null;

      product = await productRepository.findOne({
        where: {
          name: transaction.product,
        },
      });

      if (!product) {
        throw new AppError("Product not found!", 404);
      }

      const newTransaction = new Transaction();
      (newTransaction.type = TransactionType.COMMISSION_PAID),
        (newTransaction.date = transaction.date),
        (newTransaction.product = product),
        (newTransaction.user = user),
        (newTransaction.value = transaction.value);

      await transactionRepository.save(newTransaction);

      user.balance = Number(user.balance) - Number(newTransaction.value);

      await userRepository.save(user);

      return {
        id: newTransaction.id,
        ...returnMessage,
        status: "Registration Completed!",
      };
    } catch (error) {
      if (error instanceof AppError) {
        return {
          ...returnMessage,
          status: `Error ${error.statusCode}`,
          message: error.message,
        };
      }
    }
  }
}

export default CommissionPaidService;
