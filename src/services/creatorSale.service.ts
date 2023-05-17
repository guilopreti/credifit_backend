import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { User, UserType } from "../entities/user.entity";
import { ITransaction } from "../interfaces";
import { Transaction, TransactionType } from "../entities/transactions.entity";
import AppError from "../errors/app.Error";

class CreatorSaleService {
  public static async execute(transaction: ITransaction) {
    const returnMessage = {
      transaction: "Creator Sale",
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
          type: UserType.CREATOR,
        },
      });

      if (!user) {
        user = new User();
        (user.name = transaction.user),
          (user.type = UserType.CREATOR),
          (user.balance = 0);

        await userRepository.save(user);
      }

      let product: Product | null;

      product = await productRepository.findOne({
        where: {
          name: transaction.product,
        },
        relations: ["creator"],
      });

      if (!product) {
        product = new Product();
        (product.name = transaction.product),
          (product.value = transaction.value),
          (product.creator = user),
          (product.sum_of_sales = 0);

        await productRepository.save(product);
      }

      if (product.creator.id !== user.id) {
        throw new AppError("Product already exists with another creator!", 400);
      }

      const newTransaction = new Transaction();
      (newTransaction.type = TransactionType.CREATOR_SALE),
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

export default CreatorSaleService;
