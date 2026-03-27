import  jwt  from "jsonwebtoken";

export const authMiddleware1 = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
      return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
    
  }

  //decode this token
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded info",decodedTokenInfo);
    req.userInfo = decodedTokenInfo; // for protected routes
    next();
  } catch (error) {
    res.locals.user = null;
    return res.status(500).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }
};


export const authMiddleware = (req, res, next) => {
 // console.log("Cookies:", req.cookies);

  const token = req.cookies.token;

  if (!token) {
   // console.log("NO TOKEN FOUND");
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = decoded;
   console.log("decodeTokenMiddleaware", req.userInfo );
 
    next();
  } catch (error) {
   // console.log("TOKEN INVALID");
    return res.redirect("/login");
  }
};