const sqlite3 = require('sqlite3').verbose();

const handleEducationHistorySubmission = (req, res, formSubmissionCallback) => {
    const { name, type, city, country, start_date, end_expec_date,  degree_type, major, minor, concentration, gpa, ind } = req.body;
    const userId = req.session.user.id;

    const db = new sqlite3.Database('user_info.db');

    const selectQuery = 'SELECT * FROM education_history WHERE id = ?';
    db.get(selectQuery, [userId], (err, row) => {
        if (err) {
            console.error(err.message);
            req.session.errorMessage = "Internal Server Error";
            formSubmissionCallback(res, false, -1);
            db.close();
            return;
        }

        if (row && row.count >= 3) {
            req.session.errorMessage = "You have already submitted the maximum number of schools.";
            formSubmissionCallback(res, false, -1);
            db.close();
            return;
        }

        let query;
        let values;
        if (row) {
            query = `
                UPDATE education_history
                SET name = ?, type = ?, city = ?, country = ?, start_date = ?, end_expec_date = ?, degree_type = ?, major = ?, minor = ?, concentration = ?, gpa = ?
                WHERE id = ? AND ind = ?
            `;
            values = [name, type, city, country, start_date, end_expec_date,  degree_type, major, minor, concentration, gpa, userId, ind]; // Using rowid instead of name
        } else {
            query = `
                INSERT INTO education_history (id, ind, name, type, city, country, start_date, end_expec_date,  degree_type, major, minor, concentration, gpa)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            values = [userId, name, type, city, country, start_date, end_expec_date,  degree_type, major, minor, concentration, gpa];
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

module.exports = handleEducationHistorySubmission;