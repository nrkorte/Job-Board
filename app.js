const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;

app.use(express.static('public'));

const crypto = require('crypto');

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));

// Parse incoming request bodies with urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS and configure views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'pages'));

//this blocks the users from accessing non-public pages without being signed in
const requireLogin = require('./public/middleware/requireLogin');
app.use(requireLogin);

const rootRoute = require("./public/routes/login");
app.use("/", rootRoute);

const createAccount = require("./public/routes/createAccount");
app.use("/createAccount", createAccount);

const loginRoute = require("./public/routes/login");
app.use("/login", loginRoute);

const logoutRoute = require("./public/routes/logout");
app.use("/logout", logoutRoute);

const submitRoute = require("./public/routes/submit");
app.use("/submit", submitRoute);

const landingRoute = require("./public/routes/landing");
app.use("/landing", landingRoute);

const CVInfoRoute = require("./public/routes/CV-info");
app.use("/CV-info", CVInfoRoute);

app.use((req, res) => {
    console.log(req.path);
    req.session.errorMessage = "Invalid path or access denied.";
    res.redirect('landing');
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));