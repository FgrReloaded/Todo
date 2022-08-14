const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const mongoURI = process.env.MONGO_URL;


const connectToMongo =  ()=>{
     mongoose.connect( mongoURI, ()=>{
        console.log('Database connected successfully')
    })
}
module.exports = connectToMongo;

