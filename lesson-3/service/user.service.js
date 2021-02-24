const fs = require('fs');
const path = require('path');

const dataUsers = path.join(process.cwd(), 'dataBase', 'users.json')

let users = [];
const readUsers = (dataUsers) => {
    fs.readFile(dataUsers, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        users = JSON.parse(data.toString());
    })
}
readUsers(dataUsers);


module.exports = {
    findUsers: () => {
        return users;
    },

    findUserById: (userId) => {
        return users[userId];
    },

    createUser: (userObject) => {
        users.push(userObject);
    },

    deleteUser: (userId) => {
        return users.slice(userId, 1);
    }

}