import { Request, Response } from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

type BodyType = {
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  password: string;
}

const student = async (req:Request<{}, {}, BodyType>, res:Response) => {

    // Validate the student data using Joi with custom error messages   

    try {
      const {firstName,lastName,phoneNo,email,password} = req.body;

      const studentSchema = Joi.object({
              firstName: Joi.string().min(2).max(20).required().messages({
                'string.base': 'First name must be a string',
                'string.empty': 'First name is required',
              }),

              lastName: Joi.string().min(2).max(20).required().messages({
                'string.base': 'Last name must be a string',
                'string.empty': 'Last name is required',
              }),

              phoneNo: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
                'string.pattern.base': 'Phone number must be a 10-digit number',
                'string.empty': 'Phone number is required',
              }),

              email: Joi.string().email().required().messages({
                'string.email': 'Invalid email format',
                'string.empty': 'Email is required',
              }),
              password: Joi.string().min(6).required().messages({
                'string.min': 'Password must be at least 6 characters long',
                'string.empty': 'Password is required',
              }),
      });

      const {error, value} = studentSchema.validate(req.body,{
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({ error: error.details.map((detail) => detail.message) });
      }
 
      // Check if the email already exists in the database using Prisma  ********************************

      const existingEmail = await prisma.student.findUnique({
        where: {
          email: email,
        },
      });

      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash the password using Bcrypt  ********************************

      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle file upload and get the image URL  ********************************

      const imageUrl = req.file ? req.file?.path: null;

      // Save the student data to the database using Prisma  ********************************

      const studentData = await prisma.student.create({
          
        data: {
          firstName,
          lastName,
          phoneNo,
          email,
          password: hashedPassword,
          image: imageUrl,
        },
      });

      res.status(201).json({ message: 'User registered successfully' });

      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving student data' });
    }
      
    }

module.exports = student;
