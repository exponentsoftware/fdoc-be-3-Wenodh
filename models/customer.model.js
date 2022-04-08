const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const customerSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: 'first name is required',
        },
        last_name: {
            type: String,
            required: 'first name is required',
        },
        city: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
    },
    { timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' } }
);

module.exports = mongoose.model('Customer', customerSchema);
// module.exports = (mongoose, mongoosePaginate) => {
//     var schema = mongoose.Schema(
//         {
//             first_name: {
//                 type: String,
//                 required: 'first name is required',
//             },
//             last_name: {
//                 type: String,
//                 required: 'first name is required',
//             },
//             city: {
//                 type: String,
//                 required: true,
//             },
//             company: {
//                 type: String,
//                 required: true,
//             },
//         },
//         { timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' } }
//     );
//     schema.plugin(mongoosePaginate);
//     const Customer = mongoose.model('customer', schema);
//     return Customer;
// };
