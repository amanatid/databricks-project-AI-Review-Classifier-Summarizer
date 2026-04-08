import jwt from "jsonwebtoken";

export const storetoken =(req, res, next) => {
  res.locals.user = null;

  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.locals.user = decoded;   // 👈 This makes user available in ALL EJS
    } catch (err) {
    //  console.log(err);
      res.locals.user = null;
    }
  }

  next();
};