const expres = require("express");
const connect = require("../src/cofig/db")
const productController = require("../src/controller/product.controller");


const app =expres();

app.use("/products", productController); 
app.listen(2345,  async function(){
    await connect();
    console.log('listeniig to port 2345')
})