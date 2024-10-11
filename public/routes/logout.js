const express = require("express");
const router = express.Router();

// this is the logout page, the only way to access this page is through the logout button, no GET requests allowed
router.post('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
});

router.get('/', (req, res) => {
    res.redirect('/landing');
});

module.exports = router;