const { Schema, model } = require('mongoose');

const userScheme = new Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 15 },
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

module.exports = model('User', userScheme);
