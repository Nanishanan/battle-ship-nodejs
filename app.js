const express = require('express')
const app = express()

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/public")
})

app.listen(3000, ()=>{
    console.log("Server Connected to Port 3000")
})