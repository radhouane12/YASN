var contacts=require('../controllers/contacts.server.controller');

module.exports=function(app) {    
    app.post('/users/:user/contacts', contacts.write);
    app.get('/users/:user/contacts', contacts.read);
}