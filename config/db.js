const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log(`MongoDB Compass Connected Successfuly`.cyan.underline)
    } catch (err) {
        res.status(500).json({message:err.message})
        process.exit(1)
    }
} 
module.exports = connectDB;