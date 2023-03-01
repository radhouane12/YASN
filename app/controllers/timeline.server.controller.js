var Message=require('mongoose').model('Message');
var User=require('mongoose').model('User');

exports.read=function(req, res) {
    console.log('read timeline');

    //Suchanfragenobjekt für Nachrichten aufbauen
    var queryObject;
    queryObject=Object.create(null);
    queryObject.$or=[];
    queryObject.$or[0]=Object.create(null);
    queryObject.$or[0].username=req.user.username;
    for (var i=0; i<req.user.contacts.length; i++) {
        queryObject.$or[i+1]=Object.create(null);
        queryObject.$or[i+1].username=req.user.contacts[i].username;
    }
    
    //Nachrichten aus Datenbank holen
    Message.find(queryObject).sort('-time').exec(function(err, messages) {
        if (err) {
            console.log(err);
            res.status(204).json(null);
        }
        else {
            res.status(200).json(messages);
        }
    });
};