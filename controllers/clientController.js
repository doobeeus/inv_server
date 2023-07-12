const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");

const registerClient = asyncHandler( async (req, res) => {
    
    const {compName, address, contactName, phoneNum, email, hoursOp} = req.body;

    // validation
    if (!compName || !address || !contactName || !phoneNum || !email || !hoursOp ) {
        res.status(400);
        //console.log (req.body.name, req.body.email, req.body.password);
        throw new Error("Please fill in all required fields" );
    }

    // check if client already exists
    const compExists = await Client.findOne({email});

    if (compExists) {
        res.status(400);
        throw new Error("Client is already registered");
    }
    

    // create new user
    const client = await Client.create({
        compName, 
        address, 
        contactName, 
        phoneNum, 
        email, 
        hoursOp
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

    
    if (client) {
        const {_id, compName, address, contactName, phoneNum, email, hoursOp} = client;
        res.status(201).json({
            _id,
            compName, 
            address, 
            contactName, 
            phoneNum, 
            email, 
            hoursOp
        });
    } else {
        res.status(400)
        throw new Error("Invalid user data: ", res.status);
    }
});

module.exports = {
    registerClient,
};