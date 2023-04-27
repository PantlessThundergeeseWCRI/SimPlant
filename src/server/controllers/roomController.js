const model = require('../userModel.js');

const roomController = {};
roomController.addRoom = async (req, res, next) => {
  // get the info from the query
  const { username, room_name, temperature, humidity, lighting } =
    req.body;
  // check for missing data
  if (
    (!username || !room_name || temperature === undefined,
    humidity === undefined,
    lighting === undefined)
  ) {
    return next({
      log: 'roomController.addRoom',
      message: { err: 'Missing input field' },
    });
  }
  // check if username exists
  // check if room_name exists
  try {
    const user = await model.User.findOne({ username });
    if (!user) {
      throw new Error('User not found.');
    }
    const room = user.rooms.find(rooms => rooms.room_name === room_name);
    if (room) {
      throw new Error('Room exists.');
    } else {
      const newRoom = {
        room_name,
        temperature,
        humidity,
        lighting,
        plants: [],
      };
      const result = await model.User.updateOne(
        { username },
        { $push: { rooms: newRoom } }
      );
      if (!result) {
        throw new Error('Error updating database for the new room.');
      }
      return next();
    }
  } catch (err) {
    return next({
      log: 'roomController.addRoom',
      message: { err: 'Error creating a new room ' + `${err}` },
    });
  }
};

roomController.deleteRoom = async (req, res, next) => {
  //destructure username, room_name from req.body
  const { username, room_name } = req.body;
  //return error if username or room_name not provided
  if (!username || !room_name) {
    return next({
      log: 'roomController.deleteRoom',
      message: { err: 'Username or room name not provided' },
    });
  }

  try {
    //retrive user document from db according to username, store in variable
    const currentUser = await model.User.findOne({
      username,
    });
    //throw error if current user does not exist in database
    if (!currentUser) {
      throw new Error('Error finding current user');
    } else {
      //update on the user doc and 'pull' room_name from its rooms array
      await model.User.updateOne(
        { username },
        { $pull: { rooms: { room_name } } }
      );
      return next();
    }
  } catch (err) {
    return next({
      log: 'roomController.delete',
      message: { err: 'Error deleting a new room ' + `${err}` },
    });
  }
};

module.exports = roomController;
