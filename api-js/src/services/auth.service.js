const jwt = require("jsonwebtoken");
const config = require("./../config/jwt.config");
const User = require("./../models/user.model");
const moment = require("moment");

const isAuthentificate = async (req, res, next) => {
  try {
    const token = req
      .header("Authorization")
      .replace("Bearer ", "")
      .trim();
    const { id, iat } = jwt.verify(token, config.secret);
    const iatMoment = moment.unix(iat).add(1, "hours"); // Durée token : 1h
    if (iatMoment >= moment()) {
      const user = await User.findOne({ email: id });
      if (!user) {
        res.status(401).json({ message: "User non trouvé." });
      }
      next();
    } else {
      res.status(401).json({ message: "Token expiré." });
    }
  } catch (error) {
    res.status(401).json({ message: "Connexion obligatoire." });
  }
};

module.exports = {
  isAuthentificate
};
