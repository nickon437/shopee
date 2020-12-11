import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import 'colors';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
