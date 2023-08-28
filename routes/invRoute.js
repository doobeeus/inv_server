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
const protect = require("../middleWare/authMiddleware");

router.post("/createInv", protect, createInventory);
router.post("/queryInv", protect, queryInventory);
router.get("/getAllInv", protect, getAllInventory);
router.post("/deleteInv", protect, deleteInventory);
router.post("/editInv", protect, editInventory);
router.post("/getoneinv", protect, getOneInventory)

module.exports = router;