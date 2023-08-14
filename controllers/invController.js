const asyncHandler = require("express-async-handler");
const invList = require("../models/invModel");

const createInventory = asyncHandler( async (req, res) => {
    
    const {clientName, buildingName, roomArea, fixtureType, lampType, numLamps, numFixtures, lampWattage} = req.body;

    // validation
    if (!clientName || !buildingName || !roomArea || !fixtureType || !lampType || !numLamps | !numFixtures || !lampWattage) {
        res.status(400);
        console.log(req.body.clientName, req.body.buildingName, req.body.roomArea);
        throw new Error("Please fill in all required fields" );
    }

    // create new inventory
    const newInv = await invList.create({
        clientName,
        buildingName,
        roomArea, 
        fixtureType, 
        lampType, 
        numLamps, 
        numFixtures, 
        lampWattage
    });
    
    if (newInv) {
        const {_id, clientName, buildingName, roomArea, fixtureType, lampType, numLamps, numFixtures, lampWattage} = newInv;
        res.status(201).json({
            _id,
            clientName,
            buildingName,
            roomArea, 
            fixtureType, 
            lampType, 
            numLamps, 
            numFixtures, 
            lampWattage
        });
    } else {
        res.status(400)
        throw new Error("Invalid inventory data: ", res.status);
    }
});
// return all client info
const getAllInventory = asyncHandler(async (req,res) => {
    try{
    const inv = await invList.find();
    return res.json(inv);
    }
    catch(error){
        console.log(error);
    }

});

// query inventory by clientname, buildingname
const queryInventory = asyncHandler( async (req, res) => {
    const {clientName, buildingName} = req.body;

    // validation
    if (!clientName || !buildingName) {
        res.status(400);
    throw new Error("Please add client name and/or building name.");
    }

    // check if inventory exists
    try{
    const inv = await invList.find({clientName: clientName, buildingName: buildingName });
    if (!inv.length){
        res.status(400);
    throw new Error("Inventory not found");
    }
        return res.json(inv);
    }
    catch(error){
        console.log(error);
    }
});

module.exports = {
    createInventory,
    getAllInventory,
    queryInventory
};