var User=require('mongoose').model('User');
var bcrypt=require('bcrypt-nodejs');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;

//Konfiguration für die Erstellung eines Salts für Passwörter
var salt=bcrypt.genSaltSync(10);

//Passwortstrategie zum Signin - Nutzer loggt sich mit Username und
//Passwort ein
passport.use(new localStrategy(
    function(username, password, done) {
        console.log('Passport: localStrategy')
        User.findOne({username: username}, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, {message: 'Incorrect username.'});
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            else
            {
                return done(null, user);
            }
        });
    }
));

//Funktionen zum Ablegen und zur Bereitstellung des Nutzerobjektes nach dem
//Einloggen bzw. bei Wiederbesuchen
passport.serializeUser(function(user, done) {
    console.log('serializeUser');
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser');
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

exports.signin=function(req, res, next) {
    console.log('signin');
    if (req.isAuthenticated) {
        var s={
            'username': req.user.username,
            'firstname': req.user.firstname,
            'lastname': req.user.lastname
        };
        return res.status(200).contentType('application/json').send(JSON.stringify(s));
    } else {
        return res.status(401).send('Unauthorized');
    }
};
        
exports.create=function(req, res, next) {
    console.log('signup');
    var user=new User(req.body);
    var x=bcrypt.hashSync(req.body.password, salt);
    user.password=x;
    user.thumbnail=user.username+'.jpg';
    user.save(function(err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        next();           
    }); 
};

exports.get=function(req, res) {
    console.log('get user');
    var s={
        'username': req.user.username,
        'firstname': req.user.firstname,
        'lastname': req.user.lastname
    };
    res.contentType('application/json').send(JSON.stringify(s)); 
};

exports.signout=function(req, res, next) {
    console.log('signout');
    req.logout();
    return res.status(200).send('OK');
};

exports.passport=passport;