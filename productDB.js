require('dotenv').config()
const connectDB=require("./db/connect")
const Products=require('./models/product')
const ProductsJson=require('./products.json')
const start=async()=>{
try{
await connectDB(process.env.MONGODB_URL)
await Products.deleteMany()
 await Products.create(ProductsJson)
 console.log("success");
 
}catch(error){
console.log("🚀 : ~ file: productDB.js:7 ~ start ~ error", error);

}
}
start()