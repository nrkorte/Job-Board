// CREATE TABLE IF NOT EXISTS job_preferences (
//     id INTEGER PRIMARY KEY,
//     job_type TEXT,
//     job_rho TEXT,
//     FOREIGN KEY (id) REFERENCES users(id)
// );

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const handleJobPreferencesSubmission = (req, res, formSubmissionCallback) => {
    let { job_type, job_rho } = req.body;

    const db = new sqlite3.Database('user_info.db');
    const userId = req.session.user.id;

    const job_type_string = Array.isArray(job_type) ? job_type.join(',') : job_type;
    const job_rho_string = Array.isArray(job_rho) ? job_rho.join(',') : job_rho;

    const selectQuery = 'SELECT * FROM job_preferences WHERE id = ?';
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
                UPDATE job_preferences
                SET job_type = ?, job_rho = ?
                WHERE id = ?
            `;
            values = [job_type, job_rho, userId];
        } else {
            query = `
                INSERT INTO job_preferences (id, job_type, job_rho)
                VALUES (?, ?, ?)
            `;
            values = [userId, job_type, job_rho];
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

module.exports = handleJobPreferencesSubmission;