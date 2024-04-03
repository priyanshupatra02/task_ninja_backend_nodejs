const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

function verifyBearerToken(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const existingJwt = User.findById({ _id: decoded.id });

      if (!existingJwt) {
        return res.status(401).json({ error: "Jwt expired" });
      }

      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    return res.status(401).json({
      error: "Access denied, please add authorization token properly",
    });
  }
}

module.exports = verifyBearerToken;
