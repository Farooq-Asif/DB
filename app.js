// require("dotenv").config()
// const cors = require("cors")

// const express = require('express')

// const app = express()

// const apiUrl = process.env.REACT_APP_API_URLT || 5000;

// const connectDB = require('./db/connect')

// const { urlencoded } = require("body-parser");

// const products_routes = require("./routes/products")

// const Login_routes = require("./routes/LoginData")

// const Sign_Up_routes = require("./routes/SignUpData")

// const Product_Add_routes = require("./routes/products");

// const corsOrigin = {
//     origin: ['http://localhost:3000', 'https://my-app-blue-alpha.vercel.app', 'http://localhost:5173'],
//     credentials: true,
//     optionSuccessStatus: 200
// }

// app.use(cors(corsOrigin));
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hi, i am live")
// })


// app.use("/api/users/login", (req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: `${req.method} Method not allowed` });
//     } else {
//         return Login_routes(req, res);
//     }
// });
// app.use("/api/users/signup", (req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: `${req.method} Method not allowed` });
//     } else {
//         return Sign_Up_routes(req,res);
//     }
// });
// app.use("/api/products", products_routes)
// app.use("/api/product/add", Product_Add_routes)


// const start = async () => {
//     try {
//         await connectDB(process.env.MONGODB_URL)

//         app.listen(apiUrl, () => {
//             console.log(`${apiUrl} Yes I am connected`)
//         })
//     }
//     catch (error) {
//         console.log(error);

//     }
// }
require("dotenv").config()
const cors = require("cors")
const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const apiUrl = process.env.REACT_APP_API_URLT || 5000;
const { urlencoded } = require("body-parser");

const products_routes = require("./routes/products")
const Login_routes = require("./routes/LoginData")
const Sign_Up_routes = require("./routes/SignUpData")
const Product_Add_routes = require("./routes/products");
const Category_Add=require("./routes/Category")
const Category_Data=require("./routes/CategoryData")
const Category_Data_Delete= require("./routes/CategoryDelete")
const Category_Update= require("./routes/CategoryUpdate")

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

app.use("/api/products", products_routes)
app.use("/api/category", Category_Data)
app.use("/api/category/categorydelete", Category_Data_Delete)
app.use("/api/category/categoryupdate", Category_Update)
app.use("/api/category/addcategory",Category_Add)
app.use("/api/product/add", Product_Add_routes)
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
// require("dotenv").config();
// const cors = require("cors");
// const express = require('express');
// const connectDB = require('./db/connect');

// const productsRoutes = require("./routes/products");
// const loginRoutes = require("./routes/LoginData");
// const signUpRoutes = require("./routes/SignUpData");
// const productAddRoutes = require("./routes/products");
// const categoryDataRoutes = require("./routes/CategoryData");
// const Category_Add=require("./routes/Category")
// const app = express();
// const apiUrl = process.env.REACT_APP_API_URLT || 5000;

// // CORS configuration
// const corsOrigin = {
//     origin: ['http://localhost:3000', 'https://my-app-blue-alpha.vercel.app', 'http://localhost:5173'],
//     credentials: true,
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOrigin));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Health check route
// app.get("/", (req, res) => {
//     res.send("Hi, I am live");
// });

// // Routes
// app.use("/api/products", productsRoutes);
// app.use("/api/category", categoryDataRoutes);

// // Test route for debugging
// app.use("/api/category/add",Category_Add);

// app.use("/api/product/add", productAddRoutes);

// // Login routes
// app.use("/api/users/login", (req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: `${req.method} Method not allowed` });
//     }
//     return loginRoutes(req, res);
// });

// // Signup routes
// app.use("/api/users/signup", (req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: `${req.method} Method not allowed` });
//     }
//     return signUpRoutes(req, res);
// });

// // Global error handling middleware
// app.use((err, req, res, next) => {
//     console.error('Error occurred:', err.stack);
//     res.status(500).send('Something broke!');
// });

// // Start the server and connect to the database
// const start = async () => {
//     try {
//         await connectDB(process.env.MONGODB_URL);
//         app.listen(apiUrl, () => {
//             console.log(`Server is running on port ${apiUrl}`);
//         });
//     } catch (error) {
//         console.error('Database connection error:', error);
//     }
// };

// // Invoke the start function
// start();
