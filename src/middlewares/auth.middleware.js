export const requireRole = (roles) => {
  return (req, res, next) => {
    try {
      const user = req.headers["user"];

      if (!user) {
        return res.status(401).json({ error: "No user provided" });
      }

      const parsedUser = JSON.parse(user);

      if (!roles.includes(parsedUser.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      req.user = parsedUser;

      next();
    } catch (error) {
      return res.status(400).json({ error: "Invalid user header" });
    }
  };
};
