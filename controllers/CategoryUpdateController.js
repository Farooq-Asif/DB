// controllers/CategoryUpdateController.js
const Category = require('../models/CategorySchema'); // Adjust the path to your model

const CategoryUpdateController = async (req, res) => {
  const { id, category } = req.body; // Assuming you're sending ID and new category name in the request body
  console.log("🚀 : ~ file: CategoryUpdateController.js:6 ~ CategoryUpdateController ~ category", category);
  console.log("🚀 : ~ file: CategoryUpdateController.js:6 ~ CategoryUpdateController ~ id", id);

  if (!id || !category) {
    return res.status(400).json({ message: 'ID and category name are required.' });
  }

  try {
    // Find the category by ID and update its name
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { category },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    return res.status(200).json({ message: 'Category updated successfully.', updatedCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { CategoryUpdateController };
