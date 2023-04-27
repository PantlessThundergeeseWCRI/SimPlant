const model = require('../userModel.js');
// const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

const userController = {};
//authentication/creating user
userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  // console.log('user', req.body);
  if (!username || !password) {
    return next({
      log: 'userController.createUser',
      message: { err: 'No username or password entered' },
    });
  }
  try {
    const user = await model.User.findOne({ username });
    if (user) {
      throw new Error('User already exists');
    }
    //generate salt
    const salt = bcrypt.genSaltSync(10);
    //generate hash
    const hash = await bcrypt.hash(password, salt);
    //create new user with given username and newly generated hash password
    const newUser = await model.User.create({ username, password: hash });
    console.log('new user just created with hash password: ', newUser);
    // res.locals.userID = newUser._id;
    res.locals.username = newUser.username;
    return next();
  } catch (err) {
    return next({
      log: `userController.createUser: ${err}`,
      message: { err: `Error creating user:${err}` },
    });
  }
};

// verification middleware to login
userController.verifyUser = async (req, res, next) => {
  // destructure username and password from req.body
  const { username, password } = req.body;
  // console.log(username, password);
  if (!username || !password) {
    throw new Error('Username or password not provided');
  }
  //query for user in db with username and password
  try {
    const user = await model.User.findOne({ username });
    //if not found, throw error
    if (!user) {
      throw new Error('user not found');
    }
    // console.log('user: ', user)
    const loggedIn = await bcrypt.compare(password, user.password);
    if (!loggedIn) {
      throw new Error('incorrect password');
    }
    //res.locals.userId = user._id
    res.locals.username = user.username;
    return next();
  } catch (err) {
    return next({
      log: `userController.verifyUser: ${err}`,
      message: { err: `Error verifying user: ${err}` },
    });
  }
};

// get all data about a user
userController.getData = (req, res, next) => {
  const name = req.params.name;
  model.User.findOne({ username: name })
    .exec()
    .then(data => {
      // console.log('entering here');
      res.locals.userData = data;
      return next();
    })
    .catch(err =>
      next({
        log: `userController.getData: ${err}`,
        message: { err: `Erros in getting user's data: ${err}` },
      })
    );
};

// get all users' data
userController.getAll = (req, res, next) => {
  model.User.find({})
    .exec()
    // .then(response => response.json())
    .then(data => {
      res.locals.users = data;
      return next();
    })
    .catch(err =>
      next({
        log: `userController.getData: ${err}`,
        message: { err: "Erros in getting user's data" },
      })
    );
};

module.exports = userController;
