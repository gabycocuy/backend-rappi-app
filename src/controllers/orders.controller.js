import prisma from "../prisma.js";

export const createOrder = async (req, res) => {
  try {
    const { consumerId, storeId, lat, lng } = req.body;

    console.log("BODY:", req.body);

    if (!consumerId || !storeId || lat == null || lng == null) {
      return res.status(400).json({
        error: "Missing data",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: consumerId },
    });

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!user) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }

    if (!store) {
      return res.status(400).json({
        error: "Store does not exist",
      });
    }

    const order = await prisma.order.create({
      data: {
        consumerId,
        storeId,
        status: "Creado",
        destination_lat: Number(lat),
        destination_lng: Number(lng),
      },
    });

    res.json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getConsumerOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: { consumerId: userId },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailableOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { deliveryId: null },
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
      where: { id: orderId },
      data: {
        deliveryId,
        status: "En entrega",
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
      where: { deliveryId },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderPosition = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { lat, lng } = req.body;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        delivery_lat: lat,
        delivery_lng: lng,
      },
    });

    const distance =
      Math.abs(order.delivery_lat - order.destination_lat) +
      Math.abs(order.delivery_lng - order.destination_lng);

    if (distance < 0.001) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "Entregado" },
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
