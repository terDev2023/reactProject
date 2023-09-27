import { Schema, model } from "mongoose";

const User = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    roles: [{type: String, ref: 'Role'}]
})

export default model('User', User)