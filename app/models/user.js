import mongoose from 'mongoose';

const UserModel = mongoose.model(
  'User',
  {
    id: String,
    username: String,
    password: String,
    authority: Number,
  },
  'users'
);

export default UserModel;
