const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// this is the profile page where all of the data for a user can be updated
router.get('/', (req, res) => {
    const userId = req.session.user.id;
    source = 'general';

    const successParam = req.query.success;
    const errorParam = req.query.error;

    const db = new sqlite3.Database('user_info.db');
    const selectQuery = 'SELECT * FROM personal_info WHERE id = ?';

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
            res.render('general', { userData: row, successParam, errorParam, eulaAgreed });
        } else {
            res.render('general', { userData: {}, successParam, errorParam, eulaAgreed });
        }
    });
});

module.exports = router;