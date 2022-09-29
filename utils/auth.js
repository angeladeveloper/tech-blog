const withAuth = (req, res, next) => {
  // Now, if the user is logged in, they will be allowed to proceed with the request to the restricted route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;