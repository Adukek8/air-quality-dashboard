const mongoose = require("mongoose");

const AQISchema = new mongoose.Schema({
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    // Other AQI related fields go here...
});

// Create a geospatial index on the location field
AQISchema.index({ "location": "2dsphere" });

const AQIModel = mongoose.model("AQIData", AQISchema);

module.exports = AQIModel;