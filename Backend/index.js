const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv')
const connectdb = require('./config/db')
const path = require("path");

app.use(cors());
app.use(express.json());

dotenv.config();

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

connectdb();

const userRoutes = require("./routes/userroutes");

app.use("/user", userRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server started on this port :${process.env.PORT}`)
})

