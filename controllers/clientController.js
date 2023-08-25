const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");

// create new client
const registerClient = asyncHandler( async (req, res) => {
    
    const {clientName, buildingName, address, contactName, phoneNum, contactEmail, hoursOp} = req.body;

    // validation
    if (!clientName || !buildingName || !address || !contactName || !phoneNum || !contactEmail || !hoursOp ) {
        res.status(400);
        // console.log (req.body.name, req.body.email, req.body.password);
        throw new Error("Please fill in all required fields" );
    }    

    // mongo create new document in client collection
    const client = await Client.create({
        clientName, 
        buildingName,
        address, 
        contactName, 
        phoneNum, 
        contactEmail, 
        hoursOp
    });
    console.log(client);

    if (client) {
        const {_id, clientName, address, contactName, phoneNum, contactEmail, hoursOp} = client;
        res.status(201).json({
            _id,
            clientName, 
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
    try{
        const {_id} = req.body;
        const client = await Client.findById({_id: _id});
        return res.json(client);
    }
    catch(e){
        console.log(e);
    }
});

// return all client info
const getAllClientInfo = asyncHandler(async (req,res) => {
    try{
    const clientData = await Client.find();
    return res.json(clientData);
    }
    catch(error){
        console.log(error);
    }

});

// query client
const queryClient = asyncHandler( async (req, res) => {
    const {clientName} = req.body;

    // validation
    if (!clientName) {
        res.status(400);
    throw new Error("Please add client name.");
    }

    // check if inventory exists
    try{
    const clientData = await Client.find({clientName: clientName });
    if (!clientData.length){
        res.status(400);
        throw new Error("Client not found");
    }
        return res.json(clientData);
    }
    catch(error){
        console.log(error);
    }
});

// delete client by id
const deleteClient = asyncHandler(async (req,res) => {
    const {_id} = req.body;
    try {
        const clientData = await Client.deleteOne({_id: _id})
        return res.json(clientData);
    }
    catch(error){
        console.log(error);
    }
});

// edit client by id
const editClient = asyncHandler(async (req,res) => {
    const { _id,
        clientName, 
        buildingName,
        address, 
        contactName, 
        phoneNum, 
        contactEmail, 
        hoursOp} = req.body;
    try{
        const clientData = await Client.updateOne({_id : _id},
            {$set: {
                clientName: clientName, 
                buildingName: buildingName,
                address: address, 
                contactName: contactName, 
                phoneNum: phoneNum, 
                contactEmail: contactEmail, 
                hoursOp: hoursOp
            },
            $currentDate: { lastUpdated: true }
        })
        return res.json(clientData);

    }
    catch(error){
        console.log(error);
    }
});

module.exports = {
    registerClient,
    getSingleClient,
    getAllClientInfo,
    editClient,
    deleteClient,
    queryClient
};