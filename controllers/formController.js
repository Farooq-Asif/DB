const FormData = require('../models/formDataSchema'); // Adjust the import if needed
const bcrypt = require('bcrypt'); // Import bcrypt

const handleFormSubmission = async (req, res) => {
    const { name, email,age, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
       
        // Create a new instance of the FormData model (ensure the model name is consistent)
        const newFormData = new FormData({
            name,
            email,
            age,
            password:hashedPassword,
        });

        // Save the data to MongoDB
        await newFormData.save();

        // Send success response back to the front-end
        res.status(200).json({
            message: 'Successfully Done !',
            data: { name,email,age },
        });
        
       
     
       
        
        
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);

        // Send error response if saving fails
        res.status(500).json({
            message: 'Failed to save data to MongoDB',
            error: error.message // Log the actual error message
        });
        
    }
};

module.exports = {
    handleFormSubmission,
};
