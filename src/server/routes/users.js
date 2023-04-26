const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const roomController = require('../controllers/roomController.js');
const plantController = require('../controllers/plantController.js');
// root endpoint is 'http://localhost:3000/users'

// get all data about a user
router.get('/:name', userController.getData, (req, res) => {
  res.status(200).json(res.locals.userData);
});

router.post('/createUser', userController.createUser, (req, res) => {
  return res.status(201).send(`New user created!`);
});

//delete room
router.delete('/room/delete', roomController.deleteRoom, (req, res)=>{
  res.status(200).send('successfully deleted room')
})

// //delete plant
router.delete('/plant/delete', plantController.deletePlant, (req, res)=>{
  res.status(200).send('successfully deleted plant')
})

//add room
router.post('/room/', roomController.addRoom, (req, res) => {
  res.status(201).send('New room added!');
});

// add plant
router.post('/plant', plantController.addPlant, (req, res) => {
  res.status(201).send('New plant added!');
});

// get all data about all users
router.get('/', userController.getAll, (req, res) => {
  res.status(200).json(res.locals.users);
});



module.exports = router;
