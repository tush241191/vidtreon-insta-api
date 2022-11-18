import {Router} from "express";

import ContractService from "../service/contractService.js";
import urls from "./router/routes.js";

const router = Router();

router.get(urls.contract.list, async (req, res) => {
  try {
    const producer = req.user.linkProducer
    const producerContractList = await ContractService.getProducerContractList(producer)
    if (!producerContractList) {
      return res.json([]);
    }
    res.json(producerContractList);
  } catch (err) {
    res.status(400).json({
      error: "Failed to fetch vehicle",
      message: err.message
    });
  }
});

export default router;
