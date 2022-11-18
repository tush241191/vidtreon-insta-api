import { jest } from "@jest/globals"; // eslint-disable-line
import supertest from "supertest";

import app from "../../../src/app.js";
import PurchaseService from "../../../src/services/purchase.js";

jest.mock("../../../src/services/purchase.js");
jest.mock("../../../src/services/user.js");

describe("/api/v1/purchase/", () => {
  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/purchase");
    expect(res.status).toBe(401);
  });

  test("GET lists all the models", async () => {
    const data = [{name: "First"}, {name: "Second"}];
    PurchaseService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get("/api/v1/purchase")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(PurchaseService.list).toHaveBeenCalled();
  });

  test("POST creates a new Purchase", async () => {
    const data = {
      user: "test",
      producer: 1,
      purpose: "test",
      tonnes: 42,
      price: 3.141592,
      date: "2001-01-01T00:00:00Z",
      project: 1,
      createdAt: "2001-01-01T00:00:00Z"
    };

    PurchaseService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/purchase")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(PurchaseService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Purchase without required attributes fails", async () => {
    const data = {};

    PurchaseService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/purchase")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(PurchaseService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/purchase/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = {email: "test@example.com"};
    PurchaseService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/purchase/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(PurchaseService.get).toHaveBeenCalledWith(1);
  });

  test("getting a single result fails for anonymous user", async () => {
    const req = supertest(app);
    const res = await req.get("/api/v1/purchase/1");
    expect(res.status).toBe(401);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    PurchaseService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/purchase/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(PurchaseService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    PurchaseService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/purchase/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(PurchaseService.get).not.toHaveBeenCalled();
  });

  test("Purchase update", async () => {
    const data = {
      user: "test",
      producer: 1,
      purpose: "test",
      tonnes: 42,
      price: 3.141592,
      project: 1
    };
    PurchaseService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/purchase/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(PurchaseService.update).toHaveBeenCalledWith(1, data);
  });

  test("Purchase deletion", async () => {
    PurchaseService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/purchase/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(PurchaseService.delete).toHaveBeenCalledWith(1);
  });
});
