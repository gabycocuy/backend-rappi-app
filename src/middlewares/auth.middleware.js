export const requireRole = (roles) => {
  return (req, res, next) => {
    const userId = req.headers["x-user-id"];
    const userRole = req.headers["x-user-role"];

    if (!userId || !userRole) {
      return res.status(401).json({ error: "Missing headers" });
    }

    if (!roles.includes(userRole.toLowerCase())) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = {
      id: userId,
      role: userRole.toLowerCase(),
    };

    next();
  };
};
