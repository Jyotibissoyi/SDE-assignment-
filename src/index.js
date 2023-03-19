const express = require("express")
const mongoose = require("mongoose")
const route = require("./Routes/route")
const app = express()
require("dotenv").config()




app.use(express.json())

mongoose.set('strictQuery', true)//Deprication error

mongoose.connect(process.env.DB,
    { useNewUrlParser: true })
    .then(() => console.log(("MongoDb is connected")))
    .catch(err => console.log(err.message))

app.use("/", route)

app.listen(process.env.PORT , function () {
    console.log("Express is running on port " + (process.env.PORT ))
})

console.log("Let's set some task🥰🥰🥰")