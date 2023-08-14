const express = require("express");
const router = express.Router();
const {
    createInventory,
    queryInventory,
    getAllInventory
} = require("../controllers/invController");

router.post("/createInv", createInventory);
router.post("/queryInv", queryInventory);
router.get("/getAllInv", getAllInventory);

module.exports = router;