import prisma from "../prisma.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, storeName } = req.body;

    // validar rol permitido
    const allowedRoles = ["consumer", "delivery", "store"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const data = {
      name,
      email,
      password,
      role,
    };

    // solo si es store se crea la tienda
    if (role === "store") {
      if (!storeName) {
        return res.status(400).json({ error: "Store name required" });
      }

      data.store = {
        create: {
          name: storeName,
        },
      };
    }

    const user = await prisma.user.create({
      data,
      include: {
        store: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { store: true },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
