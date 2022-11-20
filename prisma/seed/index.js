import {PrismaClient} from "@prisma/client";
import logger from 'terminal-kit';

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
  }
  process.exit(0);
};
seed();
