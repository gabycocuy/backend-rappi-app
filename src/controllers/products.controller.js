import prisma from "../prisma.js";

export const getProductsByStore = async (req, res) => {
  try {
    const { storeId } = req.query;

    const products = await prisma.product.findMany({
      where: {
        storeId: storeId,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
