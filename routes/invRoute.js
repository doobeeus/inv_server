const express = require("express");
const router = express.Router();
const {
    createInventory,
} = require("../controllers/invController");

router.post("/createInv", createInventory);

module.exports = router;