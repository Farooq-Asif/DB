const OrderSchema = require('../models/OrderSchema'); // Use a clearer name
const CategorySchema=require('../models/CategorySchema')
const OrderAddController = async (req, res) => {
    console.log("🚀 : ~ file: OrderAddController.js:4 ~ OrderAddController ~ req", req.body);
    const { productName, qty, category, customerName } = req.body;


    try {
        // Check if an order with the same productName & categoryName already exists
        const existingOrder = await CategorySchema.findOne({category });

        if (!existingOrder) {
            return res.status(400).json({ message: `this category does not exists`}); 
        }

        // Create a new order if it doesn't exist
        const newOrder = new OrderSchema({
            productName,
            qty,
            category,
            customerName,
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json({
            message: 'Order added successfully!',
            data: {
                productName: savedOrder.productName,
                qty: savedOrder.qty,
                category: savedOrder.category,
                customerName: savedOrder.customerName,
            },
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error adding order', error: error.message });
    }
};

module.exports = {
    OrderAddController,
};
