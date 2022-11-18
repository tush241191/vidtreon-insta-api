import {jest} from "@jest/globals";
import expect from "expect";
import supertest from "supertest";

import app from "../../../../src/app.js";
import CustomerService from "../../../../src/clients/customers/service/customerService.js";

jest.mock("../../../../src/clients/customers/service/customerService.js");

const customerData =
    {
      id: 'aee9c930-818e-4845-8dcc-d583b870d8ff',
      name: 'Customer1',
      type: 'internal',
      vehicles: [],
      createdAt: '2022-10-07T08:52:54.345Z'
    }

const customerDataServiceResponse =
    {
      id: 'aee9c930-818e-4845-8dcc-d583b870d8ff',
      name: 'Customer1',
      type: 'internal',
      vehicles: [],
      created_at: '2022-10-07T08:52:54.345Z'
    }

describe("Customer API tests", () => {

  test("anonymous requests are blocked", async () => {
    const req = supertest(app);
    const res = await req.get("/v1/customer/list");
    expect(res.status).toBe(403);
  });

  test("GET customers returns empty list", async () => {
    const req = supertest(app);
    const res = await req
      .get("/v1/customer/list")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("GET lists all the customers", async () => {
    const customerList = [customerDataServiceResponse]
    CustomerService.getAllCustomers = jest.fn().mockResolvedValue(customerList);
    const req = supertest(app);

    const res = await req
      .get("/v1/customer/list")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(customerList);
    expect(CustomerService.getAllCustomers).toHaveBeenCalled();
  });

  test("GET customer with invalid id format returns error", async () => {
    const req = supertest(app);

    const res = await req
      .get("/v1/customer/customer-id")
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("GET customer that does not exist returns error", async () => {
    const req = supertest(app);

    const res = await req
      .get("/v1/customer/aee9c930-818e-4845-8dcc-d583b870d8ff")
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("Get customer that does not exist returns error", async () => {
    const req = supertest(app);

    const res = await req
      .get("/v1/customer/aee9c930-818e-4845-8dcc-d583b870d8ff")
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("GET customer returns success", async () => {
    const req = supertest(app);
    CustomerService.getCustomer = jest.fn().mockResolvedValue(customerDataServiceResponse);

    const res = await req
      .get("/v1/customer/aee9c930-818e-4845-8dcc-d583b870d8ff")
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(customerData);
    expect(CustomerService.getCustomer).toHaveBeenCalled();
  });

  test("Create customer with invalid request body returns error", async () => {
    const createCustomerRequest = {
      'name': 'Test customer',
      'type': 'internal'
    }

    CustomerService.saveCustomer = jest.fn().mockResolvedValue(customerData);
    const req = supertest(app);

    const res = await req
      .post("/v1/customer/create")
      .set("Authorization", "token abc")
      .send(createCustomerRequest);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("Create customer successfully", async () => {
    const createCustomerRequest = {
      'name': 'Test customer',
      'type': 'internal',
      'clientId': 'aee9c930-818e-4845-8dcc-d583b870d8ff'
    }

    CustomerService.saveCustomer = jest.fn().mockResolvedValue(customerData);
    const req = supertest(app);

    const res = await req
      .post("/v1/customer/create")
      .set("Authorization", "token abc")
      .send(createCustomerRequest);

    expect(res.status).toBe(200);
    expect(CustomerService.saveCustomer).toHaveBeenCalledWith(createCustomerRequest);
  });

  test("Delete customer successfully", async () => {
    CustomerService.deleteCustomer = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/v1/customer/aee9c930-818e-4845-8dcc-d583b870d8ff`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(CustomerService.deleteCustomer).toHaveBeenCalledWith('aee9c930-818e-4845-8dcc-d583b870d8ff');
  });
});
