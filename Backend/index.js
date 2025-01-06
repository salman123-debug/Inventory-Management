const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv')
const connectdb = require('./config/db')
const path = require("path");

const cookieParser = require('cookie-parser');



dotenv.config();


app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());

connectdb();



app.use('/uploads',express.static(path.join(__dirname,'uploads')));


const userroute = require("./routes/userroutes");

app.use("/user", userroute);

//category 
const categoryRoutes = require('./routes/categoryRoutes');
app.use("/category",categoryRoutes)

//prodect
const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

//category routes
// const categoryRoutes = require("./routes/categoryRoutes");
// app.use("/category", categoryRoutes);

// //product routes
// const productRoutes = require("./routes/productRoutes");
// app.use("/product", productRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server started on this port :${process.env.PORT}`)
})

