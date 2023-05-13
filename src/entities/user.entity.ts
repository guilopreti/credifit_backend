import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity";
import { Transaction } from "./transactions.entity";

export enum UserType {
  CREATOR = "creator",
  AFFILIATED = "affiliated",
}

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "enum", enum: UserType, nullable: false })
  type: UserType;

  @Column({ type: "decimal", nullable: false })
  balance: number;

  @OneToMany((type) => Product, (product) => product.creator)
  products: Product[];

  @OneToMany((type) => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
