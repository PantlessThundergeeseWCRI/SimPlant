const Session = require('../sessionModel.js');

const sessionController = {};

// /**
// * isLoggedIn - find the appropriate session for this request in the database, then
// * verify whether or not the session is still valid.
// */
// sessionController.isLoggedIn = (req, res, next) => {
//   Session.findOne({cookieId: req.cookies.ssid})
//     .then((session) => {
//       if (session) return next();
//       return res.redirect('/signup');
//     })
//     .catch(err => {
//       // return next({
//       //   log: 'sessionController.startSession',
//       //   message: {err: `Unauthorized: ${err}`}
//       // })
//       return res.redirect(400, '/signup');
//     })
// };

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  //write code here
  Session.create({ cookieId: res.locals.username })
    .then(() => {
      next();
    })
    .catch(err => {
      return next({
        log: 'sessionController.startSession',
        message: { err: `Error creating session: ${err}` },
      });
    });
};

sessionController.endSession = async (req, res, next) => {
  const { username } = req.params;

  // delete the session in database
  try {
    const result = await Session.deleteOne({ cookieId: username });
    if (!result) {
      throw Error('Error deleting the session in database');
    }
    res.locals.username = username;
    return next();
  } catch (err) {
    return next({
      log: 'sessionController.endSession',
      message: { err: `Error ending session: ${err}` },
    });
  }
};

module.exports = sessionController;
