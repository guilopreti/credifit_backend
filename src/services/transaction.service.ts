import { ITransaction } from "../interfaces";
import AffiliatedSaleService from "./affiliatedSale.service";
import CommissionPaidService from "./commissionPaid.service";
import CommissionReceivedService from "./commissionReceived.service";
import CreatorSaleService from "./creatorSale.service";

class RegisterTransactionService {
  public static async execute(data: ITransaction[]) {
    let recordsReturn: { [key: number]: any } = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === 1) {
        const record = await CreatorSaleService.execute(data[i]);
        recordsReturn[i] = record;
        continue;
      }

      if (data[i].type === 2) {
        const record = await AffiliatedSaleService.execute(data[i]);
        recordsReturn[i] = record;
        continue;
      }

      if (data[i].type === 3) {
        const record = await CommissionPaidService.execute(data[i]);
        recordsReturn[i] = record;
        continue;
      }

      if (data[i].type === 4) {
        const record = await CommissionReceivedService.execute(data[i]);
        recordsReturn[i] = record;
        continue;
      }
    }

    return recordsReturn;
  }
}

export default RegisterTransactionService;
