var mongoose=require('mongoose'), Schema=mongoose.Schema;

var messageSchema=new Schema({
    username: String,
    author: String,
    thumbnail: String,
    time: {
        type: Date,
        default: Date.now
        },
    headline: String,
    content: String,
    comments: []
});

module.exports=mongoose.model('Message', messageSchema);