const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
// const session = require('express-session')
const app = express();
const cors = require('cors');
//require routers
const usersRouter = require('./routes/users.js');
const userController = require('../server/controllers/userController.js');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', usersRouter);

// app.get('/')
// app.use(session({
//   secret: 'thisismysecretforSimPlantfornow',
//   resave: false,
//   saveUnitialized: false
// }))

//signup
// app.post('/signup', userController.createUser, (req, res) =>{
//   res.status(200).send('New user created')
// })

app.get('/', (req, res) => {
  //is this how we serve the html file for frontend???
  // res.sendFile(path.resolve(__dirname, '../public/index.html'));
  res.send('hello world');
});

//local error handler
app.use((req, res) => {
  res.status(404).send('error: 404');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('ERROR: ', errorObj.log);
  const errorStatus = err.status || 500;

  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});

module.exports = app;
