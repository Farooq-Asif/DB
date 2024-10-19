const Product = require("../models/product")
const getAllProducts = async (req, res) => {
    const { company, name ,featured,sort,select} = req.query
    const queryObject = {}
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex:name, $options:"i"}
    }
    let apiData= Product.find(queryObject)
    if(featured){
        queryObject.featured=featured
    }
    if(sort){
        let sortFix=sort.replace(","," ")
        apiData=apiData.sort(sortFix)
    }
    if(select){
        // let selectFix=select.replace(","," ")
        let selectFix=select.split(',').join(" ")
        apiData=apiData.select(selectFix)
    }
    const page=Number(req.query.page) || 1
    const limit= Number(req.query.limit) || 10
    const skip=(page - 1) * limit
    apiData.skip(skip).limit(limit)
    const Products = await apiData;
    res.status(200).json({ Products,nbHits:Products.length })
}

const getAllProductsTesting = async (req, res) => {
    const Data = await Product.find(req.query).select("name company")
     res.status(200).json({Data})
}
module.exports = { getAllProducts, getAllProductsTesting }
