const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const errorMessage = require('../error/error.messages');

const dataUsers = path.join(process.cwd(), 'dataBase', 'users.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = {
    findUsers: async (preferL, query) => {
        const readUsers = await readFile(dataUsers);

        const usersDb = await JSON.parse(readUsers.toString());
        const { nickname } = query;

        if (!nickname) {
            return usersDb;
        }

        const user = usersDb.find((userF) => userF.nickname === nickname);

        if (!user) {
            throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
        }

        return user;
    },

    findUserById: async (userId, preferL) => {
        const readUsers = await readFile(dataUsers);

        const usersDb = await JSON.parse(readUsers.toString())[userId];

        if (!usersDb) {
            throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
        }

        return usersDb;
    },

    createUser: async (userBody, preferL) => {
        const readUsers = await readFile(dataUsers);

        const usersDb = JSON.parse(readUsers.toString());

        if (usersDb.find((user) => user.nickname === userBody.nickname)) {
            throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
        }
        usersDb.push(userBody);
        await writeFile(dataUsers, JSON.stringify(usersDb));
    },

    deleteUser: async (userId) => {
        const readUsers = await readFile(dataUsers);

        const usersDb = JSON.parse(readUsers.toString());

        usersDb.splice(userId, 1);
        await writeFile(dataUsers, JSON.stringify(usersDb));
    }

};
