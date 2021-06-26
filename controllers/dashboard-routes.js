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
      },
      include: [
        { 
          model: Project,
          attributes: ['id', 'title'],
          include: [
            {
              model: Task,
              attributes: ['id', 'task_text', 'status_id']
            }
          ]
        }
      ]
    },
    // {
    //   attributes: [
    //     'id',
    //     'username',
    //     // On the right path... need to pull all the projects for logged in user
    //     [sequelize.literal('SELECT * FROM user_project WHERE user_id = project.user_id)')]
    //   ],
    //   include: [Project, Task]
    // }
  )
  .then(dbUserData => {
    const user = dbUserData.get({ plain: true });
    res.render('dashboard', {
      user,
      loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  
  const dbUserData = await User.findAll(
    {
      attributes: ['id', 'username']
   }
  );

  const dbStatusData = await Status.findAll(
    {
      attributes: ['id', 'title']
    }
  );

  const dbTaskData = await Project.findOne(
    {
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
          },
          {
            model: User,
            attributes: ['id', 'username']
          }
        ]
      }
    ]
  })

  if (!dbTaskData) {
    res.status(404).json({ message: 'No task found with this id' });
    return;
  }

  if (!dbUserData) {
    res.status(404).json(err);
    return;
  }

  if (!dbStatusData) {
    res.status(500).json(err);
    return;
  }

  const users = dbUserData.map(user => user.get({ plain: true }));
  const project = dbTaskData.get({ plain: true });
  const status = dbStatusData.map(stat => stat.get({ plain: true }));

  //push project task to show only one user
  // project.user = {
  //   username: project.tasks.users[0]
  // }

  res.render('single-project', {
    project,
    users,
    status,
    loggedIn: true
  });
})

module.exports = router;