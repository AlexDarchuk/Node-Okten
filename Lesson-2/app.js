const fs = require('fs');
const path = require('path');
const express = require('express');
const expressHbs = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));

const dataUsers = path.join(__dirname, 'data', 'users.json');

let users = [];
// eslint-disable-next-line no-shadow
const readUsers = (dataUsers) => {
    fs.readFile(dataUsers, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        users = JSON.parse(data.toString());
    });
};
readUsers(dataUsers);

// Login-----------------------------------------------------------------
app.get('/login', (req, res) => {
    res.render('login', { users });
});

app.post('/login', (req, res) => {
    if (users.find((user) => user.email === req.body.email && user.password === req.body.password)) {
        const userId = users.findIndex((index) => index.email === req.body.email);
        res.redirect(`/users/${userId}`);
        return;
    }
    res.redirect('/registration');
});
// Login-------------------------------------------------------------------

// Registration-----------------------------------------------------------
app.get('/registration', (req, res) => {
    res.render('registration', { users });
});

app.post('/registration', (req, res) => {
    if (users.find((user) => user.email === req.body.email)) {
        res.redirect('/error');
        return;
    }
    users.push(req.body);
    fs.writeFile(dataUsers, JSON.stringify(users), (err) => {
        if (err) {
            res.redirect('/error');
            return;
        }
        res.redirect('/users');
    });
});
// Registration------------------------------------------------------------

// All Users---------------------------------------------------------------
app.get('/users', (req, res) => {
    res.render('users', { users });
});
//   All Users------------------------------------------------------------

// One User---------------------------------------------------------------------
app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    res.render('user', { user: users[userId] });
});
// One User--------------------------------------------------------------------

// Error---------------------------------------------------------------------
app.get('/error', (req, res) => {
    res.render('error');
});
// Error--------------------------------------------------------------------

app.listen(5000, () => {
    console.log('App listen 5000');
});
