const { Schema, model } = require('mongoose');
const { dataTable: { O_AUTH } } = require('../../constant');

const oAuthScheme = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = model(O_AUTH, oAuthScheme);
