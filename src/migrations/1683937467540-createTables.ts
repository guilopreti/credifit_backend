import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1683937467540 implements MigrationInterface {
  name = "CreateTables1683937467540";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_type_enum" AS ENUM('1', '2', '3', '4')`
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" uuid NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "value" numeric NOT NULL, "productId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_type_enum" AS ENUM('creator', 'affiliated')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "type" "public"."user_type_enum" NOT NULL, "balance" numeric NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL, "name" character varying NOT NULL, "value" numeric NOT NULL, "sum_of_sales" numeric NOT NULL, "creatorId" uuid NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_fd965536176f304a7dd64937165" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_9492314205bb204a32e39749607" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_9492314205bb204a32e39749607"`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_fd965536176f304a7dd64937165"`
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
  }
}
