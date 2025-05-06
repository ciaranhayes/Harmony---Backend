import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    id: { type: Number, required: true},
    username: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    age: { type: Number, required: true},
    genre: {type: [String], required: true}
}, { collection: 'Harmony'});

const User = mongoose.model("User", userSchema);

export default User;