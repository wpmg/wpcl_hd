import mongoose from 'mongoose';

const UserModel = mongoose.model(
  'User',
  {
    username: String,
    password: String,
    authority: Number,
  },
  'users'
);

export default UserModel;
