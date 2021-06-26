const router = require('express').Router();
const { User, Task, Project, Status } = require('../models/');
const withAuth = require('../utils/auth.js');
const sequelize = require('../config/connection');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  User.findOne(
    {
      where: {
        id: req.session.user_id
      }
    },
    {
      attributes: [
        'id',
        'username',
        [sequelize.literal('SELECT * FROM user_project WHERE user_id = project.user_id)')]
      ],
      include: [Project, Task]
    }
  )
  .then(dbProjectData => {
    const projects = dbProjectData.map(project => project.get({ plain: true }));
    res.render('dashboard', {
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
  Project.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      },
      {
        model: Task,
        attributes: ['id', 'task_text', 'status_id'],
        include: [
          {
            model: Status,
            attributes: ['id', 'title']
          }
        ]
      }
    ]
  })
  .then(dbTaskData => {
    if (!dbTaskData) {
      res.status(404).json({ message: 'No task found with this id' });
      return;
    }

    const project = dbTaskData.get({ plain: true });
    res.render('single-project', {
      project,
      loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

module.exports = router;