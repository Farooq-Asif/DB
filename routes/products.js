const express=require('express')

const router=express.Router()

const {getAllProducts,getAllProductsTesting,getAllProductsEdit}=require("../controllers/products")

router.route("/").get(getAllProducts)

router.route("/testing").get(getAllProductsTesting)
router.route("/edit").post(getAllProductsEdit)

module.exports=router