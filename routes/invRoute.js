const express = require("express");
const router = express.Router();
const {
    registerInventory,
} = require("../controllers/invController");

router.post("/register", registerInventory);

module.exports = router;