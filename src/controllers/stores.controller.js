import prisma from "../prisma.js";

export const getStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      where: {
        isOpen: true,
      },
      include: {
        products: true,
      },
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    const updated = await prisma.store.update({
      where: { id: storeId },
      data: {
        isOpen: !store.isOpen,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
