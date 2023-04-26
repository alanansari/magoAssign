const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors=require('cors');
const userRoutes = require('./routes/userRoutes');
const urlRoutes = require('./routes/urlRoutes');
const {errorMiddleware} = require('./middleware/errors');

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

app.use(errorMiddleware);

app.use('/api',userRoutes,errorMiddleware);
app.use('/',urlRoutes,errorMiddleware);