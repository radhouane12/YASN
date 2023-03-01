var User=require('mongoose').model('User');

module.exports.write=function(req, res, next) {
    console.log('write contact');
    User.find({$or:[{username: req.user.username},{username: req.body.targetuser}]}, function(err, users) {
        if (users.length!=2 || err) {
            res.status(424).json(null);
        } else {
            var contactLength=users[0].contacts.length;
            users[0].contacts.addToSet({
                firstname: users[1].firstname,
                lastname: users[1].lastname,
                username: users[1].username,
                thumbnail: users[1].thumbnail
            });
            users[1].contacts.addToSet({
                firstname: users[0].firstname,
                lastname: users[0].lastname,
                username: users[0].username,
                thumbnail: users[0].thumbnail
            });
            users[0].save();
            users[1].save();
            if (contactLength==users[0].contacts.length-1) { 
                res.location('/users/'+req.user.username+'/contacts/'+req.body.targetuser).json(null);
            }
            else {
              res.status(409).location('/users/'+req.user.username+'/contacts/'+req.body.targetuser).json(null);
            }
        }
    });
};

module.exports.read=function(req, res, next) {
    console.log('read contacts');
    User.findOne({username: req.user.username}, function(err, user) {
        if (err) return next(new Error('Failed to write message'));
        res.json(user.contacts);
    });
};