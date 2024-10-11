const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', (req, res) => {
    const userId = req.session.user.email;
    source = 'CV-info';

    const successParam = req.query.success;
    const errorParam = req.query.error;

    const db = new sqlite3.Database('user_info.db');
    const selectQuery = 'SELECT * FROM users WHERE email = ?';

    db.get(selectQuery, [userId], (err, row) => {
        db.close();
         
        if (err) {
            console.error(err.message);
            req.session.errorMessage = "Internal Server Error";
            res.redirect('/');
            return;
        }

        if (row) {
            res.render('CV-info', { userData: row, successParam, errorParam });
        } else {
            res.render('CV-info', { userData: {}, successParam, errorParam });
        }
    });
});

module.exports = router;