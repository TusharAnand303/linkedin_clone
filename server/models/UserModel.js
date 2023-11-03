import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    message:[{
        msg:{
            type:String,
        }
    }]
},{timestamps: true});

const GoogleSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: false, 
    },
    photo :{
        type:String,
        required: true,
    },
    message:[{
        msg:{
            type:String,
        }
    }]
},{timestamps: true});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


GoogleSchema.index({ email: 1 }, { unique: false });
const User = mongoose.model('users', UserSchema);
const Google = mongoose.model('googleUser', GoogleSchema);
export{User, Google}
