const Todo = require('../models/todo.model');
const User = require('../models/user.model');
//add todo
exports.createTodo = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        console.log(user);
        const input = req.body;
        input.username = user.username;
        const todo = new Todo(input);
        await todo.save();
        await user.updateOne({
            $push: { todoList: todo._id },
        });
        res.status(200).json({ success: true, data: todo });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
//show all
exports.getAllTodo = async (req, res) => {
    try {
        const { title, category, id, taskstatus } = req.query;
        var condition = {};
        if (title) {
            condition.title = title.toLowerCase();
        }
        if (category) {
            condition.category = category.toLowerCase();
        }
        if (id) {
            condition._id = id;
        }
        if (taskstatus) {
            condition.taskstatus = taskstatus;
        }
        const todo = await Todo.find(condition).sort({ modifiedAt: -1 });
        res.status(200).json({ success: true, data: todo });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
// get by id,
exports.getTodoByUserId = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('todoList');
        res.status(200).json({
            success: true,
            data: user.todoList,
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
//add, update by id and
exports.updateTodoById = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ success: true, message: 'updated' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
//delete by id
exports.deleteTodoById = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'deleted' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
