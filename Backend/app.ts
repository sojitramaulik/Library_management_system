require("dotenv").config();
const express = require('express');
const cors = require('cors');
const  studentRoutes  = require('./routes/student.route.ts');
const fetchData = require('./routes/fetchData.route.ts');
const bookRoutes = require('./routes/book.route.ts');
const bookIssueRoutes = require('./routes/bookIssue.route.ts');
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}
));

// Api's

try {
  
  app.use('/api/data', studentRoutes);
  app.use('/api/data', fetchData);
  app.use('/api/data', bookRoutes);
  app.use('/api/data', bookIssueRoutes);

} catch (error) {
  console.error('Error setting up routes:', error);
}


// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });