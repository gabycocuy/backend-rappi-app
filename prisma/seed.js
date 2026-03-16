import prisma from "../src/prisma.js";

async function main() {
  // CONSUMER
  const consumer = await prisma.user.create({
    data: {
      name: "Test Consumer",
      email: "consumer@test.com",
      password: "1234",
      role: "consumer",
    },
  });

  // DELIVERY
  const delivery = await prisma.user.create({
    data: {
      name: "Test Delivery",
      email: "delivery@test.com",
      password: "1234",
      role: "delivery",
    },
  });

  // STORE USER 1
  const storeUser1 = await prisma.user.create({
    data: {
      name: "Pizza Owner",
      email: "pizza@test.com",
      password: "1234",
      role: "store",
    },
  });

  // STORE USER 2
  const storeUser2 = await prisma.user.create({
    data: {
      name: "Burger Owner",
      email: "burger@test.com",
      password: "1234",
      role: "store",
    },
  });

  // STORES
  const pizzaStore = await prisma.store.create({
    data: {
      name: "Pizza Planet",
      userId: storeUser1.id,
      isOpen: true,
    },
  });

  const burgerStore = await prisma.store.create({
    data: {
      name: "Burger House",
      userId: storeUser2.id,
      isOpen: true,
    },
  });

  // PRODUCTS
  await prisma.product.createMany({
    data: [
      {
        name: "Pepperoni Pizza",
        price: 30000,
        storeId: pizzaStore.id,
      },
      {
        name: "Hawaiian Pizza",
        price: 28000,
        storeId: pizzaStore.id,
      },
      {
        name: "Cheese Burger",
        price: 20000,
        storeId: burgerStore.id,
      },
      {
        name: "Double Burger",
        price: 25000,
        storeId: burgerStore.id,
      },
    ],
  });

  console.log("🌱 Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
