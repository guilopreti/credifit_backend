import { ITransaction } from "../interfaces";
import AffiliatedSaleService from "./affiliatedSale.service";
import CommissionPaidService from "./commissionPaid.service";
import CommissionReceivedService from "./commissionReceived.service";
import CreatorSaleService from "./creatorSale.service";

class RegisterTransactionService {
  public static async execute(data: ITransaction[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === 1) {
        await CreatorSaleService.execute(data[i]);
        continue;
      }

      if (data[i].type === 2) {
        await AffiliatedSaleService.execute(data[i]);
        continue;
      }

      if (data[i].type === 3) {
        await CommissionPaidService.execute(data[i]);
        continue;
      }

      if (data[i].type === 4) {
        await CommissionReceivedService.execute(data[i]);
        continue;
      }
    }

    return { message: "Completed!" };
  }
}

export default RegisterTransactionService;
