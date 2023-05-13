import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import { Transaction } from "./transactions.entity";

@Entity()
export class Product {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "decimal", nullable: false })
  value: number;

  @Column({ type: "decimal", nullable: false })
  sum_of_sales: number;

  @ManyToOne((type) => User, (user) => user.products, { nullable: false })
  creator: User;

  @OneToMany((type) => Transaction, (transaction) => transaction.product)
  transactions: Transaction[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
