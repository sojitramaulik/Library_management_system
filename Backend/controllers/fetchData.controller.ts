import { Request, Response } from 'express';
import Joi from 'joi';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

type BodyType = {
  firstname?: string;
  lastname?: string;
  bookname?: string;
  issue_date: string;
  sub_date: string;
}

const fetchData = async (req:Request<{}, {}, BodyType>, res:Response) => {

        try {
            const { firstname, lastname, bookname, issue_date, sub_date } = req.body;

            const fetchData = Joi.object({
                firstname: Joi.string().allow('').optional(),
                lastname: Joi.string().allow('').optional(),
                bookname: Joi.string().allow('').optional(),
            });

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

            const fetchResult = fetchData.validate({ firstname, lastname, bookname }, {
              abortEarly: false,
            });

            if (fetchResult.error) {
              return res.status(400).json({ error: fetchResult.error.details.map((detail) => detail.message) });
            }

            const clean = (val:any) => val && val.trim() !== '' ? val : undefined; 

            const data = await prisma.student.findMany({
                    where: {
                      ...(clean(firstname) && { firstname }),
                      ...(clean(lastname) && { lastname }),

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
                          ...(bookname && {
                            book: {
                              bookname: {
                                contains: clean(bookname),
                                mode: "insensitive"
                              }
                            }
                          })
                        }
                      }
                    },

                    select: {
                      id: true,
                      firstname: true,
                      lastname: true,
                      phoneno: true,

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
                          ...(bookname && {
                            book: {
                              bookname: {
                                contains: clean(bookname),
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