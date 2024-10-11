const requireLogin = (req, res, next) => {
    const publicPages = ['/', '/createAccount', '/login', '/submit', '/logout'];
    const isPublicPage = publicPages.includes(req.path);

    if (!isPublicPage && (!req.session.user || !req.session.user.email)) {
        req.session.errorMessage = "You must be signed in before accessing that site.";
        res.redirect('/');
        return;
    }

    next();
};

module.exports = requireLogin;