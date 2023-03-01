var timeline=require('../controllers/timeline.server.controller');

module.exports=function(app) {    
    app.get('/users/:user/timeline', timeline.read);
};