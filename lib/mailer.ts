import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendSignupEmail(to: string, firstName: string, otp?: string) {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: "Verification",
        html: `<div style="font-family: Arial, sans-serif">
        <h2>Hello, ${firstName}!</h2>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code will expire in 5 minutes.</p>
      </div>`
        ,
    });
}



