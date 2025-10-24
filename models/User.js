import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({

  name: String,

  email: String,

  password: String,

  lastName: {
    type: String,
    default: 'lastName',
  },

  location: {
    type: String,
    default: 'my city',
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  avatar: String,

  avatarPublicId: String,
  
});

//when get user, remove password property in the response user object, user.controller.js L17
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();//transform mongo object to javascript object
  delete obj.password;
  return obj;
};


export default mongoose.model('User', UserSchema);