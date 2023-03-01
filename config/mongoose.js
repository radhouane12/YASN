var mongoose=require('mongoose');

module.exports=function() {
    var db=mongoose.connect('mongodb://localhost/yasndb');
    console.log('Verbindung zu MongoDB hergestellt');
    require('../app/models/user.server.model');
    require('../app/models/message.server.model');
    return db;
};