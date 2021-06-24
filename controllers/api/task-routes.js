const router = require('express').Router();
const { User, Task, Status, Project } = require('../../models');

router.get('/', (req, res) => {
  Task.findAll({
    include: [User, Status]
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
    include: [User, Status]
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
    //user_id: req.body.user_id
    status_id: req.body.status_id
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