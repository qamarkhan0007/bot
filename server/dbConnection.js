const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";
var _db;

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('FinChatBot');
      console.log('error', err);
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};
