import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: [true, `This is a required field`],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'please confirm your password'],
    //     validate: {
    //         validator: function (el) {
    //             return el === this.password;
    //         },
    //         message: `Passwords are not the same`,
    //     },
    // },
    
});

mongoose.models = {};

const User = mongoose.model('User', userSchema);

export default User;