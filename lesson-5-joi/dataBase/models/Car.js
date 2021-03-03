const { Schema, model } = require('mongoose');

const carScheme = new Schema({
    model: { type: String, required: true },
    price: { type: Number, default: 30000 }
});

module.exports = model('Car', carScheme);
