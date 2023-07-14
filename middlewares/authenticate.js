const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" && token === undefined) {
    next(new HttpError(401, "Not authorized. Not token"));
  }
  try {
    const { id } = await jwt.verify(token, SECRET_KEY);
  
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401, "Not authorized. User not found"));
    }
    req.user = user;
    next(); 
  } catch {
    next(new HttpError(401, "Not authorized. Catch error"));
  }
};

module.exports = authenticate;