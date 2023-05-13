import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { User, UserType } from "../entities/user.entity";
import { ITransaction } from "../interfaces";
import { Transaction, TransactionType } from "../entities/transactions.entity";

class CreatorSaleService {
  public static async execute(transaction: ITransaction) {
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
    });

    if (!product) {
      product = new Product();
      (product.name = transaction.product),
        (product.value = transaction.value),
        (product.creator = user),
        (product.sum_of_sales = 0);

      await productRepository.save(product);
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
  }
}

export default CreatorSaleService;
