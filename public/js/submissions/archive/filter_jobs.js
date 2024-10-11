const express = require('express');

const handleFilterSubmission = (req, res, formSubmissionCallback) => {
        const userId = req.session.user.id;
        formSubmissionCallback(res, true, userId, 'true');
};

module.exports = handleFilterSubmission;