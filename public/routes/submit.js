const express = require("express");
const router = express.Router();

// imports for js functions
const handleCreateAccountSubmission = require('../js/submissions/createAccount.js');
const handleLoginSubmission = require('../js/submissions/login.js');
const handleGeneralSubmission = require('../js/submissions/archive/general.js');
const handleDemographicsSubmission = require('../js/submissions/archive/demographics.js');
const handleJobPreferencesSubmission = require('../js/submissions/archive/job_preferences.js');
const handleFilterSubmission = require('../js/submissions/archive/filter_jobs.js');

const handleFormSubmission = (req, res, source, formSubmissionCallback) => {
    switch (source) {
        case 'createAccount':
            handleCreateAccountSubmission(req, res, formSubmissionCallback);
            break;
        case 'login':
            handleLoginSubmission(req, res, formSubmissionCallback);
            break;
        case 'general':
            handleGeneralSubmission(req, res, formSubmissionCallback);
            break;
        case 'demographics':
            handleDemographicsSubmission(req, res, formSubmissionCallback);
            break;
        case 'job_preferences':
            handleJobPreferencesSubmission(req, res, formSubmissionCallback);
            break;
        case 'agreement':
            handleAgreementSubmission(req, res, formSubmissionCallback);
            break;
        case 'job_board':
            handleFilterSubmission(req, res, formSubmissionCallback);
            break;
            
        default:
            req.session.errorMessage = 'Invalid source';
            formSubmissionCallback(res, false, -1);
    }
};

router.post('/', (req, res) => {
    let sourcePage = source;

    // this callback function gets called the in the handleFormSubmission function and determines a successful submission
    const formSubmissionCallback = (res, success, email) => {
        if (success && ((sourcePage === "login") || (sourcePage === "createAccount"))) {
            req.session.user = {
                email: email
            };
            if (sourcePage === "login" || sourcePage === "createAccount") sourcePage = "landing";
            res.redirect(`${sourcePage}?success=true`);
        } else if (success) {
            if (sourcePage === "login" || sourcePage === "createAccount") sourcePage = "landing";
            res.redirect(`${sourcePage}?success=true`);
        }else {
            const redirectUrl = `/${sourcePage}?error=true`;
            res.send(`
                <script>
                    window.location.href = '${redirectUrl}';
                </script>
            `);
        }
    };

    handleFormSubmission(req, res, sourcePage, formSubmissionCallback);
});

// any get requests to submit or to logout are redirected to the index page, if the user is signed in, they will then be redirected to the landing page
router.get('/', (req, res) => {
    res.redirect('/');
});

module.exports = router;