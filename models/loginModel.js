import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'




const LoginSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: [true, `This is a required field`],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    }
   
  });

  LoginSchema.pre('save', async function (next) {
    // if (!this.isModified('password')) return next();
    //Hash the password with the cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
  

  const Login = mongoose.models.Login || mongoose.model('Login', LoginSchema);
  
  module.exports = Login;
  
  
