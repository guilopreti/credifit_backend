import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { User, UserType } from "../entities/user.entity";
import { ITransaction } from "../interfaces";
import { Transaction, TransactionType } from "../entities/transactions.entity";
import AppError from "../errors/app.Error";

class AffiliatedSaleService {
  public static async execute(transaction: ITransaction) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const productRepository = AppDataSource.getRepository(Product);
      const transactionRepository = AppDataSource.getRepository(Transaction);

      let product: Product | null;

      product = await productRepository.findOne({
        where: {
          name: transaction.product,
        },
      });

      if (!product) {
        throw new AppError("Product not found!", 404);
      }

      let user: User | null;

      user = await userRepository.findOne({
        where: {
          name: transaction.user,
          type: UserType.AFFILIATED,
        },
      });

      if (!user) {
        user = new User();
        (user.name = transaction.user),
          (user.type = UserType.AFFILIATED),
          (user.balance = 0);

        await userRepository.save(user);
      }

      const newTransaction = new Transaction();
      (newTransaction.type = TransactionType.AFFILIATED_SALE),
        (newTransaction.date = transaction.date),
        (newTransaction.product = product),
        (newTransaction.user = user),
        (newTransaction.value = transaction.value);

      await transactionRepository.save(newTransaction);

      user.balance = Number(user.balance) + Number(newTransaction.value);
      product.sum_of_sales =
        Number(product.sum_of_sales) + Number(newTransaction.value);

      await userRepository.save(user);
      await productRepository.save(product);
    } catch (error) {
      console.log(error);
    }
  }
}

export default AffiliatedSaleService;
