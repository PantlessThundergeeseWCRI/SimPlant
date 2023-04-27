const User = require('../userModel.js');
cookieController = {};

cookieController.setCookie = (req, res, next) => {
  // const secret = 'thisismysecretforSimPlantfornow';
  // res.cookie('simPlant', secret);
};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  // 'ssid' with a value that is equal to the id of the user
  res.cookie('ssid', res.locals.username, {
    maxAge: 30 * 60 * 1000, // 30 mins
  });

  res.locals.activeCookie = { ssid: true };
  // console.log('res.locals.activeCookie: ', res.locals.activeCookie);
  return next();
};

cookieController.destroySSIDCookie = (req, res, next) => {
  res.locals.activeCookie = { ssid: false };
  res.clearCookie(res.locals.username);
  return next();
};

module.exports = cookieController;
