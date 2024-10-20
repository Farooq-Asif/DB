require("dotenv").config()
const cors= require("cors")

const express = require('express')

const app = express()

const apiUrl = process.env.REACT_APP_API_URLT || 5000;

const connectDB = require('./db/connect')

const corsOrigin = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOrigin));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi, i am live")
})
const products_routes = require("./routes/products")
const Login_routes = require("./routes/LoginData")
const Sign_Up_routes = require("./routes/SignUpData")
const Product_Add_routes = require("./routes/products")
app.use("/api/products", products_routes)
app.use("/api/login", Login_routes)
app.use("/api/signup", Sign_Up_routes)
app.use("/api/product/add", Product_Add_routes)


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)

        app.listen(apiUrl, () => {
            console.log(`${apiUrl} Yes I am connected`)
        })
    }
    catch (error) {
        console.log(error);

    }
}
start()