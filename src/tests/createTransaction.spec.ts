import { AppDataSource } from "../data-source";
import request from "supertest";
import app from "../app";

import { describe, beforeAll, afterAll, test, expect } from "@jest/globals";

describe(" POST - / ", () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) =>
      console.error("Error during Data Source initialization", err)
    );
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy().catch((err) => console.error(err));
  });

  test("Should create transactions", async () => {
    const data = {
      0: "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
      1: "22022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000012750THIAGO OLIVEIRA",
      2: "32022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500THIAGO OLIVEIRA",
      3: "42022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500JOSE CARLOS",
    };

    const response = await request(app).post("/").send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("map");
    expect(response.body.length).toBe(4);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].transaction).toBe("Creator Sale");

    expect(response.body[1]).toHaveProperty("id");
    expect(response.body[1].transaction).toBe("Affiliated Sale");

    expect(response.body[2]).toHaveProperty("id");
    expect(response.body[2].transaction).toBe("Commission Paid");

    expect(response.body[3]).toHaveProperty("id");
    expect(response.body[3].transaction).toBe("Commission Received");
  });
});
