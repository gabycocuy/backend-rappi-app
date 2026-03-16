import prisma from "../prisma.js";

export const getStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        products: true,
      },
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
