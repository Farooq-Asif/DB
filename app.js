
require("dotenv").config()
const cors = require("cors")
const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const PORT = 5000;
const { urlencoded } = require("body-parser");
const path = require('path');

const products_routes = require("./routes/products")

const Product_Add_routes = require("./routes/products");
const Category_Add = require("./routes/Category")
const Category_Data = require("./routes/CategoryData")
const Category_Data_Delete = require("./routes/CategoryDelete")
const Category_Update = require("./routes/CategoryUpdate")
const Order_Add = require("./routes/Order")
const Get_Order = require("./routes/GetOrder")
const routes = require('./routes/SignUpData');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://my-app-blue-alpha.vercel.app/',
        'http://localhost:3001'
    ],
    credentials: true,
    optionSuccessStatus: 200,
};
// const corsOptions = {
//     origin: [
//         'https://my-app-blue-alpha.vercel.app',
//         'http://localhost:3000',
//         'http://localhost:3001'
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     optionsSuccessStatus: 200 // For legacy browsers
// };
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi, i am live")
})

app.use("/api/products", products_routes)
app.use("/api/category", Category_Data)
app.use("/api/category/categorydelete", Category_Data_Delete)
app.use("/api/category/categoryupdate", Category_Update)
app.use("/api/category/addcategory", Category_Add)
app.use("/api/order/add", Order_Add)
app.use("/api/orders", Get_Order)
app.use("/api/product/add", Product_Add_routes)

app.use('/api/users', routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)

        app.listen(PORT, () => {
            console.log(` Server Running On ${PORT} PORT`)
        })
    }
    catch (error) {
        console.log(error);

    }
}
start()
