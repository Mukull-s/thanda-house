const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            required: [true, 'Firebase UID is required'],
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        phone: {
            type: String,
            unique: true
        },
        address: {
            street: String,
            city: String,
            state: String,
            pincode: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema); 