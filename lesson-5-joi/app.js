const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./config/config');

const apiRouter = require('./router/api.router');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
  console.log('App listen 5005');
});

function _connectDB() {
  mongoose.connect('mongodb://localhost/users-5', { useNewUrlParser: true, useUnifiedTopology: true });

  const { connection } = mongoose;

  connection.on('error', (error) => {
    console.log(error);
  });
}
