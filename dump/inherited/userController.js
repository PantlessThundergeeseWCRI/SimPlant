const model = require('../../src/server/userModel.js');
const ObjectId = require('mongodb').ObjectId;

const userController = {};
//authentication/creating user
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: 'userController.createUser',
      message: { err: 'Missing username or password' },
    });
  }
  // check if username is unique
  model.User.findOne({ username })
    .exec()
    .then(user => {
      if (user) {
        return next({
          log: 'userController.createUser',
          message: {
            err: 'User already exists, enter a different username',
          },
        });
      }
      // if username is unique, add new user to db
      model.User.create({ username, password }).then(result => {
        if (!result) {
          throw Error('error creating user');
        }
        res.locals.username = result.username;
        return next();
      });
    })
    .catch(err =>
      next({
        log: `userController.createUser: ${err}`,
        message: { err: 'Error creating user in database' },
      })
    );
};

// verification middleware to login
userController.verifyUser = (req, res, next) => {
  // const { username, password } = req.body;
  const { username } = req.params;
  User.findOne({ username })
    .exec()
    .then(user => {
      if (!user) {
        throw Error(`${username} does not exist.`);
      }
      if (user.password === password) {
        res.locals.username = username;
        return next();
      } else {
        throw Error('incorrect password');
      }
    })
    .catch(err =>
      next({
        log: `userController.verifyUser: ${err}`,
        message: { err: 'Error verifying user' },
      })
    );
};

// get all data about a user
userController.getData = (req, res, next) => {
  const { username } = req.params;

  // const o_id = neObjectId(`${id}`);
  // console.log(o_id);
  User.findOne({ username, password })
    // model.User.findOne({ username: name })
    .exec()
    .then(response => {
      // console.log('response:', response);
      return response.json();
    })
    .then(data => {
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
