const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());


app.post('/api/data/student',async (req:any, res:any) => {
      const {firstname,lastname,phoneno} = req.body;

      if (!firstname || !lastname || !phoneno) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const studentData = await prisma.student.create({
          
        data: {
          firstname,
          lastname,
          phoneno
        },
      });

      res.status(201).json({ message: 'Data saved successfully', studentData });

    })

app.post('/api/data/book',async (req:any, res:any) => {
      const {bookname,sem} = req.body;

      if (!bookname || !sem) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const bookData = await prisma.Book.create({
          
        data: {
            bookname,
            sem
        }
        });

        res.status(201).json({ message: 'Data saved successfully', bookData });
  })

app.post('/api/data', async (req:any, res:any) => {

        const {s_id, b_id, iss_date, sub_date} = req.body;

        if (!s_id || !b_id || !iss_date || !sub_date) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const student = await prisma.Student.findUnique({
          where: { 
          id: s_id
          },
        });

        if (!student) {
          return res.status(404).json({ error: 'Student not found' });
        }

        const book = await prisma.Book.findUnique({
          where: { id:b_id },
        });

        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }


        const data = await prisma.BookIssue.create({
          data: {
            s_id,
            b_id,
            iss_date: new Date(iss_date),
            sub_date: new Date(sub_date)
          },
        })

        res.status(201).json({ message: 'Data saved successfully', data });
      });

app.post('/api/fetch/data', async (req:any, res:any) => {
      
        const { firstname, lastname, bookname, issue_date, sub_date } = req.body;

        if (!firstname && !lastname && !bookname) {
          return res.status(400).json({ error: 'At least one filter is required' });
        }

        if (!issue_date || !sub_date) {
          return res.status(400).json({ error: 'Both issue date and return date are required' });
        }

        const clean = (val:any) => val && val.trim() !== '' ? val : undefined; 

        const data = await prisma.student.findMany({
          
                  where: {
                    ...(clean(firstname) && { firstname }),
                    ...(clean(lastname) && { lastname }),

                    ...(bookname && {
                    issues: {
                      some: {
                        book: {
                          bookname: {
                            contains: clean(bookname),
                            mode: "insensitive"
                              }
                          }
                        }
                      }
                    })
                  },
                  
                
                  select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    phoneno: true,
                    issues: {
                      where: {
                        ...(issue_date && {
                          iss_date: { gte: new Date(issue_date) }
                        }),
                        ...(sub_date && {
                          sub_date: { lte: new Date(sub_date) }
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
                      select : {
                        book: true
                      }
                    }
                  }
        });

        res.status(200).json({ message: 'Data fetched successfully', data });
      });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});