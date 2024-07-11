const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

// Define your routes here
app.use('/',require('./routes/authRoutes'))

app.listen(3000)
console.log("running on 3000")

//xaDDUgodymdnDCnX mongdb password
// aazizsigar username 
// mongodb+srv://aazizsigar:xaDDUgodymdnDCnX@echorisecluster.oph7ozl.mongodb.net/?retryWrites=true&w=majority&appName=echorisecluster