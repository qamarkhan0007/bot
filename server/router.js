const { sendMessage, getMessage } = require('./controller');

module.exports = function (app) {
  app.post('/sendMessage', sendMessage);
  app.get('/getMessage', getMessage);
}
