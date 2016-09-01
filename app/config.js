var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/chart', //db defined for development
  test: 'mongodb://localhost/node-test' //db defined for testing
};
//Exporting config
module.exports = config;
