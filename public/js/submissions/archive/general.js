const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const handleGeneralSubmission = (req, res, formSubmissionCallback) => {
    let { full_name, birthdate, address_one, address_two, city, state, zip, email, phone, preferred_contact } = req.body;

    const db = new sqlite3.Database('user_info.db');
    const userId = req.session.user.id;
    

    console.log(req.body);
    phone = phone.replace(/\D/g, '');

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

        if (address_two === '') address_two = "N/A";

        const updatePersonalInfoQuery = `
            UPDATE personal_info
            SET full_name = ?, birthdate = ?, address_one = ?, address_two = ?, city = ?, state = ?, zip = ?, email = ?, phone = ?, preferred_contact = ?
            WHERE id = ?;
        `;

        db.run(updatePersonalInfoQuery, [full_name, birthdate, address_one, address_two, city, state, zip, email, phone, preferred_contact, userId], function (err) {
            if (err) {
                console.error(err.message);
                req.session.errorMessage = "Internal Server Error";
                formSubmissionCallback(res, false, -1);
            } else {
                formSubmissionCallback(res, true, userId, eula_agreed);
            }

            db.close();
        });
    });
};

module.exports = handleGeneralSubmission;