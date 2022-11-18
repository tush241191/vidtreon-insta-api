import Prisma from "@prisma/client";

// PrismaClient is not available when testing
const {PrismaClient} = Prisma || {};
const prisma = PrismaClient ? new PrismaClient() : {};

export const User = prisma.user;
export const Client = prisma.client;
export const Customer = prisma.clientCustomer;
export const CustomerVehicle = prisma.clientCustomerVehicle;
export const Producer = prisma.producer;
export const ProducerFacility = prisma.producerFacility;
export const ProducerFacilityCredit = prisma.producerFacilityCredit;
export const ProducerFacilityInput = prisma.producerFacilityInput;
export const ProducerFacilityInputMeta = prisma.ProducerFacilityInputMeta;
export const ProducerFacilityMeta = prisma.producerFacilityMeta;
export const ProducerLog = prisma.producerLog;
export const Purchase = prisma.purchase;
export const PurchaseLog = prisma.purchaseLog;
export const VehicleCache = prisma.customerVehicleCache;
