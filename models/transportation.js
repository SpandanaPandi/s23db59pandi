const mongoose = require("mongoose")
const transportationSchema = mongoose.Schema({
    TransportationType: String,
    Destination: String,
    Price: Number
})
module.exports = mongoose.model("Transportation",
    transportationSchema)