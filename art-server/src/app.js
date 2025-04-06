const express = require('express');
const cors = require('cors');
const authRoutes = require('./interfaces/routes/authRoutes');
const profileRoutes = require('./interfaces/routes/profileRoutes');
const reviewRoutes = require('./interfaces/routes/reviewRoutes');
const commentRoutes = require('./interfaces/routes/commentRoutes');
const postRoutes = require('./interfaces/routes/postRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/review', reviewRoutes);
app.use('/comment', commentRoutes);
app.use('/post', postRoutes);

module.exports = app;
