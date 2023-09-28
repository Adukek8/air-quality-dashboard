const mongoose = require("mongoose");
const connectDB = require("./connect");
const AQIModel = require("../models/aqi.model");

async function initDB() {
    const connection = connectDB();

    // Load your initial data into MongoDB. Here's a basic example:
    const data = [
        {
            location: { type: "Point", coordinates: [-93.2650, 44.9778] }, // Minneapolis coordinates
            //... other AQI data fields
        },
        //... other cities' data
    ];

    try {
        // Insert the data
        await AQIModel.insertMany(data);
        console.log("Data inserted successfully!");
    } catch (error) {
        console.error("Error inserting data:", error);
    }

    connection.close();
}

initDB();