const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv')
const connectdb = require('./config/db')
const path = require("path");

const cookieParser = require('cookie-parser');




app.use(cors({
    origin: 'http://localhost:5173', // Specify the exact origin
    credentials: true,
}));
app.use(express.json());

dotenv.config();
app.use(cookieParser());


app.use('/uploads',express.static(path.join(__dirname,'uploads')));

connectdb();

const userRoutes = require("./routes/userroutes");
app.use("/user", userRoutes);

//category routes
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/category", categoryRoutes);

//product routes
const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server started on this port :${process.env.PORT}`)
})

