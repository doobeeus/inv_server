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

router.post("/registerclient", registerClient);
router.post("/getsingleclient", getSingleClient);
router.get("/getAllClientInfo", getAllClientInfo);
router.post("/editclient", editClient);
router.post("/deleteclient", deleteClient);
router.post("/queryclient", queryClient);



module.exports = router;