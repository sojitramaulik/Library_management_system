import Joi from 'joi';
import { Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

type BodyType = {
  bookName: string;
  sem: number;
}

const book = async (req:Request<{},{},BodyType>, res:Response) => {
      
  try {
     const {bookName,sem} = req.body;

     // Validation schema for book data *************************************************************

      const schema = Joi.object({ 
              bookName: Joi.string().required(),
              sem: Joi.number().greater(1).required()
            })

      const {error,value} = schema.validate({ bookName, sem }, {
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({ error: error.details.map((detail) => detail.message) });
      }

      // Save book data to the database  ********************************************************

      const bookData = await prisma.Book.create({
          
        data: {
            bookName,
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

