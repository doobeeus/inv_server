const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
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
app.use(cors());

// routes middleware
app.use("/api/users", userRoute);

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