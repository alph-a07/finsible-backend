import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    picture: { type: String },
    accountCreated: { type: Date, required: true },
    lastLogin: { type: Date, required: true },
});

const User = mongoose.model('User', UserSchema);

export default User;
