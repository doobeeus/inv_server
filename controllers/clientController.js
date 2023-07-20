const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");

// create new client
const registerClient = asyncHandler( async (req, res) => {
    
    const {compName, buildingName, address, contactName, phoneNum, contactEmail, hoursOp} = req.body;

    // validation
    if (!compName || !buildingName || !address || !contactName || !phoneNum || !contactEmail || !hoursOp ) {
        res.status(400);
        // console.log (req.body.name, req.body.email, req.body.password);
        throw new Error("Please fill in all required fields" );
    }    

    // mongo create new document in client collection
    const client = await Client.create({
        compName, 
        buildingName,
        address, 
        contactName, 
        phoneNum, 
        contactEmail, 
        hoursOp
    });
    console.log(client);

    if (client) {
        const {_id, compName, address, contactName, phoneNum, contactEmail, hoursOp} = client;
        res.status(201).json({
            _id,
            compName, 
            buildingName,
            address, 
            contactName, 
            phoneNum, 
            contactEmail, 
            hoursOp
        });
        console.log(client);
    } else {
        res.status(400)
        throw new Error("Invalid client data: ", res.status);
    }
});

// return single client info
// going to be used to link inventories to clients
const getSingleClient = asyncHandler(async (req,res) => {
    const {id }= req.body;

    const client = await Client.findById(req.body.id);
    console.log(client);
    if (client) {
        const {
            _id,
            compName, 
            buildingName,
            address, 
            contactName, 
            phoneNum, 
            contactEmail, 
            hoursOp} = client;
        res.status(201).json({
            _id,
            compName, 
            buildingName,
            address, 
            contactName, 
            phoneNum, 
            contactEmail, 
            hoursOp
        });
    } else {
        res.status(400)
        throw new Error("Invalid client data");
    }
});

// return all client info
const getAllClientInfo = asyncHandler(async (req,res) => {
    const client = await Client.find(); // {} finds all 
    res.json(client);

});

module.exports = {
    registerClient,
    getSingleClient,
    getAllClientInfo
};