import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt",token,{
    maxAge: 15 * 24 * 60 * 60 * 1000,  //in ms
    httpOnly: true,    //prevent XSS attacks
    sameSite: "strict",    //CSRF attacks are prevented
    secure: process.env.NODE_ENV === "production" ? true : false
  })
};

export default generateTokenandSetCookie;
