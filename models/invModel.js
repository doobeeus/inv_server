const mongoose = require("mongoose");

const invSchema = mongoose.Schema(
  {
    // clientName: {
    //     type: String,
    //     required: [true, "Please add a client name"]
    // },
    // buildingName: {
    //     type: String,
    //     required: [true, "Please add a building name"]
    // },
    roomArea: {
      type: String,
      required: [true, "Please add room/area name"],
    },
    fixtureType: {
      type: String,
      required: [true, "Please add fixture type"],
    },
    lampType: {
      type: String,
      required: [true, "Please add lamp type"],
    },
    numLamps: {
        type: String,
        required: [true, "Please add number of lamps"],
    },
    numFixtures: {
        type: String,
        required: [true, "Please add number of fixtures"],
      },
    lampWattage: {
        type: String,
        required: [true, "Please add lamp wattage"]
    }
    
  },
  {
    timestamps: true,
  }
);

const invList = mongoose.model("Inventory", invSchema);
module.exports = invList;