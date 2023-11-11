import otpGenerator from 'otp-generator';
import otp from '../models/otpModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function otpGeneration(req, res) {
    try {
        const OTP = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const otpString = OTP.toString();
        const oneTimePassword = new otp({ registrationNumber: req.body.registrationNumber, otp: OTP });

        // encrytping the otp
        const salt = await bcrypt.genSalt(10);
        oneTimePassword.otp = await bcrypt.hash(oneTimePassword.otp, salt);
        otp.create(oneTimePassword);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'e.learn.connect6@gmail.com',
                pass: 'kommcvywqwtfrlsj',
            },
        });

        let info = await transporter.sendMail({
            from: 'tu725588@gmail.com',
            to: req.body.email,
            subject: `OTP from chatapp`,
            text:`Please verify your otp`,
            html: `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    body {
                        margin: 0px;
                        padding: 0px;
                        font-family: 'Jost', sans-serif;
                    }
            
                    .container {
                        background-color: rgb(80, 80, 228);
                        padding: 45vh 5vw;
                    }
            
                    .element {
                        background-color: azure;
                        padding: 45px 30px;
                        border-radius: 10px;
                        font-size: 50px;
                        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                        margin: 0px 7px;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <span class="element">${otpString[0]}</span>
                    <span class="element">${otpString[1]}</span>
                    <span class="element">${otpString[2]}</span>
                    <span class="element">${otpString[3]}</span>
                    <span class="element">${otpString[4]}</span>
                    <span class="element">${otpString[5]}</span>
                </div>
            </body>
            
            </html>`,
        });
        console.log(`Message sent: ${info.messageId}`);
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
}

export async function verifyOtp(req, res) {
    try {
        const otpHolder = await otp.find({
            number: req.body.number,
        });
        if (otpHolder.length === 0)
            return res.status(200).json({
                status: 'fail',
                message: 'OTP is expired!',
            });
        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
        if (rightOtpFind.number !== req.body.number || !validUser) {
            res.status(200).json({
                status: 'fail',
                message: 'wrong otp',
            });
        } else {
            res.status(200).json({
                status: 'success',
            });
        }
    } catch (error) {
        res.status(405).json({
            status: 'fail',
        });
    }
}