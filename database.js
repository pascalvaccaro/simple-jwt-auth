const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/auth-minitest-example';
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  timestamps: { type: Date },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.verifyPassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

exports.User = mongoose.model('User', userSchema);
exports.startDb = () => mongoose.connect(databaseUrl);
