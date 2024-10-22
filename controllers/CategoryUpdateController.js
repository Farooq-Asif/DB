const Category = require('../models/CategorySchema'); // Adjust the path to your model

const CategoryUpdateController = async (req, res) => {
    const { id, category, IsActive } = req.body; // ID, category name, and IsActive status from request body

    // Check if ID is provided
    if (!id) {
        return res.status(400).json({ message: 'ID is required.' });
    }

    try {
        // If updating the category fields
        if (category !== undefined) {
            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                { category }, // Update the category name
                { new: true } // Return the updated document
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found.' });
            }

            return res.status(200).json({ message: 'Category updated successfully.', updatedCategory });
        }

        // If toggling the IsActive status
        if (IsActive !== undefined) {
            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                { IsActive }, // Set IsActive to the value sent in the request
                { new: true } // Return the updated document
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found.' });
            }

            return res.status(200).json({ message: 'Category status updated successfully.', updatedCategory });
        }

        return res.status(400).json({ message: 'No update operation specified.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { CategoryUpdateController };
