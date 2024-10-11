const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', (req, res) => {
    const userId = req.session.user.id;
    source = 'job_preferences';

    const successParam = req.query.success;
    const errorParam = req.query.error;

    const db = new sqlite3.Database('user_info.db');
    const selectQuery = 'SELECT * FROM job_preferences WHERE id = ?';

    // we need to access the database here before rendering the page to pull the current information that is stored
    db.get(selectQuery, [userId], (err, row) => {
        db.close();

        if (err) {
            console.error(err.message);
            req.session.errorMessage = "Internal Server Error";
            res.redirect('/');
            return;
        }

        const eulaAgreed = req.session.user.eula_agreed;

        if (row) {
            res.render('job_preferences', { userData: row, successParam, errorParam, eulaAgreed });
        } else {
            res.render('job_preferences', { userData: {}, successParam, errorParam, eulaAgreed });
        }
    });
});

module.exports = router;