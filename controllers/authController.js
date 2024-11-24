const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const JWT = require("jsonwebtoken");
//registerController
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    //validation
    if (!username || !email || !password || !phone) {
      res.status(500).send({
        success: false,
        message: "Mandatory Field is missing",
        error,
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already Exists",
        error,
      });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while registering User",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Email or login is not provided",
      });
    } else {
      const user = await userModel.findOne({
        email: email,
      });
      const isMatch = await bcrypt.compare(password, user.password);

      if (!user || !isMatch) {
        res.status(404).send({
          success: false,
          message: "Invalid Email/Password",
        });
      } else {
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        user.password = undefined;
        res.status(200).send({
          success: true,
          message: "Login Successfully",
          token,
          user,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
    });
  }
};

module.exports = { registerController, loginController };
