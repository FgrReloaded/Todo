const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')

connectToMongo();
const app = express()
const port = process.env.PORT || 1000

app.use(cors())
app.use(express.json())


app.use('/auth', require('./routes/auth'))
app.use('/todo', require('./routes/todo'));


app.listen(port,()=>{
    console.log("Connection Success");
})