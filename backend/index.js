const express=require('express')
const cors = require('cors')
const app=express()
const port=5000
const mongoDB=require('./db')
mongoDB();
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello world!")
})

app.use('/api',require("./Routes/CreateUser")); 
app.use('/api',require("./Routes/DisplayData")); 
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})