const redis = require("redis");
const JWTR = require("jwt-redis").default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);
//const jsonwebtoken = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization-Token");
  if (!token) return res.status(401).send("Unauthorized resource");

  try {
    const verified = await jwtr.verify(token, process.env.JSON_WEB_TOKE_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Authorization details");
  }
};
