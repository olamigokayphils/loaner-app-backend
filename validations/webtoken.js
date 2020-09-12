const jsonwebtoken = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization-Token");
  if (!token) return res.status(401).send("Unauthorized resource");

  try {
    const verified = jsonwebtoken.verify(token, process.env.JSON_WEB_TOKE_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Authorization details");
  }
};
