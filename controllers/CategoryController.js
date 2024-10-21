const CategorySchema = require('../models/CategorySchema');

const CategoryController = async (req, res) => {
    const { category } = req.body; 

    try {
        // Check if the category already exists
        const existingCategory = await CategorySchema.findOne({ category });

        if (existingCategory) {
            // If the category already exists, return an error
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create a new category if it doesn't exist
        const newCategory = new CategorySchema({
            category,
            IsActive:true
        });
        const categoryData = await newCategory.save();

        return res.status(201).json({
            message: 'Category added successfully!',
            data: {
                category: categoryData.category,
                id: categoryData._id,
                IsActive:categoryData.IsActive
            },
        });

    } catch (e) {
        res.status(500).json({ message: 'Error adding category' });
    }
};

module.exports = {
    CategoryController,
};
