const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(
      { _id: req.body.id },
      { password: 0 }
    );
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "getUser Successful",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.statut(500).send({
      success: false,
      message: "Error in get user API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    } else {
      //update user
      const { username, address, phone } = req.body;
      if (username) user.username = username;
      if (address) user.address = address;
      if (phone) user.phone = phone;
      await user.save();
      res.status(200).send({
        success: true,
        message: "User has been updated",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
    });
  }
};
const updatePassword = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    } else {
      //update password
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, salt);
      if (password) user.password = hashedPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Password has been successful",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "No User Found",
      });
    } else {
      await userModel.findByIdAndDelete(id);
      return res.status(200).send({
        success: true,
        message: "User has been deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePassword,
  deleteUserController,
};
