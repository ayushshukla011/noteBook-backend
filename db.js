const mongoose = require('mongoose');
require('dotenv').config();



const uri=process.env.DATABASE_URL;
const connectToMongo=()=>{
    mongoose.connect(uri)
}
module.exports=connectToMongo;