const mongoose = require("mongoose")
const transportationSchema = mongoose.Schema({
    TransportationType: String,
    Destination: String,
    Price: {
        type: Number,
    min: [0, 'Price must be greater than or equal to 0'], // Minimum price allowed
    max: [1000, 'Price cannot exceed 1000'] // Maximum price allowed
}}
)
module.exports = mongoose.model("Transportation",
    transportationSchema)
