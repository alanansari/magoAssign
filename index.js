const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors=require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(express.json());
app.use(cors({origin:true}));

mongoose.connect(process.env.DB_URI)
.then(()=>{
    app.listen(process.env.PORT);
    console.log(`connected to port: ${process.env.PORT}`);
})
.catch((err)=>{
    console.log(err);
});

app.use('/api',urlRoutes);