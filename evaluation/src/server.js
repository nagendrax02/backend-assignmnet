const express = require('express');
const connect = require('./config/db');

const {register,login, getUser}  = require('./controllers/user.controller')
const productController = require("./controllers/product.controller")
const studentController = require("./controllers/student.controller")

const lectureController = require("./controllers/lecture.controller")

const bodyParser = require('body-parser');
const app = express();
app.use((express.json()));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", register);
app.post("/login", login);
app.get("/users",getUser)

app.use("/products", productController)

app.use("/students", studentController);

app.use("/lectures", lectureController)

app.listen(2345,async function () {
    await connect();
    console.log('listening to port 2345')
})