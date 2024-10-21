const CategorySchema = require('../models/CategorySchema');

const CategoryDataController = async (req, res) => {
    try {
        // Fetch all categories from CategorySchema
        const categories = await CategorySchema.find();

        // Check if categories exist before trying to send them
        if (!categories.length) {
            return res.status(404).json({
                message: 'No categories found.',
            });
        }

        // Send the fetched category data
        res.status(200).json({
            message: 'Success',
            categoryData: categories, // Send the array of categories
            length: categories.length, // Optional: Return the number of categories found
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        // Ensure you send a response only if headers have not been sent
        if (!res.headersSent) {
            res.status(500).json({
                message: 'Error fetching categories',
                error: error.message,
            });
        }
    }
};

module.exports = {
    CategoryDataController,
};
