const CategorySchema = require('../models/CategorySchema');
const CategoryDataController = async (req, res) => {
    try {
        const categories = await CategorySchema.find();

        if (!categories.length) {
            return res.status(404).json({
                message: 'No categories found.',
            });
        }

        res.status(200).json({
            message: 'Success',
            categoryData: categories, 
            length: categories.length, 
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
