const nodemailer = require('nodemailer');

// Create a transporter using SMTP or other transport options

// Send email
const Email = {
    sendEmail : (to,amount,transactionId,userName)=>{

// Create a transporter using SMTP or other transport options
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gouthamp0306@gmail.com',  // Your Gmail email address
    pass: process.env.GOOGLE_MAIL_PASSWORD,  // Your Gmail password or an application-specific password
  },
});

// Email options with HTML content
const mailOptions = {
  from: 'gouthamp0306@gmail.com',  // Sender address
  to: to,   // Receiver address
  subject: 'Payment Successful',  // Subject line
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <!-- Include your styles here -->
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="your_logo.png" alt="Your Logo">
          <h2>Payment Successful</h2>
        </div>

        <div class="content">
          <p class="message">Dear ${userName},</p>
          <p class="message">We are pleased to inform you that your payment was successful.</p>
          <p class="message">Transaction ID: ${transactionId}</p>
          <p class="message">Amount Paid: ${amount}</p>


        </div>

        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>&copy; 2024 EnglishWallah</p>
        </div>
      </div>
    </body>
    </html>
  `,
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});

    }
}


module.exports = Email