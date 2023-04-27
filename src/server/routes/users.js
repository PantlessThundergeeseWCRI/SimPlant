const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const roomController = require('../controllers/roomController.js');
const plantController = require('../controllers/plantController.js');
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

//create a new user
router.post('/createUser', userController.createUser, (req, res) => {
  return res.status(201).send(`New user created!`);
});

//login
router.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).send('user verified!');
})

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
