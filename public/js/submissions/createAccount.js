const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const handleCreateAccountSubmission = (req, res, formSubmissionCallback) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err.message);
            return;
        }

        const db = new sqlite3.Database('user_info.db');

        const insertUserQuery = `
            INSERT INTO users (email, password)
            VALUES (?, ?)
        `;

        const insertPersonalInfoQuery = `
            INSERT INTO personal_info (id, email)
            VALUES (?, ?)
        `;

        db.run(
            insertUserQuery,
            [email, hashedPassword],
            function (err) {
                if (err) {
                    if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('email')) {
                        req.session.errorMessage = "Email Already Exists";
                    } else {
                        req.session.errorMessage = "Internal Server Error";
                    }

                    formSubmissionCallback(res, false, -1);
                } else {
                    const id = this.lastID;
                    db.run(
                        insertPersonalInfoQuery,
                        [id, email],
                        function (err) {
                            db.close();

                            if (err) {
                                console.error(err.message);
                            } else {
                                formSubmissionCallback(res, true, id, false);
                            }
                        }
                    );
                }
            }
        );
    });
};

module.exports = handleCreateAccountSubmission;