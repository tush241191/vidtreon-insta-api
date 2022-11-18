import {PrismaClient} from "@prisma/client";
import logger from 'terminal-kit';

import {seedClients} from "./data/development/clients.js";
import {seedCustomers} from "./data/development/customers.js";
import {seedFacilities} from "./data/development/facilities.js";
import {seedProducers} from "./data/development/producers.js";
import {seedUsers} from "./data/development/users.js";

const prisma = new PrismaClient();
const terminal = logger.terminal;

const handleSeedResp = resp => {
  const separatorChar = '-';
  const separatorStr = separatorChar.repeat(40);

  terminal.green(`\n${separatorStr}\n\n`);

  return resp;
}

const isProductionEnv = () => {
  return process.env.NODE_ENV === 'production';
}

export const seed = async () => {
  const seedDeps = {prisma, terminal}

  if(!isProductionEnv()) {
    seedDeps.users = await seedUsers(seedDeps).then(handleSeedResp);
    seedDeps.producers = await seedProducers(seedDeps).then(handleSeedResp);
    seedDeps.facilities = await seedFacilities(seedDeps).then(handleSeedResp);
    seedDeps.clients = await seedClients(seedDeps).then(handleSeedResp);
    seedDeps.customers = await seedCustomers(seedDeps)
  }
  process.exit(0);
};
seed();
