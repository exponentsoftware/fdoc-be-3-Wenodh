const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title: { type: String, require: true },
        taskstatus: {
            type: String,
            default: 'notCompleted',
            enum: ['completed', 'notCompleted'],
            required: true,
        },
        category: {
            type: String,
            enum: ['work', 'hobby', 'task'],
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' },
    }
);

module.exports = mongoose.model('Todo', todoSchema);
