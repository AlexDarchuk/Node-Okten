module.exports = {
    PORT: 5005,
    MONGO_DB: process.env.MONGO_URL || 'mongodb://localhost/users-5',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'testmail@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '12345'
};
