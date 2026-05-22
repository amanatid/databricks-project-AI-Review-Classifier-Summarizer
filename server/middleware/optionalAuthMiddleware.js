import jwt from "jsonwebtoken";

export const optionalAuthMiddleware = (
  req,
  res,
  next
) => {

  const token = req.cookies.token;

  // Guest user
  if (!token) {

    req.userInfo = null;

    return next();
  }

  try {

    const decodedTokenInfo = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    console.log(
      "decoded info",
      decodedTokenInfo
    );

    req.userInfo = decodedTokenInfo;

  } catch (err) {

    req.userInfo = null;

  }

  next();
};