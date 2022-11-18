import {Router} from "express";

import {requireSchema, requireValidUuid} from "../../../api/middlewares/validate.js";
import CustomerService from "../service/customerService.js";
import {getUserClientIdFromRequest} from "../utils/apiUtil.js";
import buildCustomerResponseJson from "./response/buildCustomerResponseJson.js";
import urls from "./router/routes.js";
import {createCustomerSchema} from "./schemas/createCustomerSchema.js";
import {updateCustomerSchema} from "./schemas/updateCustomerSchema.js";

const router = Router();

// List customers
router.get(urls.client.customer.list, async (req, res) => {
  const clientId = getUserClientIdFromRequest(req)
  try {
    const customers = await CustomerService.getAllCustomers(clientId)
    const map = customers.map(customer => buildCustomerResponseJson(customer));

    res.json(map);
  } catch (err) {
    res.status(400).json({
      error: "Failed to fetch customers",
      message: err.message
    });
  }
});

// Save new customer
router.post(urls.client.customer.create, requireSchema(createCustomerSchema), async (req, res) => {
  const customerData = req.validatedBody;
  try {
    const savedCustomer = await CustomerService.saveCustomer(customerData)
    res.json(buildCustomerResponseJson(savedCustomer));
  } catch (err) {
    const responseError = {
      error: "Failed to create a customer",
      message: err.message
    };

    res.status(400).json(responseError);
  }
});

// Get customer
router.get(urls.client.customer.read, requireValidUuid, async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await CustomerService.getCustomer(customerId);

    if (!customer) {
      return res.status(404).json({
        error: "Customer not found",
        message: `Customer ${customerId} does not exist`
      })
    }

    res.json(buildCustomerResponseJson(customer));
  } catch (err) {
    res.status(400).json({
      error: "Failed to fetch customer",
      message: err.message
    });
  }
});

// Update customer
const updateCustomerMiddlewares = [requireValidUuid, requireSchema(updateCustomerSchema)]
router.put(urls.client.customer.update, updateCustomerMiddlewares, async (req, res) => {
  const customerId = req.params.id;
  try {
    const customerData = req.validatedBody;
    const updatedCustomer = await CustomerService.updateCustomer(customerId, customerData);

    res.json(updatedCustomer);
  } catch (err) {
    const responseError = {
      error: "Failed to update a customer",
      message: err.message
    };

    res.status(400).json(responseError);
  }
});

// Delete customer
router.delete(urls.client.customer.delete, requireValidUuid, async (req, res) => {
  const customerId = req.params.id;
  try {
    await CustomerService.deleteCustomer(customerId)
    res.sendStatus(204);
  } catch (err) {
    if (err.code && err.code === "P2025") {
      return res.status(404).json({
        error: "Failed to delete a customer",
        message: "Customer to delete not found"
      })
    }
    res.status(400).json({
      error: "Failed to delete a customer",
      message: err.message
    });
  }
});

export default router;
