const router = require('express').Router();
const { User, Task, Status } = require('../models/');
const withAuth = require('../utils/auth.js');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  Status.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [User, Task]
  })
  .then(dbStatusData => {
    const statuses = dbStatusData.map(Status => Status.get({ plain: true }));
    res.render('dashboard.handlebars', {
      statuses,
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
    include: [User, Status]
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