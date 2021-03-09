const { User, O_Auth } = require('../dataBase/models');

module.exports = {
    authUser: (email) => User.findOne(email),
    oAuthCreate: (tokens, user) => O_Auth.create({ ...tokens, user: user._id })
};
