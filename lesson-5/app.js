const express = require('express');

const apiRouter = require(null);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5001, () => {
    console.log('App listen 5001');
});
