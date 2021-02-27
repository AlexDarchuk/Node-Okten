const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: () => User.find(),

    findUserById: (userId) => User.findById(userId),

    createUser: (userBody) => User.create(userBody),

    deleteUser: (userId) => User.deleteOne({ _id: userId })
};
