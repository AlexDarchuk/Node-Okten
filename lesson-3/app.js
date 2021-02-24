const fs = require('fs');
const path = require('path')
const express = require ('express');

const apiRouter = require('./router/api.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

app.listen(5001, () => {
    console.log('App listen 5001');
});