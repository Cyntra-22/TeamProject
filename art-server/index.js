const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const {mongoose} = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

//database connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('Database Connection Error:', err));

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))