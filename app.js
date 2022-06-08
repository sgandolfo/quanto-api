const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const stockRoutes = require('./routes/stockRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const authRoutes = require('./routes/authRoutes');

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

/* PASSPORT LOCAL AUTHENTICATION */
app.use(passport.initialize());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// routes
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/stockmovements', stockRoutes);
app.use('/inventory', inventoryRoutes);
