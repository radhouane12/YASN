var mongoose=require('mongoose'), Schema=mongoose.Schema;


var userSchema=new Schema({
    title: String,
    firstname: String,
    lastname: String,
    email: String,
    sex: String,
    dateOfBrith: Date,
    username: String,
    password: String,
    thumbnail: String,
    contacts: [{
        firstname: String,
        lastname: String,
        username: String,
        thumbnail: String
    }]
});

module.exports=mongoose.model('User', userSchema);