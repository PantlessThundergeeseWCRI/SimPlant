const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const roomController = require('../controllers/roomController.js');
const plantController = require('../controllers/plantController.js');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
// root endpoint is 'http://localhost:3000/users'

// delete a plant
router.delete('/plant/delete', plantController.deletePlant, (req, res) => {
  res.status(200).send('successfully deleted plant');
});

// move a plant from one room to another
router.patch('/plant/moveplant', plantController.movePlant, (req, res) => {
  res.status(200).send('successfully moved plant');
});

//delete a room
router.delete('/room/delete', roomController.deleteRoom, (req, res) => {
  res.status(200).send('successfully deleted room');
});

// get all data about a user
router.get('/:name', userController.getData, (req, res) => {
  res.status(200).json(res.locals.userData);
});

//signup
router.post(
  '/createUser',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(201).json(res.locals.username);
  }
);

//login
router.post(
  '/login/:username',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.status(201).json(res.locals.username);
  }
);

//log out
router.delete(
  '/logout/:username',
  sessionController.endSession,
  cookieController.destroySSIDCookie,
  (req, res) => {
    res.status(204).send('user logged out'); // the message does not show up for a 204 status
  }
);

//add a room
router.post('/room', roomController.addRoom, (req, res) => {
  res.status(201).send('New room added!');
});

// add a plant
router.post('/plant', plantController.addPlant, (req, res) => {
  res.status(201).send('New plant added!');
});

// get all data about all users
router.get('/', userController.getAll, (req, res) => {
  res.status(200).json(res.locals.users);
});

module.exports = router;
