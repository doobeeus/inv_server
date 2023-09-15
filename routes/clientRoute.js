const express = require("express");
const router = express.Router();
const {
  registerClient,
  getSingleClient,
  getAllClientInfo,
  editClient,
  deleteClient,
  queryClient
} = require("../controllers/clientController");

const protect = require("../middleWare/authMiddleware");
const admin = require("../middleWare/adminMiddleware");

router.post("/registerclient", protect, registerClient);
router.post("/getsingleclient", protect, getSingleClient);
router.get("/getAllClientInfo", protect, getAllClientInfo);
router.post("/editclient", admin, editClient);
router.post("/deleteclient", admin, deleteClient);
router.post("/queryclient", protect, queryClient);

module.exports = router;