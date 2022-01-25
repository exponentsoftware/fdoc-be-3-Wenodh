const controller = require('../controllers/todo.controller');
const { isAdmin, verifyToken } = require('../middlewares/authMiddleware');
module.exports = (app) => {
    app.get('/api/todo', [verifyToken, isAdmin], controller.getAllTodo);
    app.get('/api/todouser', [verifyToken], controller.getTodoByUserId);
    app.put('/api/todo/:id', [verifyToken], controller.updateTodoById);
    app.post('/api/todo', [verifyToken], controller.createTodo);
    app.delete(
        '/api/todo/:id',
        [verifyToken, isAdmin],
        controller.deleteTodoById
    );
};
