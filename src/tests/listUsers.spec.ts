import { AppDataSource } from "../data-source";
import request from "supertest";
import app from "../app";
import RegisterTransactionService from "../services/transaction.service";

import { describe, beforeAll, afterAll, test, expect } from "@jest/globals";

describe(" GET - /users ", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) =>
      console.error("Error during Data Source initialization", err)
    );
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.error(err));
  });

  test("Should list users", async () => {
    const usersData = [
      {
        type: 1,
        date: new Date("2022-01-15T22:20:30.000Z"),
        product: "CURSO DE BEM-ESTAR",
        value: 127.5,
        user: "JOSE CARLOS",
      },
      {
        type: 2,
        date: new Date("2022-01-16T17:13:54.000Z"),
        product: "CURSO DE BEM-ESTAR",
        value: 127.5,
        user: "THIAGO OLIVEIRA",
      },
      {
        type: 3,
        date: new Date("2022-01-16T17:13:54.000Z"),
        product: "CURSO DE BEM-ESTAR",
        value: 45,
        user: "THIAGO OLIVEIRA",
      },
      {
        type: 4,
        date: new Date("2022-01-16T17:13:54.000Z"),
        product: "CURSO DE BEM-ESTAR",
        value: 45,
        user: "JOSE CARLOS",
      },
    ];

    await RegisterTransactionService.execute(usersData);

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
    expect(response.body.length).toBe(1);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].type).toBe("creator");
    expect(response.body[0].balance).toBe("172.5");

    expect(response.body[0].products).toHaveProperty("map");
    expect(response.body[0].products.length).toBe(1);
    expect(response.body[0].products[0].sum_of_sales).toBe("255");

    expect(response.body[0].creatorAffiliates).toHaveProperty("map");
    expect(response.body[0].creatorAffiliates.length).toBe(1);
    expect(response.body[0].creatorAffiliates[0].balance).toBe("82.5");
    expect(response.body[0].creatorAffiliates[0].type).toBe("affiliated");
  });
});
