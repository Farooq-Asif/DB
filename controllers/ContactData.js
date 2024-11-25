const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const sendContactEmail = async (name, email, message, address) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465, 
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const htmlContent = await ejs.renderFile(
        path.join(__dirname, '../views/contactEmail.ejs'),
        { name, email, message, address }
    );

    const mailOptions = {
      
        from: `"${name}" <${email}>`, 
        to:'chsaab983@gmail.com, farooqasif416@gmail.com', 
        subject: 'New Contact Form Submission (Digital Empires)',
        html: htmlContent,
       
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Contact email sent successfully');
    } catch (error) {
        console.error('Error sending contact email:', error);
        throw new Error('Failed to send contact email');
    }
};

const handleContactForm = async (req, res) => {
    const { name, fName, email, address, message } = req.body;

    if (!name || fName || !email || !message || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await sendContactEmail(name, email, message, address);

        res.status(200).json({ message: 'Thank you for contacting us! We will get back to you shortly.' });
    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({ message: 'Failed to send contact form. Please try again later.' });
    }
};

module.exports = {
    handleContactForm,
};
