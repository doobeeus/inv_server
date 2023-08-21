const express = require("express");
const router = express.Router();
const {
    createInventory,
    queryInventory,
    getAllInventory,
    deleteInventory,
    editInventory,
    getOneInventory
} = require("../controllers/invController");

router.post("/createInv", createInventory);
router.post("/queryInv", queryInventory);
router.get("/getAllInv", getAllInventory);
router.post("/deleteInv", deleteInventory);
router.post("/editInv", editInventory);
router.post("/getoneinv", getOneInventory)

module.exports = router;