import mongoose from 'mongoose';

const user_model = mongoose.model(
  'User',
  {
    id: String,
    username: String,
    password: String,
    authority: Number
  },
  'users'
);

export default user_model;
