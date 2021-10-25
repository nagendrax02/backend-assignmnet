const express = require("express");
const  connect  = require("../src/config/db");
const app = express();
const userController = require('../src/controllers/user.controller')

app.use(express.json());

app.use("/users", userController);

app.listen(2345, async function (){
    await connect();
    console.log('listening to port 2345')
})