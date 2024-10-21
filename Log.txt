require("dotenv").config()
const cors = require("cors")

const express = require('express')

const app = express()

const apiUrl = process.env.REACT_APP_API_URLT || 5000;

const connectDB = require('./db/connect')

const { urlencoded } = require("body-parser");

const products_routes = require("./routes/products")

const Login_routes = require("./routes/LoginData")

const Sign_Up_routes = require("./routes/SignUpData")

const Product_Add_routes = require("./routes/products");

const corsOrigin = {
    origin: ['http://localhost:3000', 'https://my-app-blue-alpha.vercel.app', 'http://localhost:5173'],
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOrigin));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi, i am live")
})


app.use("/api/users/login", (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: `${req.method} Method not allowed` });
    } else {
        return Login_routes(req, res);
    }
});
app.use("/api/users/signup", (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: `${req.method} Method not allowed` });
    } else {
        return Sign_Up_routes(req,res);
    }
});
app.use("/api/products", products_routes)
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