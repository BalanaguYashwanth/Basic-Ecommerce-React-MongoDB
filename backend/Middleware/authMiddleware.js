import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const requireAuth = (req, res, next) => {
  const token = req.body.AuthToken;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("error", err.message);
        res.redirect("/login");
      } else {
        //console.log('decodedToken',decodedToken)
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const admin = async (req, res, next) => {
  const user = await User.findById(req.body.id)
  //const { email, password } = req.body;
  //const user = await User.findOne({ email });
  if (user && user.isAdmin === "true") {
    next();
  } else {
    res.sendStatus(404);
  }
};

export { requireAuth, admin };
