require("dotenv").config()
import cors from "cors";

const  express=require('express')

const app= express()

const apiUrl = process.env.REACT_APP_API_URLT || 5000;

const connectDB=require('./db/connect')
const corsOrigin ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
app.get("/",(req,res)=>{
    res.send("Hi, i am live")
})

const products_routes=require("./routes/products")
app.use("/api/products",products_routes)

const start=async()=>{
try{
    await connectDB(process.env.MONGODB_URL)

app.listen(apiUrl,()=>{
    console.log(`${apiUrl} Yes I am connected`)
})
}
catch(error){
console.log(error);

}
}
start()