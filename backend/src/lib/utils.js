import jwt from "jsonwebtoken";

export const generateToken = (adminId, res) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, //PREVENT XSS ATTACKS CROSS-SITE SCRIPTING ATTACKS
    sameSite: "strict", //CSRF ATTACKS CROSS-SITE REQUEST FORGERY ATTACKS
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
