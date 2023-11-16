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
            from: 'e.learn.connect6@gmail.com',
            to: req.body.email,
            subject: `OTP from E-Learn Connect`,
            text:`Please verify your otp`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Email Design</title>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    font-family: "Jost", sans-serif;
                    background-color: #f4f4f4;
                  }
            
                  table.container {
                background-color: #000000;
                margin: 50px auto;
                border-collapse: separate;
                border-spacing: 10px; /* Adjust the spacing as needed */
                border-radius: 10px;
                overflow: hidden;
            }
            
            td.element {
                background-color: rgb(83, 42, 155);
                padding: 25px;
                border-radius: 2px;
                font-size: 30px;
                color: #ffffff;
                box-shadow: 0 0 10px rgba(119, 20, 205, 0.449);
            }
            
                  img.image {
                    width: 100%;
                    max-width: 300px;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                  }
            
                  p.p {
                    font-size: 18px;
                    color: rgb(192, 201, 211);
                    margin: 20px 0;
                  }
            
                  table.parent {
                    background-color: #000000;
                    text-align: center;
                    width: 100%;
                  }
            
                  td.pcontainer {
                    background-color: #000000;
                    color: #ffffff;
                    padding: 20px;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                  }
            
                  /* Media query for screens smaller than 600px */
                  @media (max-width: 600px) {
                    td.container {
                      margin: 50px 0;
                    }
            
                    td.element {
                      padding: 15px;
                      font-size: 20px;
                      margin: 7px 0;
                      
                    }
                  }
                </style>
              </head>
            
              <body>
                <table class="parent">
                  <tr>
                    <td>
                     
                    </td>
                  </tr>
                  <tr>
                    <td class="pcontainer">
                      <p class="p">Use This Code for Registration .</p>
                      <table class="container">
                        <tr>
                          <td class="element">${otpString[0]}</td>
                          <td class="element">${otpString[1]}</td>
                          <td class="element">${otpString[2]}</td>
                          <td class="element">${otpString[3]}</td>
                          <td class="element">${otpString[4]}</td>
                          <td class="element">${otpString[5]}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `,
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