const express = require('express');
const cors = require('cors');
const sequelize = require('./db'); // PostgreSQL connection
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userRouterAuthentication = require('./routes/userRouter');
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();
const salt = bcrypt.genSaltSync(10);

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());

// Connect to PostgreSQL and sync models
sequelize.sync()
  .then(() => {
    console.log('PostgreSQL database connected');
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error);
  });

app.use('/userRouter', userRouterAuthentication);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
