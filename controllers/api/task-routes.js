const router = require('express').Router();
const { User, Task, Project, Status } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
  Task.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Project,
        attributes: ['title'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: Status,
        attributes: ['title']
      }
    ]
  })
  .then(dbTaskData => res.json(dbTaskData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Project,
        attributes: ['title'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: Status,
        attributes: ['title']
      }
    ]
  })
  .then(dbTaskData => {
    if (!dbTaskData) {
      res.status(404).json({ message: 'No task found with this id' });
      return;
    }
    res.json(dbTaskData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  if (req.session) {
    Task.create({
      task_text: req.body.task_text,
      project_id: req.body.project_id,
      status_id: req.body.status_id,
      user_id: req.session.user_id
    })
    .then(dbTaskData => res.json(dbTaskData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
});

router.put('/:id', withAuth, (req, res) => {
  Task.update(
    {
      task_text: req.body.task_text,
      status_id: req.body.status_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbTaskData => {
    if (!dbTaskData) {
      res.status(404).json({ message: 'No task found with this id' });
      return;
    }
    res.json(dbTaskData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTaskData => {
    if (!dbTaskData) {
      res.status(404).json({ message: 'No task found with this id' });
      return;
    }
    res.json(dbTaskData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;