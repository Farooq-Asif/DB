const Product = require("../models/product")
const fs = require('fs')
const path = require('path');
const getAllProducts = async (req, res) => {
    const { company, name, featured, sort, select } = req.query
    const status = res.status()
    const queryObject = {}
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }
    let apiData = Product.find(queryObject)
    if (featured) {
        queryObject.featured = featured
    }
    if (sort) {
        let sortFix = sort.replace(",", " ")
        apiData = apiData.sort(sortFix)
    }
    if (select) {
        // let selectFix=select.replace(","," ")
        let selectFix = select.split(',').join(" ")
        apiData = apiData.select(selectFix)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    apiData.skip(skip).limit(limit)
    const Products = await apiData;
    res.status(200).json({ Products, nbHits: Products.length })
}

const getAllProductsTesting = async (req, res) => {
    const Data = await Product.find(req.query).select("name company")
    res.status(200).json({ Data })
}

const getAllProductsEdit = async (req, res) => {
    try {
        const body = req.body;

        // Get the current number of products to generate the new productId
        const productCount = await Product.countDocuments();
        const newProductId = productCount + 1;
    
        // Add the generated productId to the body
        body.productId = newProductId;
    
        // Add the new product to the database
        const newProduct = await Product.create(body);
        // Read the existing products from the local JSON file
        const filePath = path.join(__dirname, '../products.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Parse the existing products or start with an empty array
            let products = [];
            if (data) {
                products = JSON.parse(data);
            }

            // Add the new product to the array
            products.push(newProduct);

            // Write the updated products array back to the file
            fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                // Respond with the newly created product
                res.status(201).json(newProduct);
            });
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = { getAllProducts, getAllProductsTesting, getAllProductsEdit }
