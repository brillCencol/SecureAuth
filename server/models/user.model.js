import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is required',
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Virtual field for plain text password
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Hash password
UserSchema.methods.encryptPassword = function(password) {
  if (!password) return '';
  try {
    return crypto.createHmac('sha256', 'secret_key').update(password).digest('hex');
  } catch (err) {
    return '';
  }
};

// Compare hashed password
UserSchema.methods.authenticate = function(plainText) {
  return this.encryptPassword(plainText) === this.hashed_password;
};

export default mongoose.model('User', UserSchema);
