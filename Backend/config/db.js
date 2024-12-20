const mongoose = require('mongoose');


const connectdb =async ()=>{
    // const MONGO_URI = 'mongodb://localhost:/27017/Inventory'
    if(!process.env.MONGO_URI){
        console.error('Mongo uri not declared ');
        process.exit(1);
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectdb