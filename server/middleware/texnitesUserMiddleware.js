export const isTexnitisUser = (req, res, next) => {
  if (req.userInfo.role !== "user") {
    return res.status(403).json({
      success: false,
      message: "Access denied! User rights required.",
    });
  }

  next();
};