const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart:[
        {
            toolId:{type:mongoose.Schema.Types.ObjectId,ref :"Tool",required: true},
            quantity:{type:Number,min:1}
        }
    ]
});

module.exports = mongoose.model('User', userSchema);