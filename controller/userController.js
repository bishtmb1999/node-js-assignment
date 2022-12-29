const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const {
  checkValue,
  validateEmail, 
  isValidObjectId,
  validatePassword,
  validateRequest,
  validateNumber,
  passwordLength,
 
} = require("../validator/validator");


const validator = require('validator')



/************************************************CREATE USER API*******************************************/

const createUser = async (req, res) => {
    try{
      let files = req.files;
      let data = req.body;
  
      // VALIDATIONS STARTS
      if (!validator.isValidRequest(data)) {
        return res
          .status(400)
          .send({ status: false, message: "Body can not be empty" });
      }
  
      let { fname, lname, email,  phone, password, } = data;
  
      if (!validator.isValidValue(fname)) {
        return res
          .status(400)
          .send({ status: false, message: "Fname is required" });
      }
  
      if (!validator.isValidName(fname)) {
        return res.status(400).send({
          status: false,
          message:
            "Fname may contain only letters. Digits & Spaces are not allowed ",
        });
      }
  
      if (!validator.isValidValue(lname)) {
        return res
          .status(400)
          .send({ status: false, message: "Lname is required" });
      }
  
      if (!validator.isValidName(lname)) {
        return res.status(400).send({
          status: false,
          message:
            "Lname may contain only letters. Digits & Spaces are not allowed",
        });
      }
  
      if (!validator.isValidValue(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Email is required" });
      }
  
      if (!validator.isValidEmail(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Entered email is invalid" });
      }
  
      let emailExist = await userModel.findOne({ email });
      if (emailExist) {
        return res
          .status(400)
          .send({ status: false, message: "This email already exists" });
      }
  
      if (!validator.isValidValue(phone)) {
        return res
          .status(400)
          .send({ status: false, message: "Phone is required" });
      }
  
      if (!validator.isValidPhone(phone)) {
        return res
          .status(400)
          .send({ status: false, message: "Entered phone number is invalid" });
      }
  
      let phoneExist = await userModel.findOne({ phone });
      if (phoneExist) {
        return res
          .status(400)
          .send({ status: false, message: "Phone number already exists" });
      }
  
      if (!validator.isValidValue(password)) {
        return res
          .status(400)
          .send({ status: false, message: "password is required" });
      }
  
      if (password.length < 8 || password.length > 15) {
        return res.status(400).send({
          status: false,
          message: "password length should be between 8 to 15",
        });
      }
      let userCreated = await userModel.create(user)
      res.status(201).send({
          status: true,
          message: "Success",
          data: userCreated
      })

    }catch (error) {
      return res.status(500).send({ status: false, message: error.message })

  }
};
////////////////////////Login Api////////////////

let userLogin = async function (req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        if (!validator.isValidValue(email)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }
        if (!validator.isValidValue(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        let user = await userModel.findOne({ email: email, password: password });
        if (!user)
            return res.status(400).send({
                status: false,
                message: "email or the password is not correct",
            });
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            "mohit40"
        );

        res.status(200).send({ status: true, message: "Success", data:{token: token} });
    }
    catch (err) {

        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = { createUser, userLogin }


  
