import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity";
import { User } from "./user.entity";

export enum TransactionType {
  CREATOR_SALE = 1,
  AFFILIATED_SALE = 2,
  COMMISSION_PAID = 3,
  COMMISSION_RECEIVED = 4,
}

@Entity()
export class Transaction {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: TransactionType })
  type: TransactionType;

  @Column({ type: "timestamp with time zone", nullable: false })
  date: Date;

  @Column({ type: "decimal", nullable: false })
  value: number;

  @ManyToOne((type) => Product, (product) => product.transactions, {
    nullable: false,
  })
  product: Product;

  @ManyToOne((type) => User, (user) => user.transactions, { nullable: false })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
