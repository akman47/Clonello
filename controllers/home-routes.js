const router = require('express').Router();
const { User, Task, Project } = require('../models/');

router.get('/', (req, res) => {
  console.log(req.session);
  Project.findAll({
    include: [User, Task]
  })
  .then(dbProjectData => {
    const projects = dbProjectData.map(project => project.get({ plain: true }));
    res.render('homepage.handlebars', {
      projects,
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

router.get('/project/:id', (req, res) => {
  Project.findOne({
    where: {
      id: req.params.id
    },
    include: [User, Task]
  })
  .then(dbProjectData => {
    if (!dbProjectData) {
      res.status(404).json({ message: 'No project found with this id' });
      return;
    }

    const projects = dbProjectData.get({ plain: true });
    res.render('single-project.handlebars', {
      projects,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;