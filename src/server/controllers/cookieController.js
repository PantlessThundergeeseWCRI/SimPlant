const User = require('../userModel.js');
cookieController = {};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  // 'ssid' with a value that is equal to the username of the user
  res.cookie('ssid', res.locals.username, {
    maxAge: 30,
  });
  res.locals.activeCookie = { ssid: true };
  return next();
};

cookieController.destroySSIDCookie = (req, res, next) => {
  res.locals.activeCookie = { ssid: false };
  res.clearCookie(res.locals.username);
  return next();
};

module.exports = cookieController;
