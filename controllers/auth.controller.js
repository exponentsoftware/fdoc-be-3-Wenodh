const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.signup = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            phone: req.body.phone,
            role: req.body.role,
        });
        await user.save();
        res.status(200).json({ success: true, message: 'user registered' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.signin = async (req, res) => {
    try {
        let condition = {};
        if (req.body.username) condition.username = req.body.username;
        else if (req.body.email) condition.email = req.body.email;
        else if (req.body.phone) condition.phone = req.body.phone;
        else {
            return res.send({ message: 'enter credentials' });
        }
        const user = await User.findOne(condition);
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.SECRETE, {
                expiresIn: 86400,
            });
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.role,
                accessToken: token,
            });
        } else {
            return res.status(401).send({
                message: 'Invalid credentials',
            });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
