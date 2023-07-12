const asyncHandler = require("express-async-handler");
const invList = require("../models/invModel");

const registerInventory = asyncHandler( async (req, res) => {
    
    const {clientName, buildingName, roomArea, fixtureType, lampType, numLamps, numFixtures, lampWattage} = req.body;

    // validation
    if (!clientName || !roomArea || !fixtureType || !lampType || !numLamps | !numFixtures || !lampWattage) {
        res.status(400);
        //console.log (req.body.name, req.body.email, req.body.password);
        throw new Error("Please fill in all required fields" );
    }

    // check if client already exists
    // const compExists = await Client.findOne({email});

    // if (compExists) {
    //     res.status(400);
    //     throw new Error("Client is already registered");
    // }
    

    // create new user
    const inv = await invList.create({
        clientName, 
        buildingName,
        roomArea, 
        fixtureType, 
        lampType, 
        numLamps, 
        numFixtures, 
        lampWattage
    });

    // generate Token
    // const token = generateToken(user._id);

    // Send HTTP-only cookie
    // res.cookie("token", token, {
    //     path: "/",
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 1000 * 86400), // 1 day
    //     sameSite: "none", // back end and front end can have different URLs
    //     secure: true // https
    // });

    
    if (inv) {
        const {_id, clientName, buildingName, roomArea, fixtureType, lampType, numLamps, numFixtures, lampWattage} = inv;
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
    registerInventory,
};