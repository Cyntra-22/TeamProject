const express = require('express');
const cors = require('cors');
const authRoutes = require('./interfaces/routes/authRoutes');
const profileRoutes = require('./interfaces/routes/profileRoutes');
const reviewRoutes = require('./interfaces/routes/reviewRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/review', reviewRoutes);

module.exports = app;
