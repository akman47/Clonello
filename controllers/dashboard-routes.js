const router = require('express').Router();
const { User, Task, Project } = require('../models/');
const withAuth = require('../utils/auth.js');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  Project.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [User, Task]
  })
  .then(dbProjectData => {
    const projects = dbProjectData.map(project => project.get({ plain: true }));
    res.render('dashboard.handlebars', {
      projects,
      loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id
    },
    include: [User, Project]
  })
  .then(dbTaskData => {
    if (!dbTaskData) {
      res.status(404).json({ message: 'No task found with this id' });
      return;
    }

    const task = dbTaskData.get({ plain: true });
    res.render('edit-task', {
      task,
      loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

module.exports = router;