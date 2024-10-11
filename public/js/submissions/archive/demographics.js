const sqlite3 = require('sqlite3').verbose();

const handleDemographicsSubmission = (req, res, formSubmissionCallback) => {
    const { sex, legal_work, veteran, disability, ethnicity, race } = req.body;
    const userId = req.session.user.id;

    const db = new sqlite3.Database('user_info.db');

    const selectQuery = 'SELECT * FROM demographics WHERE id = ?';
    db.get(selectQuery, [userId], (err, row) => {
        if (err) {
            console.error(err.message);
            req.session.errorMessage = "Internal Server Error";
            formSubmissionCallback(res, false, -1);
            db.close();
            return;
        }

        let query;
        let values;
        if (row) {
            query = `
                UPDATE demographics
                SET sex = ?, legal_work = ?, veteran = ?, disability = ?, ethnicity = ?, race = ?
                WHERE id = ?
            `;
            values = [sex, legal_work, veteran, disability, ethnicity, race, userId];
        } else {
            query = `
                INSERT INTO demographics (id, sex, legal_work, veteran, disability, ethnicity, race)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            values = [userId, sex, legal_work, veteran, disability, ethnicity, race];
        }

        db.run(query, values, function (err) {
            if (err) {
                console.error(err.message);
                req.session.errorMessage = "Internal Server Error";
                formSubmissionCallback(res, false, -1);
            } else {
                const selectQuery = 'SELECT eula_agreed FROM users WHERE id = ?';
                db.get(selectQuery, [userId], (err, row) => {
                    if (err) {
                        console.error(err.message);
                        req.session.errorMessage = "Internal Server Error";
                        formSubmissionCallback(res, false, -1);
                        db.close();
                        return;
                    }

                    const eula_agreed = row ? row.eula_agreed : false;
                    formSubmissionCallback(res, true, userId, eula_agreed);
                });
            }
            db.close();
        });
    });
};

module.exports = handleDemographicsSubmission;