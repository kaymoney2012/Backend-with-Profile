import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    }
});
export const sendOtpToEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"Backend Class <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your Verification OTP",
        text: `Your Verification code is ${otp}. It expires in 15 minutes`,
        html: `
           <h1 style="text-align: center;">Login to your Account </h1>
 <h2 style="text-align: center;">Email Verification</h2>
            <p style="text-align: center;">Your Verification code is:</p>
            <p style="text-align: center; font-weight: 900; font-size: 32px; letter-spacing: 10px;">${otp}</p>
            <p style="text-align: center;">Enter this code within the next <br/> 15 minutes to login to your account</p>
        `
    });
};
//# sourceMappingURL=mailer.js.map