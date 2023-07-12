const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const clientRoute = require("./routes/clientRoute");
const invRoute = require("./routes/invRoute");
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


// routes middleware
app.use("/api/users", userRoute);
app.use("/api/clients", clientRoute);
app.use("/api/inventories", invRoute);

// routes
app.get("/", (req, res) => {
    res.send("Home page");
});

// error middleware
app.use(errorHandler);

//connects to mongo db and start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server connected and running on port:", PORT)
        })
    })
    .catch((err) => console.log(err));