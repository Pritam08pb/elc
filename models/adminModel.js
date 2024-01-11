import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Name is a required field`],
    },
    registrationNumber: {
        type: String,
        required: [true, `This is a required field`],
        unique: true,
    },
    email: {
        type: String,
        required: [true, `Email is a required field`],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                return String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
            },
            message: (props) => `Email (${props.value}) is invalid!`,
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: `Passwords are not the same`,
        },
    },
    profileUrl: {
        type: String, // Assuming it's a URL string
    },
});

userSchema.pre('save', async function (next) {
    // if (!this.isModified('password')) return next();
    //Hash the password with the cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

mongoose.models = {};

const Admin = mongoose.model('Admin', userSchema);

export default Admin;