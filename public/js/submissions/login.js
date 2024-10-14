const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const handleLoginSubmission = (req, res, formSubmissionCallback) => {
    const { email, password } = req.body;
    const db = new sqlite3.Database('user_info.db');
    const selectQuery = `
        SELECT 
            users.email,
            users.password
        FROM 
            users 
        WHERE
            users.email = ?;
    `;

    db.get(selectQuery, [email], (err, row) => {
        if (err) {
            console.error(err.message);
            req.session.errorMessage = "Internal Server Error";
            formSubmissionCallback(res, false, -1);
            db.close();
            return;
        }

        if (!row) {
            req.session.errorMessage = "User not found";
            formSubmissionCallback(res, false, -1);
            db.close();
            return;
        }

        bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                console.error(err.message);
                req.session.errorMessage = "Internal Server Error";
                formSubmissionCallback(res, false, -1);
                db.close();
                return;
            }

            if (!result) {
                req.session.errorMessage = "Invalid username or password";
                formSubmissionCallback(res, false, -1);
                db.close();
                return;
            }
            
            formSubmissionCallback(res, true, row.email);
            db.close();
        });
    });
};


module.exports = handleLoginSubmission;