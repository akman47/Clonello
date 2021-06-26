const router = require('express').Router();
const { User, Project, Task, Status, UserProject } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Project.findAll({
    attributes: ['id', 'title'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Task,
        attributes: ['id', 'task_text'],
        include: [
          {
            model: Status,
            attributes: ['title']
          }
        ]
      }
    ]
  })
  .then(dbProjectData => res.json(dbProjectData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Project.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Task,
        attributes: ['id', 'task_text'],
        include: [
          {
            model: Status,
            attributes: ['title']
          }
        ]
      }
    ]
  })
  .then(dbProjectData => {
    if (!dbProjectData) {
      res.status(404).json({ message: 'No project found with this id' });
      return;
    }
    res.json(dbProjectData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Project.create({
      title: req.body.title,
      user_id: req.session.user_id
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
});

router.put('/invite', (req, res) => {
  UserProject.create({
    user_id: req.body.user_id,
    project_id: req.body.project_id
  })
  .then(dbProjectData => res.json(dbProjectData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', withAuth, (req, res) => {
  Project.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbProjectData => {
    if (!dbProjectData) {
      res.status(404).json({ message: 'No project found with this id' });
      return;
    }
    res.json(dbProjectData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
  if (Task) {
    Task.destroy({
      where: {
        id: req.params.id
      }
    })
  }
  Project.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbProjectData => {
    if (!dbProjectData) {
      res.status(404).json({ message: 'No project found with this id' });
      return;
    }
    res.json(dbProjectData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;