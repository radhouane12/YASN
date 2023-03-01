var Message=require('mongoose').model('Message');

exports.write=function(req, res, next) {
    console.log('write message');
    var message=new Message(req.body);
    message.username=req.user.username;
    message.author=req.user.firstname+' '+req.user.lastname;
    message.thumbnail='/img/'+req.user.username+'.jpg';
    message.save(function(err) {
        if (err) return next(new Error('Failed to write message'));
    });
    res.location('/message/'+message._id).json(null);
};