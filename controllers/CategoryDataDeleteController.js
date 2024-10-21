const CategorySchema = require('../models/CategorySchema');

const CategoryDataDeleteController = async (req, res) => {
    const { id } = req.query;
    try {
        // Fetch all categories from CategorySchema
        const categories = await CategorySchema.findByIdAndDelete(id);

        // Check if categories exist before trying to send them
        if (!categories) {
            res.status(400).json({
                message: 'failed to delete'
            })

        }
        // Send the fetched category data
        res.status(200).json({
            message: ' Delete Successfully',
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
    CategoryDataDeleteController,
};
