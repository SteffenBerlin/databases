var Sequelize = require( 'sequelize' );
var db = new Sequelize( 'chat', 'root', '',
  { define: { underscored: true } } );

var User = db.define( 'users', {
  username: { type: Sequelize.STRING, unique: true } // make this unique
});

var Room = db.define( 'rooms', {
  roomname: { type: Sequelize.STRING, unique: true }// make this unique
});

var Message = db.define( 'messages', {
  text: Sequelize.STRING,
});
Message.belongsTo( User );
Message.belongsTo( Room );

User.hasMany( Message );
Room.hasMany( Message );

User.sync();
Room.sync();
Message.sync();

exports.User = User;
exports.Room = Room;
exports.Message = Message;