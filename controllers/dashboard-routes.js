const router = require('express').Router();
const { User, Task, Project, Status } = require('../models/');
const withAuth = require('../utils/auth.js');

// router.get('/', (req, res) => {
//   Project.findAll({
//     include: [User, Task]
//   })
//   .then(dbProjectData => {
//     const projects = dbProjectData.map(project => project.get({ plain: true }));
//     res.render('dashboard', {
//       projects,
//       loggedIn: true
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

// router.get('/projects/:id', (req, res) => {
//   Project.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [User, Task]
//   })
//   .then(dbProjectData => {
//     if (!dbProjectData) {
//       res.status(404).json({ message: 'No project found with this id' });
//       return;
//     }
    
//     const projects = dbProjectData.get({ plain: true });
//     res.render('single-project', {
//       projects,
//       loggedIn: true
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

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
});

router.get('/edit/task/:id', withAuth, async (req, res) => {
  const dbTaskData = await Task.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'task_text',
      'status_id'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      },
      {
        model: Status,
        attributes: ['id', 'title']
      }
    ]
  });

  const dbStatusData = await Status.findAll(
    {
      attributes: ['id', 'title']
    }
  );

  const dbProjectData = await Project.findOne(
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

  if (!dbStatusData) {
    res.status(500).json(err);
    return;
  }

  if (!dbTaskData) {
    res.status(404).json(err);
    return;
  }

  const task = dbTaskData.get({ plain: true });
  //const project = dbProjectData.get({ plain: true });
  const status = dbStatusData.map(stat => stat.get({ plain: true }));

  res.render('edit-task', {
    task,
    //project,
    status,
    loggedIn: true
  });
});

module.exports = router;