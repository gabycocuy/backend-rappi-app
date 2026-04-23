import prisma from "../prisma.js";

export const getProductsByStore = async (req, res) => {
  try {
    const { storeId } = req.query;

    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, storeId } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        storeId,
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
