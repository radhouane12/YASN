var express=require('express');
var passport=require('passport');
var path=require('path');
var bodyParser=require('body-parser');
var session=require('express-session');
var url=require('url');
//var user=require('../app/models/user.server.model.js');

module.exports=function() {

    //eigene Middleware zur Ausgabe der Anfrage auf der Konsole
    var logger=function(req, res, next) {
        console.log('logger: ', req.method, req.url);
        next();
    }
    
    //allgemeine Funktionen zur Behandlung von Anfragenund Antworten, z.B.
    //Sitzungsmanagement, Parsen, Passwortstrategie,...
    var app=express();
    app.use(logger);
    
    //Auslieferung statischer Dateien aus dem public-Verzeichnis
    app.use(function(req,res,next) {console.log('express.static (public)'), next();}, express.static('public'));   
    
    /*app.use(bodyParser.urlencoded({extended: true}));*/

    app.use(function(req,res,next) {console.log('bodyParser.json'); next();}, bodyParser.json());
    
    app.use(session({
        secret: 'webtechnologien',
        resave: 'true',
        saveUninitialized: 'true',
        cookie: {maxAge: 60*60*24*365*1000}
    }));
    
    app.use(function(req,res,next) {console.log('passport.initialize'); next();}, passport.initialize());
    
    app.use(function(req,res,next) {console.log('passport.session'); next();}, passport.session());
    
    //Middleware Signin
    var userMiddleware=require('../app/routes/user.server.routes.js');
    userMiddleware.signin(app);
    
    //Middleware Signup
    userMiddleware.signup(app);
    
    //Schranke - nicht authentifzierte Nutzer werden ab hier geblockt und 
    //haben zu den nachfolgenden Funktionen keinen Zugang
    app.use(function(req, res, next) {
        console.log('check for signin');
        if (req.isAuthenticated()) {
            console.log('>>>SignedIn check passed');
            return next();
        }
        console.log('!!!SignedIn check NOT passed');
        return res.status(401).send('Unauthorized');
    });
    
    //Middleware get user
    userMiddleware.get(app);
    
    //Middleware Signout
    userMiddleware.signout(app);
    
    //Auslieferung statischer Dateien aus dem nonpublic-Verzeichnis
    app.use(function(req,res,next) {console.log('express.static (non-public)'), next();}, express.static('nonpublic'));

    //Middleware für Messages
    var messageMiddleware=require('../app/routes/messages.server.routes.js');
    messageMiddleware(app);
    
    //Middleware für Contacts
    var contactMiddleware=require('../app/routes/contacts.server.routes.js');
    contactMiddleware(app);
    
    //Middleware für die Generierung der Timeline
    var timelineMiddleware=require('../app/routes/timeline.server.routes.js');
    timelineMiddleware(app);  
    
    return app;
};