const model = require('../model.js');

// const ObjectId = require('mongodb').ObjectId;

const plantController = {};
plantController.addPlant = async (req, res, next) => {
  console.log('req.body', req.body);
  const {
    username,
    room_name,
    species,
    lighting,
    temperature,
    humidity,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;
  // check for missing data
  if (
    !username ||
    !room_name ||
    !species ||
    !lighting ||
    !temperature ||
    !humidity ||
    monday === undefined ||
    tuesday === undefined ||
    wednesday === undefined ||
    thursday === undefined ||
    friday === undefined ||
    saturday === undefined ||
    sunday === undefined
  ) {
    return next({
      log: 'plantController.addPlant',
      message: { err: 'Missing input field' },
    });
  }

  // check if username exists
  // check if room_name exists
  // check if this plant already exists in this room
  try {
    const user = await model.User.findOne({ username });
    if (!user) {
      throw new Error('User not found.');
    }
    const room = user.rooms.find(rooms => rooms.room_name === room_name);
    if (!room) {
      throw new Error('Room not found.');
    }
    const plantExists = room.plants.some(
      plant => plant.species === species
    );
    if (plantExists) {
      throw new Error('The plant exists in the room.');
    } else {
      const newPlant = {
        species: species,
        lighting: lighting,
        temperature: temperature,
        humidity: humidity,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        sunday: sunday,
      };
      const result = await model.User.updateOne(
        { username, 'rooms.room_name': room_name },
        { $push: { 'rooms.$.plants': newPlant } }
      );
      if (!result) {
        throw new Error('Error updating database for the new plant.');
      }
      return next();
    }
  } catch (err) {
    return next({
      log: 'plantController.addPlant',
      message: { err: 'Error creating a new plant ' + `${err}` },
    });
  }
};

plantController.deletePlant = async (req, res, next) => {
  //destructure username, room_name, plant_name from req.body
  const { username, room_name, species } = req.body;
  //throw eror if username, room_name, or species are not provided
  if (!username || !room_name || !species) {
    throw new Error('Username, room name, or plant name not provided');
  }
  try {
    //find user with username, throw error if user not found
    const currentUser = await model.User.findOne({ username });
    if (!currentUser) {
      throw new Error('User not found');
    }
    //find room with corresponding currentUser with room_name
    const currentRoom = currentUser.rooms.find(
      rooms => rooms.room_name === room_name
    );
    if (!currentRoom) {
      throw new Error('Room not found');
    }
    const currentPlant = currentRoom.plants.some(
      plant => plant.species === species
    );
    if (!currentPlant) {
      throw new Error('Plant not found');
    }
    const result = await model.User.updateOne(
      { username, room_name },
      { $pull: { 'rooms.$.plants': { species: species } } }
    );
    if (!result) {
      throw new Error('Error deleting plant from database');
    }
    return next();
  } catch (err) {
    return next({
      log: 'plantController.deletePlant',
      message: { err: 'Error deleting current plant: ' + `${err}` },
    });
  }
};

plantController.movePlant = async (req, res, next) => {
  const { username, room_move_from, room_move_to, species } = req.body;
  // check if all necessary info are provided
  if ((!username || !room_move_from, !room_move_to, !species)) {
    return next({
      log: 'plantController.movePlant',
      message: { err: 'Missing input field' },
    });
  }
  try {
    // check if user exists in db
    const user = await model.User.findOne({ username });
    if (!user) {
      throw new Error('User not found.');
    }
    // check if both rooms exists
    const roomFrom = user.rooms.find(
      rooms => rooms.room_name === room_move_from
    );
    const roomTo = user.rooms.find(
      rooms => rooms.room_name === room_move_to
    );
    // check if the rooms exist
    if (!roomFrom) {
      throw new Error(`${room_move_from} does not exist.`);
    }
    if (!roomTo) {
      throw new Error(`${room_move_to} does not exist. `);
    }
    // check if plant exists in the room to move from and not in room to move to
    const plant = roomFrom.plants.find(plant => plant.species === species);
    if (!plant) {
      throw new Error(`${species} does not exist in ${room_move_from}`);
    }
    const plantExistsTo = roomTo.plants.some(
      plant => plant.species === species
    );
    if (plantExistsTo) {
      throw new Error(`${species} Already exist in ${room_move_to}`);
    }
    const resultRemove = await model.User.updateOne(
      { username, 'rooms.room_name': room_move_from },
      {
        $pull: { 'rooms.$.plants': { species: species } },
      }
    );
    if (!resultRemove) {
      throw new Error(
        `$error removing ${species} from ${room_move_from} in database`
      );
    }
    const resultAdd = await model.User.updateOne(
      { username, 'rooms.room_name': room_move_to },
      {
        $push: { 'rooms.$.plants': plant },
      }
    );
    if (!resultAdd) {
      throw new Error(
        `$error removing ${species} to ${room_move_to} in database`
      );
    }
    return next();
  } catch (err) {
    return next({
      log: 'plantController.movePlant',
      message: { err: 'Error moving the plant ' + `${err}` },
    });
  }
};

module.exports = plantController;
