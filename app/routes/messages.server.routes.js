var message=require('../controllers/messages.server.controller');

module.exports=function(app) {    
    app.post('/messages', message.write);
}