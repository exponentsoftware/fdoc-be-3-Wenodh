const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
let URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@sandbox.wrvbj.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose
    .connect(URL, { autoIndex: false })
    .then(() => console.log('mongodb connected'))
    .catch((err) => console.error('connection err', err));
require('./routes/todo.routes')(app);
require('./routes/auth.routes')(app);
app.get('/', (req, res) => {
    res.status(200).json({ success: true });
});
app.listen(3030, () => {
    console.log('Server is running at port 3030');
});
