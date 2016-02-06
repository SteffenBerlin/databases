var db = require('../db');

module.exports = {
  messages: {
    get: function ( callback ) {
      // do MySQL query
      var query = "SELECT m.id objectId, m.text, m.createdAt, u.name username, r.name roomname FROM messages m INNER JOIN rooms r ON m.room_id = r.id INNER JOIN users u ON m.user_id = u.id";
      // send query to db
      db.query( query, function( err, results ) {
        if( err ) throw new Error( err, 'Error in /classes/messages GET' );
        // turn data into object with proper names
        // return stringified json
        callback( JSON.stringify( results ) );
      } );
    }, // a function which produces all the messages
    post: function ( data, callback ) {

      var query = "INSERT IGNORE INTO users (name) VALUES ('" + username + "'); INSERT IGNORE INTO rooms (name) VALUES ('" + roomname + "'); INSERT INTO messages (text, user_id, room_id) VALUES ('" + text + "', (SELECT id FROM users WHERE name = '" + username + "'), (SELECT id FROM rooms WHERE name = '" + roomname + "') )";
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function ( callback ) {
      // do MySQL query
      var query = "SELECT id, name username FROM users";
      // send query to db
      db.query( query, function( err, results ) {
        if( err ) throw new Error( err, 'Error in /classes/users GET' );
        // turn data into object with proper names
        // return stringified json
        callback( JSON.stringify( results ) );
      } );
    },
    post: function ( callback ) {
      var query = "INSERT IGNORE INTO users (name) VALUES ('" + username + "')";
    }
  },

  rooms: {
    get: function( callback ) {
      // do MySQL query
      var query = "SELECT id, name roomname FROM rooms";
      // send query to db
      db.query( query, function( err, results ) {
        if( err ) throw new Error( err, 'Error in /classes/rooms GET' );
        // turn data into object with proper names
        // return stringified json
        callback( JSON.stringify( results ) );
      } );
    },
    post: function( callback ) {
      var query = "INSERT IGNORE INTO rooms (name) VALUES ('" + roomname + "')";
    }
  }
};

