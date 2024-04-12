const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
//const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');

//const multer = require('multer');
//const uploadMiddleware = multer({ dest: 'uploads/' });
//const fs = require('fs');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);

app.use(cors({credentials:true,origin:['http://localhost:3000', 'http://localhost:3001']}));app.use(express.json());
app.use(cookieParser());
//app.use('/uploads', express.static(__dirname + '/uploads'));

const secret = process.env.SECRET_KEY;

//mongo connection
//*
mongoose.connect("mongodb+srv://casadoeinstein:6JKpWIojRQKxS1kd@cluster0.detmzgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userRouterAuthentication = require('./routes/userRouter');

app.use('/userRouter', userRouterAuthentication);



app.listen(4000);