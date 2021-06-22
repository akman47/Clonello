const router = require('express').Router();
const { User, Task, Status } = require('../../models');

router.get('/', (req, res) => {
  Task.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Status,
        attributes: ['id', 'status_text']
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
        model: Status,
        attributes: ['id', 'status_text']
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
  Task.create({
    task_text: req.body.task_text,
    // TO DO: change 'body' to 'session' after implementing express-session!!!!!!!
    user_id: req.body.user_id
  })
  .then(dbTaskData => res.json(dbTaskData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Task.update(
    {
      task_text: req.body.task_text
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

router.delete('/:id', (req, res) => {
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