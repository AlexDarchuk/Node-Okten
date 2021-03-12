const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const { PORT, MONGO_DB } = require('./config/config');

const apiRouter = require('./router/api.router');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(express.static(path.join(process.cwd(), 'static')));

app.use(fileUpload({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log('App listen 5005');
});

function _connectDB() {
    mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
