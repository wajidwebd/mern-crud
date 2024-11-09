// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contacts');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/contacts', contactRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
