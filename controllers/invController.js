const asyncHandler = require("express-async-handler");
const invList = require("../models/invModel");

const createInventory = asyncHandler( async (req, res) => {
    
    const {roomArea, fixtureType, lampType, numLamps, numFixtures, lampWattage} = req.body;

    // validation
    if (!roomArea || !fixtureType || !lampType || !numLamps | !numFixtures || !lampWattage) {
        res.status(400);
        //console.log (req.body.name, req.body.email, req.body.password);
        throw new Error("Please fill in all required fields" );
    }

    // create new inventory
    const newInv = await invList.create({
        roomArea, 
        fixtureType, 
        lampType, 
        numLamps, 
        numFixtures, 
        lampWattage
    });
    
    if (newInv) {
        const {_id, roomArea, fixtureType, lampType, numLamps, numFixtures, lampWattage} = inv;
        res.status(201).json({
            _id,
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