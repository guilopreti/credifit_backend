import { AppDataSource } from "../data-source";
import { User, UserType } from "../entities/user.entity";

class ListUsersService {
  public static async execute() {
    const userRepository = AppDataSource.getRepository(User);

    const creators = await userRepository.find({
      where: { type: UserType.CREATOR },
      relations: ["products"],
    });

    const affiliates = await userRepository.find({
      where: { type: UserType.AFFILIATED },
      relations: ["transactions", "transactions.product"],
    });

    const usersList = creators.map((creator) => {
      const creatorAffiliates = affiliates
        .filter((affiliated) => {
          return affiliated.transactions.some((transaction) =>
            creator.products.some(
              (product) => product.id === transaction.product.id
            )
          );
        })
        .map(({ id, name, type, balance }) => ({ id, name, type, balance }));

      return {
        ...creator,
        creatorAffiliates,
      };
    });

    return usersList;
  }
}

export default ListUsersService;
