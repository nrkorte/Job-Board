const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user && req.session.user.id) {
        res.redirect('/landing');
    } else {
        const errorMessage = req.session.errorMessage;
        req.session.errorMessage = null;
        source = "createAccount";
        res.render('createAccount', { errorMessage });
    }
});

module.exports = router;