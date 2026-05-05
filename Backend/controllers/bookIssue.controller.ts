import Joi from 'joi';
import { Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

type BodyType = {
  s_id: number;
  b_id: number;
  iss_date: string;
  sub_date: string;
}


const bookIssue = async (req:Request<{}, {}, BodyType>, res:Response) => {
      
  try {
    
        const {s_id, b_id, iss_date, sub_date} = req.body;
      
        const schema = Joi.object({ 
          s_id: Joi.number().greater(1).required(),
          b_id: Joi.number().greater(1).required(),
        })

        const {error,value} = schema.validate({ s_id, b_id }, {
          abortEarly: false,
        });

        if (error) {
          return res.status(400).json({ error: error.details.map((detail) => detail.message) });
        }

        const dateSchema = Joi.object({
                              iss_date: Joi.string().required(),
                              sub_date: Joi.string().required()
                            }).custom((value, helpers) => {
                              const issDate = new Date(value.iss_date);
                              const subDate = new Date(value.sub_date);
        
                              if (subDate <= issDate) {
                                return helpers.error("date.invalid");
                              }
        
                              return value;
                            }).messages({
                              "date.invalid": "sub_date must be greater than issue_date"
                            });
                                        
        const dateResult = dateSchema.validate({ iss_date, sub_date }, {
                                abortEarly: false ,
                                });
                    
        if (dateResult.error) {
                   return res.status(400).json({ error: dateResult.error.details.map((detail) => detail.message) });
                 }
        
        const student = await prisma.student.findUnique({
          where: { 
          id: s_id
          },
        });
      
        if (!student) {
          return res.status(404).json({ error: 'Student not found' });
        }
      
        const book = await prisma.book.findUnique({
          where: { id:b_id },
        });
      
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
      
      
        const data = await prisma.bookIssue.create({
          data: {
            s_id,
            b_id,
            iss_date: new Date(iss_date),
            sub_date: new Date(sub_date)
          },
        })
      
        res.status(201).json({ message: 'Data saved successfully', data });
      }

  catch (error) {
    console.error('Error occurred while saving book issue data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }  

}

module.exports = bookIssue;
