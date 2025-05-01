const mongoose = require('mongoose');

// Drop the existing collection
mongoose.connection.on('connected', () => {
    mongoose.connection.db.dropCollection('users', (err) => {
        if (err) {
            console.log('Error dropping collection:', err);
        } else {
            console.log('Collection dropped successfully');
        }
    });
});

const userSchema = new mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            required: [true, 'Firebase UID is required']
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
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
            type: String
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

// Create indexes explicitly
userSchema.index({ firebaseUid: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema); 