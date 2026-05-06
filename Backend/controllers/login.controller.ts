import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const { generateOTP } = require('../utils/otp');
const { sendOTPEmail } = require('../utils/mailer');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

type BodyType = {
  email: string;
  password: string;
}

const otpStore = new Map();

export const login = async (req: Request<{}, {}, BodyType>, res: Response) => {
      
      const { email, password } = req.body;

      try {
          
            // Check if the email exists in the database using Prisma 

            const existingEmail = await prisma.student.findUnique({
              where: {
                email: email,
              },
            });

            if (!existingEmail) {
              return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, existingEmail.password);

            if (!isMatch) {
              return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Generate a JWT token for authentication (you can customize the payload and secret key)

            
            const otp = generateOTP();

            otpStore.set(email, {
              otp: otp,
              expiresAt: Date.now() + 3 * 60 * 1000, // OTP expires in 3 minutes
            });

            // Send the OTP to the user's email

            await sendOTPEmail(email, otp);

            return res.status(200).json({ message:"OTP sent to email" });

              
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

     }

type OtpBodyType = {
  email: string;
  otp: string;
}

export const verifyOtp = async (req: Request<{}, {}, OtpBodyType>, res: Response) => {
       const { email, otp } = req.body;

       try {

            const record = otpStore.get(email);

            if (!record) {
              return res.status(400).json({ error: 'OTP not found for this email' });
            }

            if (record.expiresAt < Date.now()) {
               return res.status(400).json({ message: 'OTP has expired' });
            }

            if (record.otp !== otp) {
               return res.status(400).json({ message: 'Invalid OTP' });
            }

            otpStore.delete(email);

            // Generate a JWT token for authentication

            const existingEmail = await prisma.student.findUnique({
                where: {
                  email: email,
                },
              });
           
    
            const token = jwt.sign({ userId: existingEmail.id },
                          process.env.JWT_SECRET as string, 
                          {   expiresIn: '1h' });


            res.cookie('token', token, { 
                  httpOnly: true ,
                  secure:false
            });

            return res.status(200).json({ message: 'Login successful' });


      } catch (error) {
          console.error('Error during OTP verification:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
}

export const logout = (req: Request, res: Response) => {
       try {
        
         res.clearCookie('token');
         return res.status(200).json({ message: 'Logout successful' });

       } catch (error) {

         console.error('Error during logout:', error);
         return res.status(500).json({ error: 'Internal server error' });

       }
        
}  
