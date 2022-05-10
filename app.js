const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();

// load dotenv
dotenv.config();

// connect to MongoDB
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.okbo5.mongodb.net/quanto?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

// express middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
app.use(bodyParser.json());

// routes
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/stockmovements', stockRoutes);