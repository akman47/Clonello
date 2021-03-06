const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('homepage.handlebars', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/signup', (req, res) => {
  res.render('signup.handlebars', {
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;