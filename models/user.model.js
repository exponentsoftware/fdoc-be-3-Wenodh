const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: 'UserName is required',
            unique: true,
        },
        email: {
            type: String,
            required: 'Email address is required',
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: [/^\d{10}$/, 'Please fill a valid phone number'],
        },
        password: {
            type: String,
            minlength: 8,
            trim: true,
            required: true,
        },
        role: {
            type: String,
            default: 'app user',
            enum: ['admin', 'app user'],
        },
        todoList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Todo',
            },
        ],
    },
    { timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' } }
);

module.exports = mongoose.model('User', userSchema);
