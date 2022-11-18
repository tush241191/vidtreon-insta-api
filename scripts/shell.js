import repl from "repl";

import app from "../src/app.js";
import {
  Client,
  Producer,
  ProducerFacility,
  ProducerFacilityCredit,
  ProducerFacilityInput,
  ProducerFacilityInputMeta,
  ProducerFacilityMeta,
  ProducerLog,
  Purchase,
  User
} from "../src/models/init.js";
import ClientService from "../src/services/client.js";
import ProducerService from "../src/services/producer.js";
import ProducerFacilityService from "../src/services/producerFacility.js";
import ProducerFacilityCreditService from "../src/services/producerFacilityCredit.js";
import ProducerFacilityInputService from "../src/services/producerFacilityInput.js";
import ProducerFacilityInputMetaService from "../src/services/producerFacilityInputMeta.js";
import ProducerFacilityMetaService from "../src/services/producerFacilityMeta.js";
import ProducerLogService from "../src/services/producerLog.js";
import PurchaseService from "../src/services/purchase.js";
import PurchaseLogService from "../src/services/purchaseLog.js";
import UserService from "../src/services/user.js";
import config from "../src/utils/config.js";

const main = async () => {
  process.stdout.write("Database and Express app initialized.\n");
  process.stdout.write("Auto-imported modules: config, app, models, services\n");

  const r = repl.start("> ");
  r.context.config = config;
  r.context.app = app;
  r.context.models = {
    User,
    Client,
    ProducerFacility,
    ProducerFacilityCredit,
    ProducerFacilityInput,
    ProducerFacilityMeta,
    ProducerFacilityInputMeta,
    Producer,
    ProducerLog,
    Purchase
  };
  r.context.services = {
    UserService,
    ClientService,
    ProducerFacilityService,
    ProducerFacilityCreditService,
    ProducerFacilityInputService,
    ProducerFacilityMetaService,
    ProducerFacilityInputMetaService,
    ProducerService,
    ProducerLogService,
    PurchaseService,
    PurchaseLogService
  };

  r.on("exit", () => {
    process.exit();
  });

  r.setupHistory(".shell_history", () => {});
};

main();
