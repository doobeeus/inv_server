const express = require("express");
const router = express.Router();
const {
  registerClient,
  getSingleClient,
  getAllClientInfo
} = require("../controllers/clientController");

router.post("/registerclient", registerClient);
router.post("/getsingleclient", getSingleClient);
router.get("/getAllClientInfo", getAllClientInfo);



module.exports = router;