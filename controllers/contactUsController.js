// controllers/signupController.js

const nodemailer = require('nodemailer');


const ejs = require('ejs');
const path = require('path');

const sendEmail = async (name, email, message,country,companyUrl,user_type,topic) => {
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
        path.join(__dirname, '../views/emailTemplate.ejs'),
        { name, email, message ,country,companyUrl,user_type,topic} 
    );

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: 'chsaab983@gmail.com',
        subject: `New Contact Submission Form (Digital Empires) `,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};


// Signup Controller with OTP generation
const handleContactUs = async (req, res) => {
    const { name, email, message,country,companyUrl,user_type,topic} = req.body;

    if (!name || !email || !message|| !country) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      


        
        await sendEmail(name, email,message,country,companyUrl,user_type,topic);  

      

        res.status(200).json({
            message: 'Success.!',
       
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed !' });
    }
};

module.exports = {
    handleContactUs,
};
