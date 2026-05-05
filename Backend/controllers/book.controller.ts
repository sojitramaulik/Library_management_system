import Joi from 'joi';
import { Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

type BodyType = {
  bookname: string;
  sem: number;
}


const book = async (req:Request<{},{},BodyType>, res:Response) => {
      
  try {
     const {bookname,sem} = req.body;

      const schema = Joi.object({ 
              bookname: Joi.string().required(),
              sem: Joi.number().greater(1).required()
            })

      const {error,value} = schema.validate({ bookname, sem }, {
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({ error: error.details.map((detail) => detail.message) });
      }

      const bookData = await prisma.Book.create({
          
        data: {
            bookname,
            sem
        }
        });

        res.status(201).json({ message: 'Data saved successfully', bookData });
  
    
  } catch (error) {
    console.error('Error occurred while saving book data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
 
module.exports = book;

