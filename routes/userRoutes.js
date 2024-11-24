const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePassword,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
router.get("/getUser", authMiddleware, getUserController);
router.put("/updateUser", authMiddleware, updateUserController);
router.put("/updatePassword", authMiddleware, updatePassword);
router.delete("/deleteUser/id/:id", authMiddleware, deleteUserController);

module.exports = router;
