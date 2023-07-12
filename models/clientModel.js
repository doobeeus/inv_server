const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    compName: {
      type: String,
      required: [true, "Please add a company name"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    contactName: {
      type: String,
      required: [true, "Please add Name of Contact"],
    },
    phoneNum: {
        type: String,
        required: [true, "Please add a phone number"],
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    "Please add a valid phone number"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email",
        ],
      },
    hoursOp: {
        type: String,
        required: [true, "Please add hours of operation"]
    }
    
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;