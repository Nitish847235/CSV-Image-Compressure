const mongoose = require("mongoose")

const url = process.env.DB_URL;

const dbConnection = ()=>{
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("mongoDB connection successFully",url);
    }).catch((err)=>{
        console.log("Error in mongoDB connection", err);
    })
}

module.exports = dbConnection;