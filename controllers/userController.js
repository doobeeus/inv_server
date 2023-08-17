const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body;

    // validation
    if (!name || !email || !password) {
        res.status(400);
        //console.log (req.body.name, req.body.email, req.body.password);
        throw new Error("Please fill in all required fields" );
    }
    else if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be over 6 characters");
    }

    // check if user already exists
    const userExists = await User.findOne({email});
    console.log(userExists);
    if (userExists) {
        res.status(400);
        throw new Error("Email is already registered");
    }
    

    // create new user
    const user = await User.create({
        name,
        email,
        password
    });

    // generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none", // back end and front end can have different URLs
        secure: true // https
    });

    
    if (user) {
        const {_id, name, email} = user;
        res.status(201).json({
            _id,
            name,
            email,
            token
        });
    } else {
        res.status(400)
        throw new Error("Invalid user data: ", res.status);
    }   
});

// login user
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;

    // validation
    if (!email || !password) {
        res.status(400);
    throw new Error("Please add email or password");
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user){
        res.status(400);
    throw new Error("User not found");
    }

    // User exists, check password
    const passwordCorrect = await bcrypt.compare(password, user.password);

    // Generate token
    const token = generateToken(user._id);

    if(passwordCorrect){
        // Send HTTP-only cookie
        res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none", // back end and front end can have different URLs
        secure: true // https
    });
    }

    if (user && passwordCorrect){
        const {_id, name, email} = user;
        res.status(200).json({
            _id,
            name,
            email,
            token
        });
    } else {
        res.status(400).json({
            status: 'failure'
        });
        throw new Error("Invalid email or password: "), res.status;
    }
});


// logout user
const logout = asyncHandler (async (req, res) => {

    // clears cookie
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // setting the date to expire immediately
        sameSite: "none", // back end and front end can have different URLs
        secure: true // https
    });
    return res.status(200).json({ message: "Successfully logged out"});
});

// get User Data
const getUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const {_id, name, email} = user;
        res.status(201).json({
            _id,
            name,
            email
        });
    } else {
        res.status(400)
        throw new Error("Invalid user data");
    }
})

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser
};