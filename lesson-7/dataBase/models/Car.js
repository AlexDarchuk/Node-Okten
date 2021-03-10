const { Schema, model } = require('mongoose');
const { dataTable: { CAR } } = require('../../constant');

const carScheme = new Schema({
    model: { type: String, required: true },
    price: { type: Number, default: 30000 }
});

module.exports = model(CAR, carScheme);
