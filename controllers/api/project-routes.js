const router = require('express').Router();
const { User, Project, Task, Status } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Project.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Task,
        attributes: ['task_text'],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Project,
            attributes: ['title']
          },
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
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Task,
        attributes: ['task_text'],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Project,
            attributes: ['title']
          },
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