
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const {

 
  validateString,
  validateEmail,
  validatePassword,
  validateRequest,
  validateNumber,
  passwordLength,
 
} = require("../validator/validator");





/**********************************************AUTHENTICATION*******************************************/
const Authentication = function (req, res, next) {
  try {
    if(!req.headers.authorization) {
        return res.status(401).send({ status: false, message: "Missing authentication token in request " });
      }

    let token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.decode(token);
   
    if (!decoded) {
      return res.status(401).send({ status: false, message: "Invalid authentication token in request headers " })
    }
    if (Date.now() > (decoded.exp) * 1000) {
      return res.status(401).send({ status: false, message: "Session expired! Please login again " })
    }

    
    jwt.verify(token, "mohit40", function (err, decoded) {
      if (err) {
        return res.status(401).send({ status: false, message: "Invalid Token" });
      }
      else {
        req.userId = decoded.userId;
        return next();
      }
    });

  }
  catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};





module.exports = {Authentication}