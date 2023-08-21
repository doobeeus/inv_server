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
// return all inv info
const getAllInventory = asyncHandler(async (req,res) => {
    try{
    const inv = await invList.find();
    return res.json(inv);
    }
    catch(error){
        console.log(error);
    }

});

// get inv by id
const getOneInventory = asyncHandler(async (req,res) => {
    try{
        const {_id} = req.body;
        const inv = await invList.find({_id: _id});
        return res.json(inv);
    }
    catch(e){
        console.log(e);
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

const deleteInventory = asyncHandler(async (req,res) => {
    const {_id} = req.body;
    try {
        const inv = await invList.deleteOne({_id: _id})
        return res.json(inv);
    }
    catch(error){
        console.log(error);
    }
});
const editInventory = asyncHandler(async (req,res) => {
    const {_id, clientName, buildingName, roomArea, fixtureType, lampType, numLamps, numFixtures, lampWattage} = req.body;
    try{
        const inv = await invList.updateOne({_id : _id},
            {$set: {
                clientName: clientName, 
                buildingName: buildingName, 
                roomArea: roomArea, 
                fixtureType: fixtureType, 
                lampType: lampType, 
                numLamps: numLamps, 
                numFixtures: numFixtures, 
                lampWattage: lampWattage
            },
            $currentDate: { lastUpdated: true }
        })
        return res.json(inv);

    }
    catch(error){
        console.log(error);
    }
});

module.exports = {
    createInventory,
    getAllInventory,
    getOneInventory,
    queryInventory,
    deleteInventory,
    editInventory
};