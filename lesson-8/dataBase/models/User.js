const { Schema, model } = require('mongoose');
const { dataTable: { USER } } = require('../../constant');

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 15 },
    email: { type: String, required: true },
    avatar: { type: String },
    password: { type: String },
    cars: [{ type: Schema.Types.Mixed }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('full_name').get(function() {
    return `${this.name} ${this.age}`;
});

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id',
});

userScheme.pre('find', function() {
    this.populate('userCars');
})
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model(USER, userScheme);
