var models = require('../models');
var app = require( '../app' );

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get( function( results ){
        res.send( results );
      });
    }, // a function which handles a get request for all messages
    post: app.app.post( 'handle', function( request, response ) { 
      var body = request.body;
      console.log( body );
      response.send();
    } ) // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get( function( results ){
        // res.set(headers);
        res.send( results );
      });
    },
    post: app.app.post( 'handle', function( request, response ) { 
      var body = request.body;
      response.send();
    } )
  },

  rooms: {
    get: function( req, res ) {
      models.rooms.get( function( results ){
        // res.set(headers);
        res.send( results );
      });
    },
    post: app.app.post( 'handle', function( request, response ) { 
      var body = request.body;
      console.log( body );
      response.send();
    } )
  }
};