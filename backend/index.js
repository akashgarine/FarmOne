const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mini_proj');

// Import routes
const authRoutes = require('./routes/authRoutes');
const toolRoutes=require('./routes/toolRoutes');
const cartRoutes=require('./routes/cartRoutes');
// Use routes
app.use('/api', authRoutes);
app.use('/api',toolRoutes);
app.use('/api',cartRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});