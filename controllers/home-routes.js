const router = require('express').Router();
const { User, Task, Status } = require('../models/');

router.get('/', (req, res) => {
  console.log(req.session);
  Status.findAll({
    include: [User, Task]
  })
  .then(dbStatusData => {
    const statuses = dbStatusData.map(status => status.get({ plain: true }));
    res.render('homepage.handlebars', {
      statuses,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/status/:id', (req, res) => {
  Status.findOne({
    where: {
      id: req.params.id
    },
    include: [User, Task]
  })
  .then(dbStatusData => {
    if (!dbStatusData) {
      res.status(404).json({ message: 'No status found with this id' });
      return;
    }

    const statuses = dbStatusData.get({ plain: true });
    res.render('single-status', {
      statuses,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;