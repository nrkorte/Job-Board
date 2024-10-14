const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', (req, res) => {
    const userId = req.session.user.id;
    source = 'work_history';

    const successParam = req.query.success;
    const errorParam = req.query.error;

    const db = new sqlite3.Database('user_info.db');
    const selectQuery = 'SELECT * FROM work_history WHERE id = ?';

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
            res.render('work_history', { userData: row, successParam, errorParam, eulaAgreed });
        } else {
            res.render('work_history', { userData: {}, successParam, errorParam, eulaAgreed });
        }
    });
});

module.exports = router;