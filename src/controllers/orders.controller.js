import prisma from "../prisma.js";

export const createOrder = async (req, res) => {
  try {
    const { consumerId, storeId, items } = req.body;

    const order = await prisma.order.create({
      data: {
        consumerId,
        storeId,
        status: "PENDING",
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConsumerOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: {
        consumerId: userId,
      },
      include: {
        items: true,
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailableOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        items: true,
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryId } = req.body;

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        deliveryId,
        status: "ACCEPTED",
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDeliveryOrders = async (req, res) => {
  try {
    const { deliveryId } = req.params;

    const orders = await prisma.order.findMany({
      where: {
        deliveryId,
      },
      include: {
        items: true,
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStoreOrders = async (req, res) => {
  try {
    const { storeId } = req.params;

    const orders = await prisma.order.findMany({
      where: {
        storeId,
      },
      include: {
        items: true,
        consumer: true,
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
