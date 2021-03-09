module.exports = {
    PORT: 5005,
    MONGO_DB: process.env.MONGO_URL || 'mongodb://localhost/users-5',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_RERESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET'
};
