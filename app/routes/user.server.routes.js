var user=require('../controllers/user.server.controller.js');
var User=require('mongoose').model('User');

module.exports.signin=function(app) {
    app.post('/signin', user.passport.authenticate('local'), user.signin);
};

module.exports.signup=function(app) {
    app.post('/users', user.create, user.passport.authenticate('local'), user.signin);
};

module.exports.get=function(app) {
    app.get('/currentUser', user.get);
};

module.exports.signout=function(app) {
    app.get('/users/:user/signout', user.signout);
};


