const controller = require('../controllers/customer.controller.js');

module.exports = (app) => {
    app.get('/api/customers', controller.getAllCustomers);
    app.get('/api/customers/:id', controller.getCustomerByCustomerId);
    // app.put('/api/todo/:id', controller.updateTodoById);
    app.post('/api/customer', controller.createCustomer);
    // app.delete(
    //     '/api/todo/:id',

    //     controller.deleteTodoById
    // );
};
