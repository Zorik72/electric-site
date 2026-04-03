const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { name, phone, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Website Lead" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: "New Estimate Request",
      text: `
New client request:

Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `
    });

    return {
      statusCode: 200,
      body: "OK"
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: "Error sending email"
    };
  }
};