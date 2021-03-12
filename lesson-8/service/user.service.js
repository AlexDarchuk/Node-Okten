const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: () => User.find(),

    findUserById: (userId) => User.findById(userId),

    createUser: (userBody) => User.create(userBody),

    updateUserById: (userId, userBody) => User.updateOne({ _id: userId }, { $set: userBody }),

    deleteUser: (userId) => User.findByIdAndRemove(userId)
};
