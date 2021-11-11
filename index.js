const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Create server
const app = express();

// CORS
app.use(cors());

// Reading and parsing of body
app.use(express.json());

// Public folder
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Server running in port ${process.env.PORT}`);
});
