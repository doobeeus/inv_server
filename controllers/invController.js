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

module.exports = {
    createInventory,
};