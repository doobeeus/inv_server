const express = require("express");
const router = express.Router();
const {
    createInventory,
    // getSingleInventory,
    // getAllInventory
} = require("../controllers/invController");

router.post("/createInv", createInventory);
// router.post("/getSingleInv", getSingleInventory)
// router.get("/getAllInv", getAllInventory);

module.exports = router;