const Customer = require('../models/customer.model');

// const getPagination = (page, size) => {
//   const limit = size ? +size : 3;
//   const offset = page ? page * limit : 0;
//   return { limit, offset };
// };
//add Customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            city: req.body.city,
            company: req.body.company,
        });
        await customer.save();
        res.status(200).json({ success: true, message: 'customer added' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

//show all
exports.getAllCustomers = async (req, res) => {
    try {
        const { first_name, last_name, city } = req.query;
        const limitValue = req.query.size || 2;
        const skipValue = req.query.page || 0;
        var condition = {};
        if (first_name) {
            condition.first_name = first_name;
        }
        if (last_name) {
            condition.last_name = last_name;
        }
        if (city) {
            condition.city = city;
        }

        const customer = await Customer.find(condition)
            .limit(limitValue)
            .skip(skipValue);

        res.status(200).json({
            success: true,
            data: customer,
            page: skipValue,
            size: limitValue,
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
// get by id,
exports.getCustomerByCustomerId = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findById(id);
        res.status(200).json({
            success: true,
            data: customer,
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
