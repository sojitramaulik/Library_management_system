import { Request, Response } from 'express';
import Joi from 'joi';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

type BodyType = {
  firstname: string;
  lastname: string;
  phoneno: string;
  email: string;
}


const student = async (req:Request<{}, {}, BodyType>, res:Response) => {

    try {
      const {firstname,lastname,phoneno,email} = req.body;

      const studentSchema = Joi.object({
        firstname: Joi.string().min(2).max(20).required().messages({
          'string.base': 'First name must be a string',
          'string.empty': 'First name is required',
        }),

        lastname: Joi.string().min(2).max(20).required().messages({
          'string.base': 'Last name must be a string',
          'string.empty': 'Last name is required',
        }),

        phoneno: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
          'string.pattern.base': 'Phone number must be a 10-digit number',
          'string.empty': 'Phone number is required',
        }),

        email: Joi.string().email().required().messages({
          'string.email': 'Invalid email format',
          'string.empty': 'Email is required',
        })
      });

      const {error, value} = studentSchema.validate(req.body,{
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({ error: error.details.map((detail) => detail.message) });
      }

      const existingEmail = await prisma.student.findUnique({
        where: {
          email: email,
        },
      });

      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const studentData = await prisma.student.create({
          
        data: {
          firstname,
          lastname,
          phoneno,
          email
        },
      });

      res.status(201).json({ message: 'Data saved successfully', studentData });

      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving student data' });
    }
      
    }

module.exports = student;
