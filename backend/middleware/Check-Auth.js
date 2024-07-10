const jwt = require("jsonwebtoken");

const HttpError = require("../Model/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  let token;

  try {
    // Getting a token from the request.
    token = req.headers.authorization.split(" ")[1]; //headers are provided by express : Authorization = "bearer  token"

    if (!token) {
      throw new Error("Authentication Faild");
    }
    // Decoding and Verifying token.
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    // adding user token to the request dynamically.
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    const err = new HttpError("Authentication Faild", 401);
    return next(err);
  }
};
