import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    // username: {type: String, unique: true, require: true},
    // password: {type: String, require: true},
    name: {type: String, require: true},
    age: {type: Number, require: true},
    // roles: [{type: String, ref: 'Role'}]
})

const User = mongoose.model('User', userSchema)

export default User