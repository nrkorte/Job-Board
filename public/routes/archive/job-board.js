const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    const userId = req.session.user.id;
    source = 'job_board';

    const successParam = req.query.success;
    const errorParam = req.query.error;

    const errorMessage = req.session.errorMessage;

    delete req.session.errorMessage;

    const eulaAgreed = req.session.user.eula_agreed;

    res.render('job_board', { successParam, errorParam, errorMessage, eulaAgreed });
});

module.exports = router;