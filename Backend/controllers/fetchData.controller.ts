import { Request, Response } from 'express';
import Joi from 'joi';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

type BodyType = {
  firstName?: string;
  lastName?: string;
  bookName?: string;
  issue_date: string;
  sub_date: string;
}

const fetchData = async (req:Request<{}, {}, BodyType>, res:Response) => {

        try {
            const { firstName, lastName, bookName, issue_date, sub_date } = req.body;

            // Validate the first name, last name, and book name using Joi with optional fields and allowing empty strings ****************************************************

            const fetchData = Joi.object({
                firstName: Joi.string().allow('').optional(),
                lastName: Joi.string().allow('').optional(),
                bookName: Joi.string().allow('').optional(),
            });

            const fetchResult = fetchData.validate({ firstName, lastName, bookName }, {
              abortEarly: false,
            });

            if (fetchResult.error) {
              return res.status(400).json({ error: fetchResult.error.details.map((detail) => detail.message) });
            }

            // Validate the issue date and submission date using Joi with custom validation  *******************************************************

            const dateSchema = Joi.object({
                    issue_date: Joi.string().required(),
                    sub_date: Joi.string().required()
                  }).custom((value, helpers) => {
                    const issueDate = new Date(value.issue_date);
                    const subDate = new Date(value.sub_date);

                    if (subDate < issueDate) {
                      return helpers.error("date.invalid");
                    }

                    return value;
                  }).messages({
                    "date.invalid": "sub_date must be greater than issue_date"
                  });
                              
            const dateResult = dateSchema.validate({ issue_date, sub_date }, {
               abortEarly: false ,
              });
            
            if (dateResult.error) {
              return res.status(400).json({ error: dateResult.error.details.map((detail) => detail.message) });
            }
 
            // Fetch data from the database using Prisma with optional filters based on the provided criteria  *******************************************************

            const clean = (val:any) => val && val.trim() !== '' ? val : undefined; 

            const data = await prisma.student.findMany({
                    where: {
                      ...(clean(firstName) && { firstName }),
                      ...(clean(lastName) && { lastName }),

                      issues: {
                        some: {
                          ...(issue_date && {
                            iss_date: {
                              gte: new Date(issue_date)
                            }
                          }),
                          ...(sub_date && {
                            sub_date: {
                              lte: new Date(sub_date)
                            }
                          }),
                          ...(bookName && {
                            book: {
                              bookName: {
                                contains: clean(bookName),
                                mode: "insensitive"
                              }
                            }
                          })
                        }
                      }
                    },

                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      phoneNo: true,

                      issues: {
                        where: {
                          ...(issue_date && {
                            iss_date: {
                              gte: new Date(issue_date)
                            }
                          }),
                          ...(sub_date && {
                            sub_date: {
                              lte: new Date(sub_date)
                            }
                          }),
                          ...(bookName && {
                            book: {
                              bookName: {
                                contains: clean(bookName),
                                mode: "insensitive"
                              }
                            }
                          })
                        },
                        select: {
                          book: true
                        }
                      }
                    }
                  });

            res.status(200).json({ message: 'Data fetched successfully', data });
          
              
        } catch (error) {
          console.error('Error occurred while fetching data:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      
       }

module.exports = fetchData;