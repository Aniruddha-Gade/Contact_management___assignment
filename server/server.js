

import { connectDB } from './config/database.js';
import { app } from './app.js';
import dotenv from 'dotenv';
dotenv.config();


// Start server on PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("===========================")
  console.log(`Server Started on PORT ${PORT}`);
  // DB connection
  connectDB();
});


