const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// this is the landing page where all users are directed after sign-in
router.route('/')
  .get((req, res) => {
    renderLandingPage(req, res);
  })
  .post((req, res) => {
    renderLandingPage(req, res);
  });

function renderLandingPage(req, res) {
  const errorMessage = req.session.errorMessage || '';

  if (req.session.user && req.session.user.email) {
    // Check the completeness of the user's profile here
    const userId = req.session.user.email;
    const query = 'SELECT * FROM personal_info WHERE email = ?';

    const db = new sqlite3.Database('user_info.db');

    db.get(query, [userId], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

        const profileComplete = Object.values(row).every(value => value !== null);

        // console.log("Profile Complete? " + profileComplete);

      res.render('landing', { errorMessage, profileComplete });
    });
  } else {
    req.session.destroy(err => {
      if (err) {
          console.error("Failed to destroy session:", err);
          return res.status(500).send('Internal Server Error');
      }
      
      // Redirect to the login page with the error message
      const redirectUrl = `/login?error=true&message=${encodeURIComponent(errorMessage)}`;
      res.redirect(redirectUrl);
  });
  }
}

module.exports = router;