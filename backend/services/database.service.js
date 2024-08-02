const mongoose = require("mongoose");

async function connect(){
    try{
        await mongoose.connect(process.env.URL);
        console.log("connected to database...");
    }
    catch(error){
        throw error;
    }
} 

module.exports.connect = connect;