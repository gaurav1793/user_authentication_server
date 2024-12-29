const {Schema,model} = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    fullname:{
        firstname: {
            type: String,
            required: true,
            minlength:[3 , 'First name must be at least 3 characters long'],
            maxlength: 50
        },
        lastname: {
            type: String,
            minlength:[3 , 'Last name must be at least 3 characters long'],
            maxlength: 50
        },
    },
    email:{
        type:String,
        required:true,
        unique : true,
    },
    password:{
        type:String,
        required : true,
        select:false,
    },
    socketId: {
        type: String,
    },
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id} , process.env.JWT_SECRET , {expiresIn: '1d'});
    return token;
}
UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
UserSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = model('User', UserSchema)

module.exports = userModel;