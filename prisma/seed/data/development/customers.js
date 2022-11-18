import find from "lodash/find.js";

const inputCustomers = [
  {
    name: "avis",
    type: "internal"
  }
];

export const seedCustomers = async ({prisma, terminal, clients}) => {
  return await Promise.all(
    inputCustomers.map(async customerData => {

      /** Link customer to the "avis" client */
      const customerClient = find(clients, {name: 'avis'})

      const data = {
        ...customerData,
        ...customerData.name === 'avis' && {client_id: customerClient.id}
      }

      const customer = await prisma.clientCustomer.create({data: data});

      terminal.green(`Created customer || ID - ${customer.id} || Type - ${customer.type}\n`);

      return {id: customer.id, name: customer.name}
    })
  );
}
